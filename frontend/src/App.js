import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./components/auth/AuthContext";
import LoginPage from "./components/auth/LoginPage";
import Training from "./components/Training";
import DisplaySchedule from "./components/DisplaySchedule";
import DisplayTracks from "./components/DisplayTracks";
import { Page } from "@shopify/polaris";
import Cookies from "js-cookie";
import GetEmail from "./components/GetEmail";

const PrivateRoute = ({ element }) => {
  const { jwt } = useAuth();
  return jwt ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

const PrivateSchedule = ({ element }) => {
  const email = Cookies.get("email");
  return email ? (
    element
  ) : (
    <Navigate to="/email" replace state={{ from: window.location.pathname }} />
  );
};
const App = () => {
  return (
    <AuthProvider>
      <Page
        primaryAction={{
          content: "View My Schedule",
          url: "/schedule",
        }}
        secondaryActions={[
          {
            content: "Home Page",
            url: "/",
          },
          {
            content: "Admin Login",
            url: "/login",
          },
        ]}
      >
        <Router>
          <Routes>
            <Route exact path="/" element={<DisplayTracks />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/track/:_id" element={<Training />} />
            <Route path="/email" element={<GetEmail />} />
            <Route
              path="/schedule"
              element={<PrivateSchedule element={<DisplaySchedule />} />}
            />
          </Routes>
        </Router>
      </Page>
    </AuthProvider>
  );
};

export default App;
