import { Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
	return (
		<header id={"app-header"}>
			<div>
				{/* logo  */}
				<h4>zk.fund</h4>
			</div>
			<div>
				<ConnectButton />
			</div>
		</header>
	);
}
