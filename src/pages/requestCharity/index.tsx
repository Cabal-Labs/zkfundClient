import Head from "next/head";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import ScreenWrapper from "@/components/layout/screenWrapper";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "@/lib/components/glassContainer";

export default function RequestCharity() {
	// get searchTerm from the router query
	const router = useRouter();
	const { searchTerm } = router.query;

	function handleNavigate() {
		router.push({
			pathname: "/requestCharity/form",
			query: { searchTerm },
		});
	}

	return (
		<ScreenWrapper title="Request Charity">
			<Container>
				<h1>Request A Charity</h1>

				<p>
					We're always working on adding more charities to our system, and we
					would love your help!
				</p>
				<br />
				<h2>How It works</h2>
				<h4>1. You Request a Charity</h4>
				<h4>
					2. Our <i>Validators</i> confirm your request is a real charity
				</h4>
				<h4>3. The charity is contacted and we onboard them to zk.fund</h4>
				<h4>
					4. Charities can withdraw any donations they've received at any time
				</h4>
				<br />
				<Button aria-role={"link"} onClick={() => handleNavigate()}>
					Fill out the form!
				</Button>
				<br />
				<br />
				<hr />
				<br />
				<p>
					In our current stage, only US charities who are registered with the
					IRS as a 503c that also own a crypto wallet are eligible for
					validation.
				</p>
			</Container>
		</ScreenWrapper>
	);
}
