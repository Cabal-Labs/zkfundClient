import Head from "next/head";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import ScreenWrapper from "@/components/layout/screenWrapper";
import Icon from "@/lib/icons";
import {
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { Context } from "@/lib/providers/provider";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { isCharityApproved } from "@/lib/api/graph";
import { ethers } from "ethers";
import { useMousePosition } from "./_app";
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

	function Overlay() {
		const { x, y } = useMousePosition();

		return (
			<div
				className="overlay"
				style={{
					position: "absolute",
					left: `${x}px`,
					top: `${y}px`,
				}}></div>
		);
	}

	return (
		<ScreenWrapper
			title={"Welcome to zk.fund"}
			className="landing-page"
			loading={loading}>
			<div id="background-container">
				<Overlay />
				<img
					id="landing-background"
					src="/landing_background.jpg"
					alt="landing"
				/>
			</div>
			<div id="landing-background"></div>
			<main>
				<div id="landing">
					<div className="title">
						<h1>Donations are your right</h1>
						<h3>powered by Polygon</h3>
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
							ZKFund exists as a pioneering web3 company, dedicated to
							democratizing access to donations by harnessing the power of
							blockchain technology. Our mission is to champion the right to
							donate and support causes that align with individual values while
							fostering a transparent and accountable donation ecosystem. As a
							forward-thinking organization, ZKFund understands the importance
							of embracing innovation to address the challenges faced by the
							traditional philanthropic sector. Our dedication to utilizing
							blockchain technology not only enhances the security and privacy
							of donations but also streamlines the donation process, making it
							more accessible and efficient for all.
						</p>
					</div>
					<div className="img-wrapper">
						<Image
							src={"/make_a_change.jpg"}
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
							As a leading force in decentralized philanthropy, ZKFund upholds
							the principles of privacy and Free Speech by providing truly
							anonymous donation options. This approach enables donors to voice
							their support for a wide range of social, political, and
							environmental causes without facing judgment, discrimination, or
							potential backlash. By combining cutting-edge technology with our
							unwavering commitment to privacy and Free Speech, ZKFund is
							fostering a more inclusive and equitable donation environment,
							enabling individuals from all walks of life to make a positive
							impact on the world. Discover the future of philanthropy with
							ZKFund, and join us in redefining the way we give.
						</p>
					</div>
					<div className="img-wrapper">
						<Image
							src={"/free_speech.jpg"}
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
							At ZKFund, we prioritize the importance of curating a network of
							validators who collaborate to onboard a diverse range of
							charities, as determined by community requests. This decentralized
							approach empowers the community by placing decision-making
							authority into their hands. Furthermore, ZKFund is committed to
							safeguarding donor privacy by enabling truly anonymous donations.
							This protects individuals who might face risks when supporting
							specific social causes, encouraging a more open and dynamic
							philanthropic environment without fear of repercussions.
						</p>
					</div>
					<div className="img-wrapper">
						<Image
							src={"/crowd.jpg"}
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
