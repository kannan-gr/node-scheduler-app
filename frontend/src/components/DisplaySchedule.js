import { useEffect, useState } from "react";
import axios from "axios";
import Schedule from "./Schedule";
import { Button, Text } from "@shopify/polaris";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const DisplaySchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();
  const email = Cookies.get("email");

  useEffect(() => {
    const getSchedule = async () => {
      let response = await axios.get("http://localhost:8000/api/schedule", {
        params: {
          search: email,
        },
      });
      setSchedules(response.data);
    };
    getSchedule();
  }, []);
  const handleClear = () => {
    Cookies.remove("email");
    navigate("/");
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text variant="heading2xl" as="h3">
          My Schedule
        </Text>
        <Button onClick={handleClear}>Clear</Button>
      </div>
      <br />
      {schedules.length > 0 ? (
        schedules.map((schedule) => {
          return <Schedule key={schedule._id} schedule={schedule} />;
        })
      ) : (
        <Text variant="headingxl" as="h4">
          No schedule found
        </Text>
      )}
    </>
  );
};

export default DisplaySchedule;
