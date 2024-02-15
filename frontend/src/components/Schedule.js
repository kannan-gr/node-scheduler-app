import { CalloutCard, Text } from "@shopify/polaris";
import React from "react";

const Track = ({ schedule }) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const startTime = new Date(schedule.startTime);
  const endTime = new Date(schedule.endTime);
  return (
    <CalloutCard
      title={schedule.training.name}
      primaryAction={{
        content: "View Trainings",
        url: `/track/${schedule.training.trackId}`,
      }}
    >
      <br />
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <Text variant="headingMd" as="h6">
            Trainer
          </Text>
          {schedule.trainer.name}
        </div>
        <div>
          <Text variant="headingMd" as="h6">
            Guests
          </Text>
          {schedule.trainees.map((trainee) => (
            <div key={trainee._id}>{trainee.name}</div>
          ))}
        </div>
        <div>
          <Text variant="headingMd" as="h6">
            Starting from
          </Text>
          {startTime.toLocaleString("en-GB", options)}
        </div>
        <div>
          <Text variant="headingMd" as="h6">
            Ending at
          </Text>
          <span>{endTime.toLocaleString("en-GB", options)}</span>
        </div>
      </div>
    </CalloutCard>
  );
};

export default Track;
