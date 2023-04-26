import ScreenWrapper from "@/components/layout/screenWrapper";
import { getCharityInfoByAddress } from "@/lib/api/graph";
import Container from "@/lib/components/glassContainer";
import { GetDonationPools, WithdrawDonations } from "@/lib/contracts";
import {
	Badge,
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useContext, useLayoutEffect, useState, useEffect } from "react";
import { useAccount } from "wagmi";

import { useSigner } from "wagmi";
import { ethers } from "ethers";
import { getTokenInfo, mumbaiToMainnet } from "@/lib/components/helpers";
import { Context } from "@/lib/providers/provider";
import { isCharityApproved } from "@/lib/api/graph";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import AssetSelectionRow from "@/components/donate/assetSelectionRow";
import AssetDisplayRow from "@/components/donate/assetDisplayRow";

export default function Charity() {
	const { data: signer, isLoading: isSignerLoading } = useSigner();
	const { setWalletAddress, setIsConnected } = useContext(Context);
	const { address: _address, isConnected: _isConnected } = useAccount();
	const [isCharityWallet, setIsCharityWallet] = useState<boolean>(false);
	const [loading, setLoading] = useState(false);
	const [charity, setCharity] = useState({} as any);

	async function refetchAddress() {
		if (!_address) {
			let retryAddress = _address;
			setWalletAddress(retryAddress);
			setIsConnected(_isConnected);
			return retryAddress;
		} else {
			return _address;
		}
	}
	async function getCharity(address) {
		let data = await getCharityInfoByAddress(address);
		console.log("data from address: ", data);
		if (data) {
			let _balance = 0;
			console.log(data.charityId);

			// TODO: Make sure this returns the array!!!!
			try {
				console.log("signer", signer);
				let tokenList = await GetDonationPools(data.charityId, signer);
				console.log("unformatted list", tokenList);
				let _tokenList = [];
				// let price = await getTokenPrice("0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174");
				// console.log( "Price Test: ",price );
				// loop through token list
				if (!tokenList) {
					// nothing was fetched from getDonationsPools
					console.log("NO TOKENS FETCHED");
				} else {
					if (tokenList.length > 0) {
						for (let i = 0; i < tokenList.length; i++) {
							console.log(`tokenlist[${i}]: `, tokenList[i][0]);
							console.log(`tokenlist[${i}]amount: `, tokenList[i].amount);
							//format the amount to a decimal
							let amount = await tokenList[i].amount;
							let _amount = parseFloat(ethers.utils.formatEther(amount));

							// let price = await getTokenInfo(tokenList[i][0]);
							// console.log({ price });
							// let amount = await tokenList[i].amount;
							// let _amount = parseFloat(ethers.utils.formatEther(amount));
							// let usd_amount = 0 * _amount;
							// let _token = {
							// 	address: tokenList[i].address,
							// 	amount: tokenList[i].amount,
							// 	usd_amount: usd_amount,
							// 	name: price.nativePrice.name,
							// 	symbol: price.nativePrice.symbol,
							// };
							// _balance += usd_amount;
							_tokenList.push({
								address: tokenList[i][0],
								amount: _amount,
							});
						}
						let _data = { ...data, balance: _balance, tokenList: _tokenList };
						console.log("_data: ", _data);
						setCharity(_data);
						_tokenList.reverse();
						return data;
					}
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			return null;
		}
	}
	async function handleWithdraw() {
		console.log("withdraw");
		let result = await WithdrawDonations(charity.charityId, signer);
		if (result) {
			// pop a model saying success
		} else {
			// pop a model saying error
		}
	}
	async function isCharity(address: string) {
		const d = await isCharityApproved(address);
		if (d) {
			setIsCharityWallet(true);
			await getCharity(address);
		} else {
			setIsCharityWallet(false);
		}
	}

	useEffect(() => {
		setLoading(true);
		if (_address && _isConnected && signer) {
			isCharity(_address);
			setWalletAddress(_address);
		}
		setLoading(false);
	}, [_address, _isConnected, signer]);
	return (
		<ScreenWrapper
			className="charity-page"
			title={"zk.fund Charity Portal"}
			loading={loading}>
			<>
				{!isCharityWallet ? (
					<>
						<h3>This wallet is not owned by a valid charity</h3>
						<p>
							Need Help? Contact the zk.fund team at
							<a href="mailto:zkfundproject@gmail.com">
								zkfundproject@gmail.com
							</a>
						</p>
						<br />
						<br />
						<p>Think you're a verified Charity?</p>
						<Button
							onClick={() => {
								let retryAddress = refetchAddress();
								getCharity(retryAddress);
							}}>
							Retry Authentication
						</Button>
					</>
				) : (
					<Container>
						<div id="charity-info">
							<div className="header">
								<h2>Hi {charity.name}</h2>
								<Badge colorScheme="green" size={"lg"}>
									Approved Charity
								</Badge>
							</div>
							<p>Total Funds:</p>
							<h2>${charity.balance || "0.00"}</h2>

							<Button variant={"solid"} onClick={() => handleWithdraw()}>
								Withdraw All Funds
							</Button>
							<div>
								<Badge colorScheme="red">
									Warning: We are on a testnet all tokens have 0 value
								</Badge>
							</div>

							<div className="asset-container">
								{charity.tokenList?.map((token, index) => {
									return (
										<AssetDisplayRow
											address={token.address}
											amount={token.amount}
										/>
									);
								})}
							</div>
							{/* <div className="bar-wrapper">
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
							<p className="secondary">Click for details</p> */}
						</div>
					</Container>
				)}
			</>
		</ScreenWrapper>
	);
}
