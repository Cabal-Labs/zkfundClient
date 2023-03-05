import React, { useState } from "react";
import ScreenWrapper from "@/components/layout/screenWrapper";
import RequestCard from "@/components/validate/requestCard";

export default function ValidatorPortal() {
  const [charityRequests, setCharityRequests] = useState([
    {
      charityName: "Habitat for Humanity",
      charityDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, nunc nisl tincidunt nunc, vitae aliquet nisl nisl sit amet elit. Sed euismod, nisl sit amet aliquam lacinia, nunc nisl tincidunt nunc, vitae aliquet nisl nisl",
      numApprovals: 80,
      numDisapprovals: 21,
    },
    {
      charityName: "Action Against Hunger",
      charityDescription:
        "We feed the hungry using food that would otherwise go to waste. We provide nutrition education and training to help communities become self-sufficient. We advocate for policies that protect people from hunger and malnutrition. We are a global movement of people working together to end hunger. We are Action Against Hunger. We also work in the United States to help people in need. We are a 501(c)(3) nonprofit organization.",
      numApprovals: 80,
      numDisapprovals: 20,
    },
  ]);
  return (
    <ScreenWrapper
      className="validator-portal-page"
      title={"zk.fund Validator Portal"}
    >
      <main>
        <div className="container">
          <h1>Validator Portal</h1>
          <h6>
            Validate any pending requests to add charities to the platform!
          </h6>
          {/* map this */}
          {charityRequests.map((request) => (
            <RequestCard
              charityName={request.charityName}
              charityDescription={request.charityDescription}
              numApprovals={request.numApprovals}
              numDisapprovals={request.numDisapprovals}
            />
          ))}
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
