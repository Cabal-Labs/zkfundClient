import { Button, IconButton } from "@chakra-ui/react";
import Icon from "@/lib/icons";
import React from "react";

interface RequestCardProps {
  charityName: string;
  charityDescription: string;
  numApprovals: number;
  numDisapprovals: number;
}

export default function RequestCard({
  charityName,
  charityDescription,
  numApprovals,
  numDisapprovals,
}: RequestCardProps) {
  return (
    <div className="validate-request-card-container">
      <div className="validate-request-charity-info-container">
        <h3>{charityName}</h3>
        <p>{charityDescription}</p>
      </div>
      <div>
        <div className="validate-selection-row">
          <div className="validate-selection-div">
            <IconButton
              backgroundColor={"#65B36D"}
              icon={<Icon icon="ThumbsUpAlt" size={30} />}
            />
            <h6>{numApprovals}</h6>
          </div>
          <div className="validate-selection-div">
            <IconButton
              backgroundColor={"#C74F4F"}
              icon={<Icon icon="ThumbsDownAlt" size={30} />}
            />
            <h6>{numDisapprovals}</h6>
          </div>
        </div>
        <Button
          onClick={() => alert("Approved! (not really)")}
          isDisabled={numApprovals / (numApprovals + numDisapprovals) < 0.8}
          // disabled if approval percentage is less than 80%
        >
          Approve
        </Button>
      </div>
    </div>
  );
}
