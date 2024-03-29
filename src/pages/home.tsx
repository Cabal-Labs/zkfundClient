import { useEffect, useState } from "react";
import DebounceSearch from "@/components/home/debounceSearch";
import RenderCharities from "@/components/home/renderCharities";
import ScreenWrapper from "@/components/layout/screenWrapper";
import { CharityCardProps } from "@/lib/types";

import CharityDetails from "@/components/charity/charityDetails";
import charitiesApi from "@/lib/api/charities";
import { useToast } from "@chakra-ui/react";
import { SearchCharities, getInitialCharities } from "@/lib/api/graph";
import Icon from "@/lib/icons";

export default function Home(props) {
	

	const [searchTerm, setSearchTerm] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [charities, setCharities] = useState<any>([]);
	const [selectedCharity, setSelectedCharity] = useState<number>(0);

	async function getCharities(search: string): Promise<CharityCardProps[]> {
		// console.log("getting Charities that match: ", search);
		// const { data, status, ok } = await charitiesApi.getCharities({ search });
		if (search !== "") {
			setLoading(true);
			const charities = await SearchCharities(search);
			if (charities) {
				setCharities(charities);
			} else {
				setCharities([]);
				// show an error toast saying something went wrong
			}
			setLoading(false);
			return charities;
		}else{
			const charities = await getInitialCharities();
			setCharities(charities);
			setLoading(false);
			return charities;
		}

		
	}
	const getInitial = async () => {
		const charities = await getInitialCharities();
		console.log("charities: ", charities);
		setCharities(charities);
	};
	
	useEffect(() => {
		console.log("selectedCharity: ", selectedCharity);
		getInitial();
	}, [selectedCharity]);
	return (
		<ScreenWrapper
			className="home-page"
			title={"zk.fund Home"}
			>
			<main>
				<div className="container">
					<div id="search-container">
						<DebounceSearch
							onSubmit={getCharities}
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
						/>

						<RenderCharities
							loading={loading}
							charities={charities}
							searchTerm={searchTerm}
							setSelectedCharity={setSelectedCharity}
						/>
					</div>
					<div id="results-container">
						{selectedCharity === 0 ? (
							<div className="charity-details no-charity">
								<Icon
									icon={"DonateHeart"}
									title={"Charity"}
									size={50}
									className="white"
								/>
								<h3>Welcome to zk.fund</h3>
								<div className="hint">
									<Icon icon={"Search"} title={"Search"} />
									<p>Search for a charity to learn more</p>
								</div>
							</div>
						) : (
							<CharityDetails selectedCharity={selectedCharity} />
						)}
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
