import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "@/lib/providers/provider";
import {
	Button,
	Checkbox,
	Input,
	InputGroup,
	InputRightAddon,
	InputRightElement,
} from "@chakra-ui/react";
import { useSigner, useBalance } from "wagmi";
import { fetchBalance } from "@wagmi/core";
import ScreenWrapper from "@/components/layout/screenWrapper";
import { BigNumber, ethers } from "ethers";
import { getCharityInfo } from "@/lib/api/graph";
import ZkModal from "@/components/zkModal";
import { getTokenInfo } from "@/lib/components/helpers";
import Container from "@/lib/components/glassContainer";
import MyAssetsSelection, {
	AssetType,
} from "@/components/donate/myAssetsSelection";
import { MakeDonation } from "@/lib/contracts";
import { Alchemy, Network } from "alchemy-sdk";
// import { ETHPrice } from "@/lib/components/helpers";

export default function Donate(props: any) {
	const router = useRouter();
	// get charityId from url
	const { charityId } = router.query;
	let id = parseInt(charityId as string);
	const { walletAddress, moralis } = useContext(Context);
	const { data: signer, isLoading } = useSigner();
	const [availableAssets, setAvailableAssets] = useState<AssetType[]>([
		{
			name: "Ethereum",
			symbol: "ETH",
			balance: 0,
			balanceInUSD: 0,
			address: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
		},
		{
			name: "USD Coin",
			symbol: "USDC",
			balance: 0,
			balanceInUSD: 0,
			address: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
		},
		{
			name: "Matic",
			symbol: "MATIC",
			balance: 0,
			balanceInUSD: 0,
			address: "0x0000000000000000000000000000000000000000",
		},
	]);

	const [charityData, setCharityData] = useState(null);
	const [charityLoading, setCharityLoading] = useState(false);
	const [selectedAsset, setSelectedAsset] = useState(availableAssets[0]);
	const [usdPrice, setUsdPrice] = useState(0);
	const [timer, setTimer] = useState(null);

	const [amount, setAmount] = useState("");
	const [modal, setModal] = useState({
		visible: false,
		isError: false,
		title: "",
		content: null,
	});

	async function donate() {
		// send amount to charity
		if (isLoading) return null;
		else if (!signer) return null;
		else {
			//TODO: ADD all the tokens donations options
			let _amount = ethers.utils.parseEther(amount);
			try {
				const result = await MakeDonation(id, _amount, "", signer);
				if (result) {
					console.log(result);

					// pop success modal
					setModal({
						visible: true,
						isError: false,
						title: "Donation Successful",
						content: <p>Nice</p>,
					});
				}
			} catch (e) {
				setModal({
					visible: true,
					isError: true,
					title: "Donation Failed",
					content: <p>{e.message}</p>,
				});
			}
		}
	}
	const hideAndClearModal = () => {
		setModal({ visible: false, isError: false, title: "", content: null });
		router.push("/home");
	};
	async function getCharity() {
		// get charity data
		setCharityLoading(true);
		let data = await getCharityInfo(id);
		setCharityData(data);
		// console.log(data);
		setCharityLoading(false);
	}

	async function handleAmount(amount: string, address: `0x${string}`) {
		// handle amount input
		setAmount(amount);
		clearTimeout(timer);

		const newTimer = setTimeout(async () => {
			if (amount !== "") {
				const info = await getTokenInfo(address, moralis);
				let price = info.usdPrice * parseFloat(amount);
				setUsdPrice(price);
			} else {
				setUsdPrice(0);
			}
		}, 500);

		setTimer(newTimer);
	}
	const config = {
		apiKey: process.env.ALCHEMY_ID,
		network: Network.MATIC_MUMBAI,
	};
	async function getAssets() {
		let _availableAssets = [];
		try {
			const alchemy = new Alchemy(config);
			let balances = await alchemy.core.getTokenBalances(walletAddress);
			console.log({ balances });
		} catch (e) {
			console.log(e);
		}
		for (let i = 0; i < availableAssets.length; i++) {
			let asset = availableAssets[i];
			console.log({ asset });
			try {
				let result = await fetchBalance({
					address: asset.address,
				});
				// console.log({ result });
				let info = await getTokenInfo(asset.address, moralis);
				// console.log(result.value._hex);
				asset.balance = parseFloat(ethers.utils.formatEther(result.value._hex));
				asset.balanceInUSD = asset.balance * info.usdPrice || 0;
				// console.log(asset.balance);

				// asset.balance = balance;
				// asset.balanceInUSD = balance * 1;
			} catch (e) {
				console.log(e);
			}
			_availableAssets.push(asset);
		}
		console.log(_availableAssets);
		setAvailableAssets(_availableAssets);
	}
	useEffect(() => {
		getCharity();
	}, [charityId]);
	useEffect(() => {
		getAssets();
	}, [walletAddress]);
	return (
		<ScreenWrapper className="donate-page" title={"zk.fund Home"}>
			<Container>
				<>
					<div id="pick-charity">
						{/* show selected charity, onclick opens modal */}
						<div id="charity-logo-div">
							<img
								id="charity-logo"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzmiAMnhX5wmE3rsbFP1Y6gIxdvTUxbC6sNhhNQnzqM9JEOtfWpjQuPHNj4luUVwILKr4&usqp=CAU"
								alt="charity logo"
							/>
						</div>
						<h2 id="charity-name">{charityData?.name || "Charity Name"}</h2>
						<div id="select-value-row">
							<InputGroup>
								<Input
									placeholder="0.00"
									type={"number"}
									inputMode="decimal"
									id="select-value-input"
									variant={"underlined"}
									value={amount}
									onChange={(e: any) => {
										handleAmount(e.target.value, selectedAsset.address);
									}}
								/>
								<InputRightAddon>
									<MyAssetsSelection
										selectedAsset={selectedAsset}
										setSelectedAsset={setSelectedAsset}
										availableAssets={availableAssets}
									/>
								</InputRightAddon>
							</InputGroup>
						</div>
						<h6 className="to-usd secondary">~${usdPrice}</h6>
					</div>
					<Checkbox className="anonymous-checkbox" defaultChecked>
						Make this donation anonymous
					</Checkbox>
					<Button
						id="donate-button"
						variant={"gradientOutline"}
						onClick={() => donate()}>
						DONATE
					</Button>
				</>

				<ZkModal
					isOpen={modal.visible}
					isError={modal.isError}
					title={modal.title}
					onClose={hideAndClearModal}>
					<>{modal.content}</>
				</ZkModal>
			</Container>
		</ScreenWrapper>
	);
}
