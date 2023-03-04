import Options from "@/lib/components/options";
import Icon from "@/lib/icons";
import { CharityDataProps } from "@/lib/types";
import { Avatar, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function CharityDetails(props: CharityDataProps) {
	const router = useRouter();
	if (!props.id) {
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
	}
	return (
		<div className="charity-details" id={`charity-${props.id}`}>
			<Options id={props.id} />

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
				<Button
					variant={"outlined"}
					onClick={() => {
						router.push(`/donate`, {
							query: { id: props.id },
						});
					}}>
					Donate to {props.name}
				</Button>
			</div>
		</div>
	);
}
