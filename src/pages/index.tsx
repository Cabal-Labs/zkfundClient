import Head from "next/head";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import ScreenWrapper from "@/components/layout/screenWrapper";
import Icon from "@/lib/icons";
import { useContext, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { Context } from "@/lib/providers/provider";

export default function Home() {
	const router = useRouter();
	const { setPubAddress } = useContext(Context);
	const { address, isConnected } = useAccount();

	// useEffect(() => {
	// 	if (address && isConnected) {
	// 		setPubAddress(address);
	// 		router.push("/home");
	// 	}
	// }, [address, isConnected]);
	return (
		<ScreenWrapper title={"Welcome to zk.fund"} className="landing-page">
			<main>
				<div id="landing">
					<div className="title">
						<h1>Donate Anonymously</h1>
						<h3>powered by Aztec</h3>
					</div>
					<div className="cta">
						<Button size={"lg"} variant={"contained"}>
							Connect Wallet
						</Button>
						<a href="">What's a Wallet?</a>
					</div>
					<div className="footer">
						<Icon icon={"ChevronDown"} size={60} />
						<h4>Learn More</h4>
					</div>
				</div>

				<section className="" id="info-1">
					<div className="content">
						<h2>Why do we exist?</h2>
						<p>
							Laboris nostrud dolore proident culpa non mollit proident
							reprehenderit aliqua et quis exercitation Lorem. Deserunt sunt
							commodo elit fugiat fugiat ad proident magna. Incididunt do minim
							irure veniam esse. Sint eiusmod do proident fugiat irure laborum
							consequat pariatur reprehenderit velit minim cupidatat. Laborum
							nulla aute reprehenderit excepteur nostrud velit reprehenderit
							irure aliquip ad ea incididunt ipsum. Commodo cupidatat laborum
							qui reprehenderit laboris non nulla commodo officia minim anim in
							occaecat.
						</p>
					</div>
					<div className="img-wrapper">
						<Image
							src={"https://picsum.photos/200"}
							layout={"fill"}
							objectFit={"cover"}
							objectPosition={"center"}
						/>
					</div>
				</section>
				<section className="reverse" id="info-1">
					<div className="content">
						<h2>Donations are protected by Free Speech</h2>
						<p>
							Laboris nostrud dolore proident culpa non mollit proident
							reprehenderit aliqua et quis exercitation Lorem. Deserunt sunt
							commodo elit fugiat fugiat ad proident magna. Incididunt do minim
							irure veniam esse. Sint eiusmod do proident fugiat irure laborum
							consequat pariatur reprehenderit velit minim cupidatat. Laborum
							nulla aute reprehenderit excepteur nostrud velit reprehenderit
							irure aliquip ad ea incididunt ipsum. Commodo cupidatat laborum
							qui reprehenderit laboris non nulla commodo officia minim anim in
							occaecat.
						</p>
					</div>
					<div className="img-wrapper">
						<Image
							src={"https://picsum.photos/200"}
							layout={"fill"}
							objectFit={"cover"}
							objectPosition={"center"}
						/>
					</div>
				</section>
				<section className="" id="info-1">
					<div className="content">
						<h2>Verified charities give you peace of mind</h2>
						<p>
							Laboris nostrud dolore proident culpa non mollit proident
							reprehenderit aliqua et quis exercitation Lorem. Deserunt sunt
							commodo elit fugiat fugiat ad proident magna. Incididunt do minim
							irure veniam esse. Sint eiusmod do proident fugiat irure laborum
							consequat pariatur reprehenderit velit minim cupidatat. Laborum
							nulla aute reprehenderit excepteur nostrud velit reprehenderit
							irure aliquip ad ea incididunt ipsum. Commodo cupidatat laborum
							qui reprehenderit laboris non nulla commodo officia minim anim in
							occaecat.
						</p>
					</div>
					<div className="img-wrapper">
						<Image
							src={"https://picsum.photos/200"}
							layout={"fill"}
							objectFit={"cover"}
							objectPosition={"center"}
						/>
					</div>
				</section>
			</main>
		</ScreenWrapper>
	);
}
