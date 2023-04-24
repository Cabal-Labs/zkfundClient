import Head from "next/head";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import ScreenWrapper from "@/components/layout/screenWrapper";
import Icon from "@/lib/icons";
import { useContext, useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { Context } from "@/lib/providers/provider";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { isCharityApproved } from "@/lib/api/graph";
export default function Home() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const {
		walletAddress,
		setWalletAddress,
		setIsConnected,
		isConnected: _isConnected,
	} = useContext(Context);
	const { address, isConnected } = useAccount();
	const [isCharityWallet, setIsCharityWallet] = useState<boolean>(false);
	function handleMainCTA({ isAnnon }) {
		if (isConnected) {
			if (!isAnnon) {
				router.push("/home");
			}
		} else {
			useConnect();
		}
	}
	async function isCharity(address: string) {
		const d = await isCharityApproved(address);
		if (d) {
			setIsCharityWallet(true);
		} else {
			setIsCharityWallet(false);
		}
	}
	function handleCharityPortal() {
		if (_isConnected) {
			if (isCharity(address)) {
				router.push(`/charity`);
			} else {
				return;
			}
		}
	}
	useEffect(() => {
		setLoading(true);
		if (address && isConnected) {
			isCharity(address);
			setWalletAddress(address);
			setIsConnected(isConnected);
		}
		setLoading(false);
	}, [address, isConnected]);

	const timelineItems = [
		{
			date: "Sept '22",
			title: "Team Formation",
			description:
				"The zk.fund team came together to through the Stevens Institute of Technology Senior Design Program. Team members Brendan, Amit, Christian, and Marcos had worked together in the past and were excited to begin working on issues in the donation space.",
			status: "Done",
		},
		{
			date: "Sept '22 - November '22",
			title: "ClearFund",
			description:
				"Initially, the team was called ClearFund and the problem we were focusing on was a lack of transparency during the donation process. Though, after interviewing charities we realized that each organization has its own policies and procedures and it would be difficult ot build a system that would work well with enough charities. We considered shifting our focus.",
			status: "Done",
		},
		{
			date: "November '22",
			title: "Pivot to zk.fund",
			description:
				"Marco found a bounty from the Aztec Network for an Anonymous Donation Portal. We liked that this still related to the charity space, but had a clearer problem and solution. People around the world are unable to donate to causes they care about because of oppressive rules or social taboo. We believe that it a right to be able to donate to causes you care about.",
			status: "Done",
		},
		{
			date: "Novemner '22 - May '23",
			title: "Building an MPV",
			description:
				"We are in the process of building our first version of zk.fund. At release, users will be able to donate to charities that have been verified by the zk.fund team. Users can also request new charities to be added, which will be handled by the zk.fund team. We are aware that only real charities can be allowed, else we risk allowing evil actors to use zk.fund to launder money. We are working on a solution to this problem and will be releasing it in the future.",
			status: "in-progress",
		},
		{
			date: "May '23 - Future",
			title: "Open Source",
			description: `After graduation, we plan on working with Cabal Labs to open source this project. We hope that this will allow us to continue to work on zk.fund and allow others to contribute to the validator network, and grow our list of charities.`,
			status: "todo",
		},
	];

	return (
		<ScreenWrapper
			title={"Welcome to zk.fund"}
			className="landing-page"
			loading={loading}>
			<main>
				<div id="landing">
					<div className="title">
						<h1>Donations are your Right</h1>
						<h3>powered by Polygon zkEVM</h3>
					</div>
					<div className="cta">
						{_isConnected ? (
							<div>
								<div className="top">
									<Button
										size={"md"}
										variant={"contained"}
										onClick={() => handleMainCTA({ isAnnon: false })}
										leftIcon={<Icon icon={"DonateHeart"} size={20} />}>
										Donate
									</Button>
									<div>
										<p className="secondary">Coming Soon!</p>
										<Button
											size={"md"}
											isDisabled
											variant={"contained"}
											onClick={() => handleMainCTA({ isAnnon: true })}
											leftIcon={<Icon icon={"Incognito"} size={20} />}>
											Donate Anonymously
										</Button>
									</div>
								</div>
								{isCharityWallet ? (
									<Button
										size={"sm"}
										isDisabled={!isCharityWallet}
										variant={"outlined"}
										onClick={() => handleCharityPortal()}
										leftIcon={<Icon icon={"Group"} size={20} />}>
										Enter Charity Portal
									</Button>
								) : (
									<></>
								)}
							</div>
						) : (
							<ConnectButton />
						)}
						{!_isConnected ? (
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
							There are so many platforms you can use to donate to charities,
							but none of them offer true donation privacy. The ones that claim
							to do so still facilitate transactions that are trackable by
							governments. Why is donation privacy important? People may not
							want others to see what social causes or political candidates they
							support for various reasons. In terms of social and professional
							implications, other people and even one's workplace may not be
							tolerant of the causes one chooses to support. Moreover, in some
							parts of the world, especially 3rd world countries and countries
							with oppressive regimes, it is actually dangerous to publicly
							support certain political parties or social causes.
						</p>
					</div>
					{/* <div className="img-wrapper">
						<Image
							src={"https://picsum.photos/200"}
							layout={"fill"}
							objectFit={"cover"}
							objectPosition={"center"}
						/>
					</div> */}
				</section>
				<section className="reverse" id="info-1">
					<div className="content">
						<h2>Donations are protected by Free Speech</h2>
						<p>
							At zk.fund, we believe people deserve the right to donate to
							causes that are meaningful to them, regardless of what others may
							believe. Our mission is to make safe, secure, and anonymous
							donations possible for everyone, especially for causes that are
							stigmatized in a donor's community. Our platform uses cutting-edge
							technology to ensure that your donations stay private, so you can
							support the causes you believe in without worrying about potential
							consequences.
						</p>
					</div>
					{/* <div className="img-wrapper">
						<Image
							src={"https://picsum.photos/200"}
							layout={"fill"}
							objectFit={"cover"}
							objectPosition={"center"}
						/>
					</div> */}
				</section>
				<section className="" id="info-1">
					<div className="content">
						<h2>Verified charities give you peace of mind</h2>
						<p>
							We know how it sounds. Anonymous donations? That sounds like a
							recipe for disaster, especially when you consider certain bad
							actors that could benefit from receiving funding through the
							platform. How do I make sure my money isn't going to money
							laundering activities or towards funding terrorist organizations?
							Rest assured, we have built out a robust validator network that
							works to verify each and every charity and organization on
							zk.fund. Our validators are trained to conduct heavy due diligence
							to ensure every organization on the platform is legitimate.
						</p>
					</div>
					{/* <div className="img-wrapper">
						<Image
							src={"https://picsum.photos/200"}
							layout={"fill"}
							objectFit={"cover"}
							objectPosition={"center"}
						/>
					</div> */}
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
										<div className="dot"></div>
										<div className="timeline-item-content">
											<div className="title">
												<h3>{item.title}</h3>
												<div className="status">{item.status}</div>
											</div>
											<h6>{item.date}</h6>
											<hr />
											<p>{item.description}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</section>
				<h4 className="center pb">
					Interested in contribuing? Email us at{" "}
					<a href={"mailto:zkfundproject@gmail.com"}>zkfundproject@gmail.com</a>
					!
				</h4>
			</main>
		</ScreenWrapper>
	);
}
