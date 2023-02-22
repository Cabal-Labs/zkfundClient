import ScreenWrapper from "@/components/layout/screenWrapper";

export default function Donate(props) {
	return (
		<ScreenWrapper className="home-page" title={"zk.fund Home"}>
			<main>
				<div className="container">
					<div id="pick-charity">
						{/* show selected charity, onclick opens modal */}
					</div>
					<div id="pick-amount">
						{/* interactive select amount component */}
					</div>
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
