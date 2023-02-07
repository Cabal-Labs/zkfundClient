import Options from "@/lib/components/options";
import Icon from "@/lib/icons";
import { CharityDataProps } from "@/lib/types";
import { Avatar, Button } from "@chakra-ui/react";

export default function CharityDetails(props: CharityDataProps) {
	return (
		<div className="charity-details" id={`charity-${props.charityId}`}>
			<Options id={props.charityId} />

			<div className="header">
				<Avatar src={props.pic} size="lg" />
				<div className="content">
					<h2>{props.name}</h2>
					<h5 className="secondary">
						<i>{props.mission}</i>
					</h5>
				</div>
			</div>
			<div className="content">
				<div className="quick-info">
					<div className="info">
						<Icon icon={"City"} title={"Location"} />
						{props.location}
					</div>
					<div className="info">
						<Icon icon={"Link"} title={"Location"} />
						{props.website}
					</div>
					<div className="info">
						<Icon icon={"Contact"} title={"Location"} />
						{props.contact}
					</div>
				</div>
				<p className="description">{props.description}</p>
				<Button variant={"outlined"}>Donate to {props.name}</Button>
			</div>
		</div>
	);
}
