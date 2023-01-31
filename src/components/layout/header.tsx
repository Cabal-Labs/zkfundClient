import { Button } from "@chakra-ui/react";

export default function Header() {
	return (
		<header id={"app-header"}>
			<div>
				{/* logo  */}
				<h4>zk.fund</h4>
			</div>
			<div>
				{/* wallet */}
				<Button>Connect Wallet</Button>
			</div>
		</header>
	);
}
