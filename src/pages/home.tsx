import { useState } from "react";
import DebounceSearch from "@/components/home/debounceSearch";
import RenderCharities from "@/components/home/renderCharities";
import ScreenWrapper from "@/components/layout/screenWrapper";
import { CharityCardProps } from "@/lib/types";
import { charityCards, charityDetails } from "@/lib/dummyData";
import CharityDetails from "@/components/charity/charityDetails";
import charitiesApi from "@/lib/api/charities";
import { useToast } from "@chakra-ui/react";

function getServerSideProps() {
	// get initial charity list (just 10)
}
export default function Home(props) {
	const toast = useToast();
	const [searchTerm, setSearchTerm] = useState<string>("");

	const [loading, setLoading] = useState<boolean>(false);
	const [charities, setCharities] = useState<CharityCardProps[]>([]);
	const [selectedCharity, setSelectedCharity] = useState<CharityCardProps>();
	async function getCharities(search: string): Promise<CharityCardProps[]> {
		setLoading(true);
		console.log("getting Charities that match: ", search);
		// const { data, status, ok } = await charityApi.search(search);
		//mocked ^^ charityApi.search will return a list of charities that match the search param
		const { data, status, ok } = await charitiesApi.getCharities({ search });
		if (ok) {
			// @ts-ignore
			setCharities(data?.data.data);
		} else {
			// show an error toast saying something went wrong
			setCharities([]);
			toast({
				title: "Error",
				description: "Something went wrong",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
		setLoading(false);
		// @ts-ignore
		return data.data.data;
	}

	return (
		<ScreenWrapper className="home-page">
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
						<CharityDetails {...selectedCharity} />
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
