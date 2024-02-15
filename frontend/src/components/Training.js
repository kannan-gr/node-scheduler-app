// import { useEffect } from "react";
// import { useParams } from "react-router-dom";

// const Training = () => {
//   const { _id } = useParams();
//   console.log(_id);
// };

// export default Training;

import {
  Page,
  LegacyCard,
  ResourceList,
  Avatar,
  ResourceItem,
  Text,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Training = () => {
  const { _id } = useParams();
  const [track, setTrack] = useState("");
  const [trainings, setTrainings] = useState([]);
  useEffect(() => {
    const getTrackAndTrainings = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/track/training`,
        {
          params: {
            search: _id,
          },
        }
      );
      console.log(response.data);
      setTrack(response.data[0].name);
      setTrainings(response.data[0].trainings);
    };
    getTrackAndTrainings();
  }, [_id]);
  return (
    <Page backAction={{ url: "/" }} title={track}>
      <LegacyCard>
        <ResourceList
          resourceName={{ singular: "training", plural: "trainings" }}
          items={trainings}
          renderItem={(item) => {
            const {
              deadline,
              difficulty,
              domain,
              duration,
              name,
              reference_materials,
              type,
            } = item;

            return (
              <ResourceItem accessibilityLabel={`View details for ${name}`}>
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                  {name}
                </Text>
                <div>
                  {difficulty} - {domain} - {duration} - {type} - {deadline}
                </div>
              </ResourceItem>
            );
          }}
        />
      </LegacyCard>
    </Page>
  );
};

export default Training;
