import Options from "@/lib/components/options";
import Icon from "@/lib/icons";
import { CharityDataProps } from "@/lib/types";
import { Avatar } from "@chakra-ui/react";

export default function CharityDetails(props: CharityDataProps) {
	return (
		<div className="charity-details" id={`charity-${props.charityId}`}>
			<div className="header">
				<Avatar src={props.pic} size="lg" />
				<div className="content">
					<h2>{props.name}</h2>
					<h5 className="secondary">
						<i>{props.mission}</i>
					</h5>
				</div>
				<div className="quick-info">
					<div className="info">
						<Icon icon={"Location"} title={"Location"} />
						{props.location}
					</div>
					<div className="info">
						<Icon icon={"Location"} title={"Location"} />
						{props.location}
					</div>
					<div className="info">
						<Icon icon={"Location"} title={"Location"} />
						{props.location}
					</div>
				</div>
				<Options id={props.charityId} />
			</div>
		</div>
	);
}
