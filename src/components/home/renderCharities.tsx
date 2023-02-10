import { CharityCardProps } from "@/lib/types";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CharityCard from "../charity/charityCard";

interface RenderProps {
	loading: boolean;
	charities: CharityCardProps[];
	searchTerm: string;
	setSelectedCharity: (charity: CharityCardProps) => void;
}
export default function RenderCharities({
	loading,
	charities,
	searchTerm,
	setSelectedCharity,
}: RenderProps) {
	const router = useRouter();
	function handleNavigate() {
		// navigate to a page that will allow the user to request a charity to be added
		router.push({ pathname: "./requestCharity", query: { searchTerm } });
	}
	function handleClick(item: CharityCardProps) {
		//set selected charity
		setSelectedCharity(item);
	}

	const [open, setOpen] = useState<boolean>(false);
	useEffect(() => {
		// when the search term changes, make sure open is true
		setOpen(true);
	}, [searchTerm]);

	if (loading) {
		return <div className="render-charities loading">Loading...</div>;
	}
	if (charities?.length === 0 && searchTerm !== "") {
		return (
			<div className="render-charities no-charities">
				No Charities Match Your Search
				<Button onClick={() => handleNavigate()}>
					Request "{searchTerm}" to be added!
				</Button>
			</div>
		);
	}
	return (
		<div className={`render-charities ${open ? "open" : "close"}`}>
			{charities?.map((item, idx) => {
				return (
					<button
						key={item.charityId}
						className={idx % 2 === 0 ? "even" : "odd"}
						type={"button"}
						onClick={() => handleClick(item)}>
						<CharityCard {...item} />
					</button>
				);
			})}
		</div>
	);
}
