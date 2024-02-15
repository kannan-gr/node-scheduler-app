import { useEffect, useState } from "react";
import axios from "axios";
import Track from "./Track";
import { Text } from "@shopify/polaris";

const DisplayTracks = () => {
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    const getTracks = async () => {
      let response = await axios.get("http://localhost:8000/api/track");
      setTracks(response.data);
    };
    getTracks();
  }, []);

  return (
    <>
      <Text variant="heading2xl" as="h3">
        Tracks
      </Text>
      <br />
      {tracks.length > 0 &&
        tracks.map((track) => {
          return <Track key={track._id} track={track} />;
        })}
    </>
  );
};

export default DisplayTracks;
