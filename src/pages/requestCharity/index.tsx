import Head from "next/head";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import ScreenWrapper from "@/components/layout/screenWrapper";
import Link from "next/link";

export default function RequestCharity() {
  return (
    <ScreenWrapper>
      <main>
        <Head>
          <title>Request Charity</title>
          <meta name="description" content="Request Charity" />
        </Head>
        <h1>Request Charity</h1>

        <p>
          We're always working on adding more charities to our system, and we
          would love your help!
          <br />
          Take a second to give us some information about the charity you'd like
          to add.
          <br />
          We'll review your request and add it to our system if it meets our
          criteria.
          <br />
          Make sure to provide as much information as possible so we can approve
          your request faster. Thanks so much!
        </p>

        <Button variant={"contained"}>
          <Link href={"/requestCharity/form"}>Fill out the form!</Link>
        </Button>
      </main>
    </ScreenWrapper>
  );
}
