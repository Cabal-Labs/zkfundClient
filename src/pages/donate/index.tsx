import React, { useState } from "react";
import ScreenWrapper from "@/components/layout/screenWrapper";
import ZkModal from "@/components/zkModal";
import { Button, Checkbox, Input } from "@chakra-ui/react";
import MyAssetsSelection from "@/components/donate/myAssetsSelection";

export default function Donate(props) {
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = useState<string>("ETH");
  const [availableAssets, setAvailableAssets] = useState([
    {ticker: "ETH", // ETH, BTC, DOGE
    name: "Ethereum", // Ethereum, Bitcoin, Dogecoin
    selected: false, // true if this row is selected
    balance: 0.00213, // 0.00213
    balanceInUSD: 1570.50, // 1570.50 (displayed as $1570.50 USD)
  }
  ]);

  const [modal, setModal] = useState({
    visible: false,
    isError: false,
    title: "",
    content: null,
  });

  const handleDonateSuccess = () => {
    setModal({
      visible: true,
      isError: false,
      title: "Thanks for your donation!",
      content: (
        <h6>
          Your support won’t be noticed, but it will make an impact!
          <br></br>
          <br></br>
          Your donation is being processed, please do not close this window.
        </h6>
      ),
    });
  };

  const handleDonateError = () => {
    setModal({
      visible: true,
      isError: true,
      title: "Error: An error occurred",
      content: <h6>error message content</h6>,
    });
  };

  const hideAndClearModal = () => {
    setModal({ visible: false, isError: false, title: "", content: null });
    // additional logic here
  };

  return (
    <ScreenWrapper className="donate-page" title={"zk.fund Home"}>
      <main>
        <div className="container">
          <ZkModal
            isOpen={modal.visible}
            isError={modal.isError}
            title={modal.title}
            onClose={hideAndClearModal}
          >
            <>{modal.content}</>
          </ZkModal>
          <MyAssetsSelection
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
            availableAssets={availableAssets}
            // TODO: figure out prop passing to make selecting assets work
          />
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
              <Input
                id="select-value-input"
                variant={"underlined"}
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
              <Button id="select-value-button" variant={"gradientOutline"}>
                ETH
              </Button>
            </div>
          </div>
          <div id="bottom-container">
            <Checkbox className="anonymous-checkbox" defaultChecked>
              Make this donation anonymous
            </Checkbox>
            <Button
              id="donate-button"
              variant={"gradientOutline"}
              onClick={handleDonateSuccess}
            >
              DONATE
            </Button>
          </div>
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
