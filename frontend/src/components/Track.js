import { CalloutCard, Text } from "@shopify/polaris";
import React from "react";

const Track = ({ track }) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const startingDate = new Date(track.startingDate);
  return (
    <CalloutCard
      title={track.name}
      illustration={track.illustration}
      primaryAction={{
        content: "View Trainings",
        url: `/track/${track._id}`,
      }}
    >
      <p>{track.outcome}</p>
      <br />
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <Text variant="headingMd" as="h6">
            Tags
          </Text>
          {track.tags.map((tag) => (
            <div key={tag}>{tag}</div>
          ))}
        </div>
        <div>
          <Text variant="headingMd" as="h6">
            Starting From
          </Text>
          {startingDate.toLocaleString("en-GB", options)}
        </div>
        <div>
          <Text variant="headingMd" as="h6">
            Duration
          </Text>
          <span>{track.duration}</span>
        </div>
      </div>
    </CalloutCard>
  );
};

export default Track;
