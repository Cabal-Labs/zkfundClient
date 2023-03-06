import Head from "next/head";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import ScreenWrapper from "@/components/layout/screenWrapper";
import Icon from "@/lib/icons";
import { useContext, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { Context } from "@/lib/providers/provider";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
	const router = useRouter();
	const { setPubAddress } = useContext(Context);
	const { address, isConnected } = useAccount();
	//todo: important important! - fix wallet connect bug
	function handleMainCTA() {
		if (isConnected) {
			router.push("/home");
		} else {
			useConnect();
		}
	}
	// useEffect(() => {
	// 	if (address && isConnected) {
	// 		setPubAddress(address);
	// 		router.push("/home");
	// 	}
	// }, [address, isConnected]);
	const timelineItems = [
		{
			title: "Team Formation",
			description: "We formed a team of 5 people",
			status: "done",
		},
		{
			title: "Proof of Concept",
			description: "Charity",
			status: "done",
		},
		{
			title: "Process Donation",
			description: "Charity",
			status: "done",
		},
		{
			title: "Process Donation Using Aztec",
			description: "Charity",
			status: "done",
		},
	];
	return (
		<ScreenWrapper title={"Welcome to zk.fund"} className="landing-page">
			<main>
				<div id="landing">
					<div className="title">
						<h1>Donations are your Right</h1>
						<h3>powered by Aztec</h3>
					</div>
					<div className="cta">
						{isConnected ? (
							<Button
								size={"lg"}
								variant={"contained"}
								onClick={() => handleMainCTA()}>
								Go to Dashboard
							</Button>
						) : (
							<ConnectButton />
						)}
						{!isConnected ? (
							<a href="https://metamask.io/" target={"_blank"}>
								What's a Wallet?
							</a>
						) : (
							<></>
						)}
					</div>
					<div className="footer">
						<Icon icon={"ChevronDown"} size={60} className={"white"} />
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
				<section id="timeline">
					<div className="content">
						<h2>Our Timeline</h2>
						<div className="timeline">
							<div className="line"></div>
							{timelineItems.map((item, index) => {
								return (
									<div
										className={`timeline-item ${item.status} ${
											index % 2 === 0 ? "even" : "odd"
										}`}
										key={index}>
										<div className="timeline-item-content">
											<h3>{item.title}</h3>
											<p>{item.description}</p>
										</div>
										<div className="dot"></div>
									</div>
								);
							})}
						</div>
					</div>
				</section>
			</main>
		</ScreenWrapper>
	);
}
