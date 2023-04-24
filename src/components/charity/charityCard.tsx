import React, { useState, useEffect } from "react";
import { CharityCardProps } from "@/lib/types";
import { Avatar } from "@chakra-ui/react";

import {getCharityInfo} from "@/lib/api/graph";

export default function CharityCard(props: CharityCardProps) {

	const [profile, setProfile] = useState<any>(null);

	async function getCharity() {
		console.log("getting charity info with id: ", props.charityId);
	
		let data = await getCharityInfo(props.charityId);
		console.log("data: ", data);
		setProfile(data?.profile);
		
	}

	useEffect(() => {
		getCharity();
	}, []);

	return (
		<button
			type="button"
			className="charity-card"
			id={`charity-card-${props.id}`}>
			<Avatar src={profile} />
			<h6>{props.name}</h6>
		</button>
	);
}
