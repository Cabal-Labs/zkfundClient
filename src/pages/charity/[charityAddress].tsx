import ScreenWrapper from "@/components/layout/screenWrapper";
import { getCharityInfoByAddress } from "@/lib/api/graph";
import Container from "@/lib/components/glassContainer";
import { GetCharityFunds, WithdrawDonations } from "@/lib/contracts";
import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import { useSigner } from "wagmi";
import { ethers } from "ethers";
import { getTokenPrice } from "@/lib/c omponents/helpers";
export default function Charity() {
	const { data: signer, isLoading } = useSigner();
	const router = useRouter();
	const charityAddress = router.query.charityAddress;

	const [loading, setLoading] = useState(false);
	const [charity, setCharity] = useState({} as any);
	const [status, setStatus] = useState(0);
	const testTotal = 450;
	const testTokens = [
		{
			address: "0x6b175474e89094c44da98b954eedeac495271d0f",
			amount: "0.02",
			symbol: "ETH",
			name: "Ethereum",
			usd_amount: "100",
		},
		{
			address: "0x6b175474e89094c44da98b954eedeac495271d0f",
			amount: "0.05",
			symbol: "OPT",
			name: "Optimism",
			usd_amount: "300",
		},
		{
			address: "0x6b175474e89094c44da98b954eedeac495271d0f",
			amount: "50",
			symbol: "USDC",
			name: "USD Coin",
			usd_amount: "50",
		},
	];
	// async function getCharity(address) {
	// 	let data = await getCharityInfoByAddress(address);
	// 	console.log("data: ", data);
	// 	if (data) {
	// 		let _balance = 0;
	// 		let tokenList = await GetCharityFunds(data.charityId, signer);
	// 		console.log("unformatted list", tokenList);
	// 		let _tokenList = [];
	// 		// loop through token list
	// 		for (let i = 0; i < tokenList.length; i++) {
	// 			let price = await getTokenPrice(tokenList[i].address);
	// 			let amount = await tokenList[i].amount;
	// 			let _amount = parseFloat(ethers.utils.formatEther(amount));
	// 			let usd_amount = price.usdPrice * _amount;
	// 			let _token = {
	// 				address: tokenList[i].address,
	// 				amount: tokenList[i].amount,
	// 				usd_amount: usd_amount,
	// 				name: price.nativePrice.name,
	// 				symbol: price.nativePrice.symbol,
	// 			};
	// 			_balance += usd_amount;
	// 			_tokenList.push(_token);
	// 		}
	// 		setStatus(data.status);
	// 		let _data = { ...data, balance: _balance, tokenList: _tokenList };
	// 		console.log("_data: ", _data);
	// 		setCharity(_data);
	// 	}
	// 	return data;
	// }
	async function handleWithdraw() {
		console.log("withdraw");
		let result = await WithdrawDonations(charity.charityId, signer);
		if (result.ok) {
			// pop a model saying success
		} else {
			// pop a model saying error
		}
	}
	useLayoutEffect(() => {
		if (charityAddress === undefined) return;
		setLoading(true);
		console.log("inUseEffect", charityAddress);
		//getCharity(charityAddress);
		setLoading(false);
	}, []);

	return (
		<ScreenWrapper className="charity-page" title={"zk.fund Charity Portal"}>
			{isLoading || loading ? (
				<div className="loading"></div>
			) : (
				<Container>
					<>
						{status !== 2 ? (
							<>
								<p>This wallet is not owned by a charity</p>
								<p>
									Need Help? Contact the zk.fund team at
									<a href="mailto:zkfundproject@gmail.com">
										zkfundproject@gmail.com
									</a>
								</p>
							</>
						) : (
							<div id="charity-info">
								<div className="header">
									<h2>Hi {charity.name}</h2>
									<p>Approved Charity</p>
								</div>
								<p>Total Funds:</p>
								<h2>${charity.balance || "0.00"}</h2>

								{/* currency indicator */}

								<Button variant={"solid"} onClick={() => handleWithdraw()}>
									Withdraw All Funds
								</Button>
								{/* <p>Token List</p> */}
								<div className="bar-wrapper">
									{testTokens.map((token, index) => {
										return (
											<div
												key={index}
												className="token"
												style={{
													width: `${
														(parseFloat(token.usd_amount) / testTotal) * 100
													}%`,
												}}>
												<Popover>
													<PopoverTrigger>
														<div>
															<h5>{token.symbol}</h5>
														</div>
													</PopoverTrigger>
													<PopoverContent>
														<div>
															<h5>{token.name}</h5>
															<p className="secondary">{token.symbol}</p>
														</div>
														<div>
															<h5>${token.usd_amount}</h5>
															<p className="secondary">{token.amount}</p>
														</div>
													</PopoverContent>
												</Popover>
											</div>
										);
									})}
								</div>
								<p className="secondary">Click for details</p>
							</div>
						)}
					</>
				</Container>
			)}
		</ScreenWrapper>
	);
}
