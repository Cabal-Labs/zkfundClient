import { Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
	const router = useRouter();
	return (
		<header id={"app-header"}>
			<div className="logo" onClick={() => router.push("/home")}>
				<Image
					src="/zkfundlogo_white.png"
					alt="ZK.Fund"
					width={30}
					height={30}
				/>
				{/* <h4>zk.fund</h4> */}
			</div>
			<div className="right">
				<Button
					onClick={() => {
						router.push("/validate");
					}}>
					Validator Portal
				</Button>
				<ConnectButton />
			</div>
		</header>
	);
}
