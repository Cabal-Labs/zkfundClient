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
import { useSigner, useBalance, useAccount } from "wagmi";
import { fetchBalance } from "@wagmi/core";
import ScreenWrapper from "@/components/layout/screenWrapper";
import { BigNumber, ethers } from "ethers";
import { getCharityInfo } from "@/lib/api/graph";
import ZkModal from "@/components/zkModal";
import { getTokenInfo, mumbaiToMainnet } from "@/lib/components/helpers";
import Container from "@/lib/components/glassContainer";
import MyAssetsSelection, {
	AssetType,
} from "@/components/donate/myAssetsSelection";
import { MakeDonation } from "@/lib/contracts";
import { Alchemy, Network } from "alchemy-sdk";
// import { ETHPrice } from "@/lib/components/helpers";
export const whiteListedTokens: `0x${string}`[] = [
	"0x0000000000000000000000000000000000000000",
	"0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
	"0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e",
	"0xE097d6B3100777DC31B34dC2c58fB524C2e76921",
];
export default function Donate(props: any) {
	const router = useRouter();
	// get charityId from url
	const { charityId } = router.query;
	let id = parseInt(charityId as string);
	const { walletAddress } = useContext(Context);
	const { data: signer, isLoading } = useSigner();
	// const {data} = useAccount()

	const [availableAssets, setAvailableAssets] =
		useState<string[]>(whiteListedTokens);

	const [charityData, setCharityData] = useState(null);
	const [charityLoading, setCharityLoading] = useState(false);
	const [selectedAsset, setSelectedAsset] = useState(whiteListedTokens[0]);
	const [usdPrice, setUsdPrice] = useState(0);
	const [timer, setTimer] = useState(null);

	const [amount, setAmount] = useState("");
	const [modal, setModal] = useState({
		visible: false,
		isError: false,
		title: "",
		content: null,
	});
	const {
		data: tokenData,
		isError,
		isLoading: maticLoading,
		refetch,
	} = useBalance({
		address: walletAddress as `0x${string}`,
		token: assetCheck(),
	});
	useEffect(() => {
		refetch();
	}, [selectedAsset]);
	function assetCheck(): `0x${string}` {
		if (selectedAsset === "0x0000000000000000000000000000000000000000") {
			return null;
		} else {
			return selectedAsset;
		}
	}

	async function donate() {
		// send amount to charity

		let _amount = ethers.utils.parseUnits(amount, tokenData?.decimals);
		console.log(_amount.toString());
		try {
			console.log("MAKING DONATION");
			const result = await MakeDonation(id, _amount, selectedAsset, signer);
			console.log("DONATION MADE");
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
				const info = await getTokenInfo(address);
				// let price = info.usdPrice * parseFloat(amount);
				// console.log({ price });
				setUsdPrice(0);
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
		console.log("GETTING ASSETS");
		let _availableAssets = ["0x0000000000000000000000000000000000000000"];

		try {
			const alchemy = new Alchemy(config);
			let balances = (await alchemy.core.getTokenBalances(
				walletAddress
			)) as any;
			console.log("HERE");
			console.log({ balances });

			for (let i = 0; i < balances.tokenBalances.length; i++) {
				// if the mainnet address of the token is in the availableAssets array
				//fetch the price and amount
				let tokenBalance = balances.tokenBalances[i].tokenBalance;
				let tokenAddress = balances.tokenBalances[i].contractAddress;
				if (whiteListedTokens.indexOf(tokenAddress) !== -1) {
					_availableAssets.push(tokenAddress);
				}
			}
			setAvailableAssets(_availableAssets);
		} catch (e) {
			console.log(e);
		}
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
										handleAmount(e.target.value, selectedAsset);
									}}
								/>
								<InputRightAddon>
									<MyAssetsSelection
										selectedAsset={selectedAsset}
										setSelectedAsset={setSelectedAsset}
									/>
								</InputRightAddon>
							</InputGroup>
						</div>
						<h6 className="to-usd secondary">~${usdPrice}</h6>
					</div>
					<Checkbox className="anonymous-checkbox" defaultChecked isDisabled>
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
