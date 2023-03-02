import ScreenWrapper from "@/components/layout/screenWrapper";
import { Button, Checkbox, Input } from "@chakra-ui/react";

export default function Donate(props) {
  return (
    <ScreenWrapper className="donate-page" title={"zk.fund Home"}>
      <main>
        <div className="container">
          <div id="pick-charity">
            {/* show selected charity, onclick opens modal */}
            <div id="charity-logo-div">
              <img
                id="charity-logo"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzmiAMnhX5wmE3rsbFP1Y6gIxdvTUxbC6sNhhNQnzqM9JEOtfWpjQuPHNj4luUVwILKr4&usqp=CAU"
                alt="charity logo"
              />
            </div>
            <h2 id="charity-name">Name of charity</h2>
            <div id="select-value-row">
              <h2>$</h2>
              <Input id="select-value-input" variant={"underlined"} />
              <Button id="select-value-button" variant={"gradientOutline"}>
                USDC
              </Button>
            </div>
          </div>
          <Checkbox className="anonymous-checkbox" defaultChecked>
            Make this donation anonymous
          </Checkbox>
          <Button id="donate-button" variant={"gradientOutline"}>
            DONATE
          </Button>
        </div>
        <div className="shapes">
          <div className="shape-0"></div>
          <div className="shape-1"></div>
          <div className="shape-2"></div>
          <div className="shape-3"></div>
          <div className="shape-4"></div>
          <div className="shape-5"></div>
          <div className="shape-6"></div>
          <div className="shape-7"></div>
        </div>
      </main>
    </ScreenWrapper>
  );
}
