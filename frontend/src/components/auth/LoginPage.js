import { Form, FormLayout, TextField, Button, Text } from "@shopify/polaris";
import { useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async () => {
    let body = {
      username,
      password,
    };
    let response = await axios.post(
      "http://localhost:8000/api/admin/login",
      body
    );
    login(response.data.token);
  };

  const handleUsernameChange = useCallback((value) => setUsername(value), []);
  const handlePasswordChange = useCallback((value) => setPassword(value), []);

  return (
    <>
      <Text variant="heading2xl" as="h3">
        Admin Login
      </Text>
      <br />
      <Form noValidate onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            value={username}
            onChange={handleUsernameChange}
            label="Username"
            type="text"
          />
          <TextField
            value={password}
            onChange={handlePasswordChange}
            label="Password"
            type="password"
          />
          <Button submit>Submit</Button>
        </FormLayout>
      </Form>
    </>
  );
}

export default LoginPage;
