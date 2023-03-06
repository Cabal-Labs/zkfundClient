import { getCharityInfo } from "@/lib/api/validation";
import Options from "@/lib/components/options";
import Icon from "@/lib/icons";
import { Avatar, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CharityDetails({ selectedCharity }) {
	const router = useRouter();
	const [data, setData] = useState({} as any);

	async function getCharity() {
		console.log("getting charity info with id: ", selectedCharity);
		let data = await getCharityInfo(selectedCharity);
		console.log("data: ", data);
		setData(data);
	}
	useEffect(() => {
		getCharity();
	}, [selectedCharity]);
	if (selectedCharity === undefined) {
		return (
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
		);
	} else {
		return (
			<div className="charity-details" id={`charity-${selectedCharity}`}>
				<Options id={selectedCharity} />

				<div className="header">
					<Avatar src={data?.pic} size="lg" />
					<div className="content">
						<h2>{data?.name}</h2>
						<h5 className="secondary">
							<i>{data?.mission}</i>
						</h5>
					</div>
				</div>
				<div className="content">
					<div className="quick-info">
						<div className="info">
							<Icon icon={"City"} title={"Location"} />
							{data?.location}
						</div>
						<div className="info">
							<Icon icon={"Link"} title={"Location"} />
							{data?.website}
						</div>
						<div className="info">
							<Icon icon={"Contact"} title={"Location"} />
							{data?.contact}
						</div>
					</div>
					<p className="description">{data?.description}</p>
					<Button
						variant={"outlined"}
						onClick={() => {
							router.push(`/donate`, {
								query: { id: data?.id },
							});
						}}>
						Donate to {data?.name}
					</Button>
				</div>
			</div>
		);
	}
}
