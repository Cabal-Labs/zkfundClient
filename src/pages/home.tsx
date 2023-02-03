import ScreenWrapper from "@/components/layout/screenWrapper";
import Icon from "@/lib/icons";
import { Context } from "@/lib/providers/provider";
import {
	Button,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useBalance, useProvider } from "wagmi";
export default function Home() {
	const { pubAddress } = useContext(Context);
	const provider = useProvider();
	const { data, isError, isLoading } = useBalance({
		address: pubAddress as `0x${string}`,
	});
	async function getBalance() {
		const test = await provider.getBalance("ricmoo.eth");
		console.log(test);
	}
	if (isLoading) return <div>Fetching balance…</div>;
	if (isError) return <div>Error fetching balance</div>;
	return (
		<ScreenWrapper>
			<main>
				<div id="search-container">
					<InputGroup>
						<Input />
						<InputRightElement>
							<IconButton
								aria-label="search"
								placeholder="Search for a charity">
								<Icon icon={"Search"} />
							</IconButton>
						</InputRightElement>
					</InputGroup>
				</div>
			</main>
		</ScreenWrapper>
	);
}
