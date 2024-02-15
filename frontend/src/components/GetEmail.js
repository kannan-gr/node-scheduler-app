import { Form, FormLayout, TextField, Button, Text } from "@shopify/polaris";
import { useState, useCallback } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function GetEmail() {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate("/schedule");

  const handleSubmit = async () => {
    Cookies.set("email", userEmail);
    navigate("/schedule");
  };

  const handleUserEmailChange = useCallback((value) => setUserEmail(value), []);

  return (
    <>
      <Text variant="heading2xl" as="h3">
        Enter your email
      </Text>
      <br />
      <Form noValidate onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            value={userEmail}
            onChange={handleUserEmailChange}
            type="text"
          />
          <Button submit>Submit</Button>
        </FormLayout>
      </Form>
    </>
  );
}

export default GetEmail;
