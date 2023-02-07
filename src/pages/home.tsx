import { useState } from "react";
import DebounceSearch from "@/components/home/debounceSearch";
import RenderCharities from "@/components/home/renderCharities";
import ScreenWrapper from "@/components/layout/screenWrapper";
import { CharityCardProps } from "@/lib/types";
import { charityCards, charityDetails } from "@/lib/dummyData";
import CharityDetails from "@/components/charity/charityDetails";

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
		const ok = true;
		const data = (await filter(search)) as CharityCardProps[];
		console.log(data);
		if (ok) {
			setCharities(data);
		}
		setLoading(false);
		return data;
	}

	return (
		<ScreenWrapper className="home-page">
			<main id="home-search">
				<div id="search-container">
					<DebounceSearch onSubmit={getCharities} />
					<RenderCharities loading={loading} charities={charities} />
				</div>
				<div id="results-container">
					<CharityDetails {...charityDetails[0]} />
				</div>
			</main>
		</ScreenWrapper>
	);
}
