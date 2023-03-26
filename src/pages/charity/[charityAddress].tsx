import ScreenWrapper from "@/components/layout/screenWrapper";
import { getCharityInfoByAddress } from "@/lib/api/graph";
import { GetCharityFunds } from "@/lib/contracts";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import { useSigner } from "wagmi";

export default function Charity() {
	const { data: signer, isLoading } = useSigner();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const charityAddress = router.query.charityAddress;
	const [charity, setCharity] = useState({} as any);
	async function getCharity(address) {
		let data = await getCharityInfoByAddress(address);
		console.log("data: ", data);
		console.log("charityId: ", data.id);
		let balance = await GetCharityFunds(data.charityId, signer);
		console.log("balance: ", balance.toString());
		setCharity(data);
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
				<main>
					<div className="container">
						<div id="charity-info">
							<h2>Hi {charity.name}</h2>
							{charity.status !== 2 ? (
								<>
									<p>Not Approved Yet</p>
								</>
							) : (
								<div>
									<p>Approved Charity</p>
									<Button variant={"solid"}>Withdraw All Funds</Button>
								</div>
							)}
						</div>
					</div>
					<div className="shapes">
						<div className="shape-0"></div>
						<div className="shape-1"></div>
						<div className="shape-2"></div>
						<div className="shape-3"></div>
						<div className="shape-4"></div>
						<div className="shape-5"></div>
						<div className="shape-6"></div>
						<div className="shape-7"></div>
					</div>
				</main>
			)}
		</ScreenWrapper>
	);
}
