import { getCharityInfo } from "@/lib/api/graph";
import Options from "@/lib/components/options";
import Icon from "@/lib/icons";
import { Avatar, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { P } from "styled-icons/fa-solid";

export default function CharityDetails({ selectedCharity }) {
	const router = useRouter();
	const [data, setData] = useState({} as any);
	const [pending, setPending] = useState(true);
	const [loading, setLoading] = useState(false);

	async function getCharity() {
		console.log("getting charity info with id: ", selectedCharity);
		if (selectedCharity === undefined) return;
		else {
			let data = await getCharityInfo(selectedCharity);
			console.log("data: ", data);
			setData(data);
			if (data?.status == 0) {
				setPending(false);
			}
		}
	}
	useEffect(() => {
		setLoading(true);
		getCharity();
		setLoading(false);
	}, [selectedCharity]);
	if (loading) {
		return <p>Loading...</p>;
	} else {
		return (
			<div className="charity-details" id={`charity-${selectedCharity}`}>
				<div className="header">
					<Avatar src={data?.pic} size="lg" />
					<div className="content">
						<h2>{data?.name}</h2>
						<h5 className="secondary">
							<i>{data?.mission || "No mission"}</i>
						</h5>
					</div>
				</div>
				{pending}
				<div className="content">
					<div className="quick-info">
						<div className="info">
							<Icon icon={"City"} title={"Location"} />
							<p>{data?.location || "No location"}</p>
						</div>
						<div className="info">
							<Icon icon={"Link"} title={"Location"} />
							<p>{data?.website || "No website"}</p>
						</div>
						<div className="info">
							<Icon icon={"Contact"} title={"Location"} />
							<p>{data?.contact || "No contact"}</p>
						</div>
					</div>
					<p className="description">{data?.description || "No Description"}</p>

					<Button
						variant={"outlined"}
						onClick={() => {
							router.push(`/donate/${selectedCharity}`);
						}}>
						Donate to {data?.name}
					</Button>
				</div>
			</div>
		);
	}
}
