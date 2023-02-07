import { CharityCardProps } from "@/lib/types";
import CharityCard from "../charity/charityCard";

interface RenderProps {
	loading: boolean;
	charities: CharityCardProps[];
}
export default function RenderCharities({ loading, charities }: RenderProps) {
	if (loading) {
		return <>Loading...</>;
	}
	if (charities?.length === 0) {
		return <>No Charities Match Your Search</>;
	}
	return (
		<div className="render-charities close">
			{charities?.map((item, idx) => {
				return (
					<div key={item.charityId} className={idx % 2 === 0 ? "even" : "odd"}>
						<CharityCard {...item} />
					</div>
				);
			})}
		</div>
	);
}
