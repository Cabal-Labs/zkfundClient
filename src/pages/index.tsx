import Head from "next/head";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import ScreenWrapper from "@/components/layout/screenWrapper";

export default function Home() {
	return (
		<ScreenWrapper>
			<main>
				<div>
					<h1>Welcome to zk.fund</h1>
					<h2>Welcome to zk.fund</h2>
					<h3>Welcome to zk.fund</h3>
					<h4>Welcome to zk.fund</h4>
					<h5>Welcome to zk.fund</h5>
					<h6>Welcome to zk.fund</h6>
					<p>paragraph</p>
					<a href="">Link</a>
					<div>
						<Button variant={"contained"}>Get Started</Button>
					</div>
					<div>
						<Button variant={"outlined"}>Get Started</Button>
					</div>
					<div>
						<Button variant={"filled"}>Get Started</Button>
					</div>
				</div>
			</main>
		</ScreenWrapper>
	);
}
