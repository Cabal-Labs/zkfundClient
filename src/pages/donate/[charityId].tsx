import ScreenWrapper from "@/components/layout/screenWrapper";
import {
	Button,
	Checkbox,
	Input,
	InputGroup,
	InputRightAddon,
	InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState , useContext} from "react";
import { MakeDonation } from "@/lib/contracts";
import { BigNumber, ethers } from "ethers";
import { useSigner, useBalance } from "wagmi";
import { getCharityInfo } from "@/lib/api/graph";
import ZkModal from "@/components/zkModal";
import { ETHPrice } from "@/lib/components/helpers";
import Container from "@/lib/components/glassContainer";
import MyAssetsSelection from "@/components/donate/myAssetsSelection";
import { Context } from "@/lib/providers/provider";
import { AssetType } from "@/src/components/myAssetsSelection";
// import { ETHPrice } from "@/lib/components/helpers";

export default function Donate(props: any) {
	const router = useRouter();
	// get charityId from url
	const { charityId } = router.query;
	let id = parseInt(charityId as string);
	const { walletAddress } = useContext(Context);
	const { data: signer, isLoading } = useSigner();
	const [availableAssets, setAvailableAssets] = useState<AssetType[]>([
		{
			name: "Ethereum",
			ticker: "ETH",
			balance: "0.00",
			balanceInUSD: "0.00",
			address: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa"
		},
		{
			name: "USD Coin",
			ticker: "USDC",
			balance: "0.00",
			balanceInUSD: "0.00",
			address: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23"
		},
		{
			name: "Matic",
			ticker: "MATIC",
			balance: "0.00",
			balanceInUSD: "0.00",
			address:"0x0000000000000000000000000000000000000000"
		}
	])
	
	const [charityData, setCharityData] = useState(null);
	const [charityLoading, setCharityLoading] = useState(false);
	const [selectedAsset, setSelectedAsset] = useState(availableAssets[0].ticker)
	const [usdPrice, setUsdPrice] = useState("0.00");
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
		console.log(data);
		setCharityLoading(false);
	}

	async function handleAmount(amount: string) {
		// handle amount input
		setAmount(amount);
		clearTimeout(timer);

		const newTimer = setTimeout(async () => {
			if (amount !== "") {
				const price = await ETHPrice(amount);
				setUsdPrice(price);
			} else {
				setUsdPrice("0.00");
			}
		}, 500);

		setTimer(newTimer);
	}
	async function getAssets(){

	
			
			let _availableAssets = availableAssets;
			for (let i = 0; i < _availableAssets.length; i++) {
				const { data, isError, isLoading } = useBalance({
					address: _availableAssets[i].address,
				  })
			}
		}
	useEffect(() => {
		getCharity();
		getAssets();
	}, [charityId, walletAddress]);
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
										handleAmount(e.target.value);
									}}
								/>
								<InputRightElement>
								<MyAssetsSelection selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} availableAssets={[]} />
									
								</InputRightElement>
							</InputGroup>
						</div>
							{/* show eth to usd conversion */}
						<h6 className="secondary">
							~${usdPrice}
							{/* //todo: Marco */}
						</h6>
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
