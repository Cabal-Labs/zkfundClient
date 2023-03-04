import ScreenWrapper from "@/components/layout/screenWrapper";
import { Button, Checkbox, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MakeDonation } from "@/lib/contracts";
import { BigNumber, ethers } from "ethers";
export default function Donate(props) {
	const [amount, setAmount] = useState("");
	const router = useRouter();
	const id: string = router.query.id as string;
	async function donate() {
		// send amount to charity
		const _amount: BigNumber = ethers.utils.parseEther(amount);
		const result = await MakeDonation(id, _amount);
		console.log(result);
		if (result.ok) {
		}
	}
	return (
		<ScreenWrapper className="donate-page" title={"zk.fund Home"}>
			<main>
				<div className="container">
					<div id="pick-charity">
						{/* show selected charity, onclick opens modal */}
						<div id="charity-logo-div">
							<img
								id="charity-logo"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzmiAMnhX5wmE3rsbFP1Y6gIxdvTUxbC6sNhhNQnzqM9JEOtfWpjQuPHNj4luUVwILKr4&usqp=CAU"
								alt="charity logo"
							/>
						</div>
						<h2 id="charity-name">Name of charity</h2>
						<div id="select-value-row">
							{/* <h2>$</h2> */}
							<Input
								placeholder="0.00"
								id="select-value-input"
								variant={"underlined"}
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
							/>
							<Button id="select-value-button" variant={"gradientOutline"}>
								ETH
							</Button>
						</div>
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
		</ScreenWrapper>
	);
}
