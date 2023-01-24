import { Button } from "@chakra-ui/react";

export default function Header() {
	return (
		<header>
			<span>
				{/* logo  */}
				<h4>zk.fund</h4>
			</span>
			<span>
				{/* wallet */}
				<Button>Connect Wallet</Button>
			</span>
		</header>
	);
}
