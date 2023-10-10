import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import JobPage from "../pages/JobPage";
import JobDetails from "../pages/JobDetails";
import Account from "../pages/Account";
import Authentication from "../pages/Authentication";
import Success from "../pages/Success";
import { Box } from "@chakra-ui/react";

const AllRoutes = ({
  setIsLoggedIn,
  isLoggedIn,
}: {
  setIsLoggedIn: CallableFunction;
  isLoggedIn: boolean;
}) => {
  return (
    <Box>
      <Routes>
        <Route
          path={"/"}
          element={
            <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path={"/authentication"}
          element={<Authentication setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path={"/profile"}
          element={<Account setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path={"/job-page"} element={<JobPage />} />
        <Route path={"/job-details"} element={<JobDetails />} />
        <Route path={"/success-preview"} element={<Success />} />
        <Route
          path={"*"}
          element={
            <Box className={"flex justify-center text-center"}>
              <h1>Wrong Path</h1>
            </Box>
          }
        />
      </Routes>
    </Box>
  );
};

export default AllRoutes;
