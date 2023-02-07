import { useState } from "react";
import DebounceSearch from "@/components/home/debounceSearch";
import RenderCharities from "@/components/home/renderCharities";
import ScreenWrapper from "@/components/layout/screenWrapper";
import { CharityCardProps } from "@/lib/types";
import { charityCards, charityDetails } from "@/lib/dummyData";
import CharityDetails from "@/components/charity/charityDetails";
import charitiesApi from "@/lib/api/charities";

function getServerSideProps() {
	// get initial charity list (just 10)
}
export default function Home(props) {
	const [loading, setLoading] = useState<boolean>(false);
	const [charities, setCharities] = useState<CharityCardProps[]>([]);
	async function filter(search): Promise<CharityCardProps[] | void> {
		const initialData = charityCards;
		//mock an api request that returns charities with names that match the search param
		const filteredData = initialData.filter((charity) => {
			return charity.name.toLowerCase().includes(search.toLowerCase());
		});
		console.log(filteredData);
		return filteredData;
	}
	async function getCharities(search: string): Promise<CharityCardProps[]> {
		setLoading(true);
		console.log("getting Charities that match: ", search);
		// const { data, status, ok } = await charityApi.search(search);
		//mocked ^^ charityApi.search will return a list of charities that match the search param
		const { data, status, ok } = await charitiesApi.getCharities({ search });
		if (ok) {
			// @ts-ignore
			setCharities(data.data.data);
			setLoading(false);
		}
		// @ts-ignore
		return data.data.data;
	}

	return (
		<ScreenWrapper className="home-page">
			<main>
				<div className="container">
					<div id="search-container">
						<DebounceSearch onSubmit={getCharities} />
						<RenderCharities loading={loading} charities={charities} />
					</div>
					<div id="results-container">
						<CharityDetails {...charityDetails[0]} />
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
