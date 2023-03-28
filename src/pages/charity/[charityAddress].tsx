import ScreenWrapper from "@/components/layout/screenWrapper";
import { getCharityInfoByAddress } from "@/lib/api/graph";
import Container from "@/lib/components/glassContainer";
import { GetCharityFunds } from "@/lib/contracts";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import { useSigner } from "wagmi";
import { ethers } from "ethers";
import { ETHPrice } from "@/lib/components/helpers";
export default function Charity() {
	const { data: signer, isLoading } = useSigner();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const charityAddress = router.query.charityAddress;
	const [charity, setCharity] = useState({} as any);

	async function getCharity(address) {
		let data = await getCharityInfoByAddress(address);
		console.log("data: ", data);
		if (data) {
			let balance = await GetCharityFunds(data.charityId, signer);
			let _balance = ethers.utils.formatEther(balance);
			let _usd = await ETHPrice(_balance);
			let _data = { ...data, balance: _balance, usd: _usd };
			console.log("_data: ", _data);
			setCharity(_data);
		}
		return data;
	}

	useLayoutEffect(() => {
		setLoading(true);
		console.log("inUseEffect", charityAddress);
		getCharity(charityAddress);
		setLoading(false);
	}, [charityAddress]);

	return (
		<ScreenWrapper className="charity-page" title={"zk.fund Charity Portal"}>
			{loading ? (
				<div className="loading"></div>
			) : (
				<Container>
					<>
						{charity.status !== 2 ? (
							<>
								<p>This wallet is not owned by a charity</p>
								<p>
									Need Help? Contact the zk.fund team at zkfundproject@gmail.com
								</p>
							</>
						) : (
							<div id="charity-info">
								<div className="header">
									<h2>Hi {charity.name}</h2>
									<p>Approved Charity</p>
								</div>
								<p>Total Funds:</p>
								<h2>{charity.balance || "0.00"} ETH </h2>
								<h5 className="secondary">${charity.usd || "0.00"}</h5>
								<Button variant={"solid"}>Withdraw All Funds</Button>
							</div>
						)}
					</>
				</Container>
			)}
		</ScreenWrapper>
	);
}
