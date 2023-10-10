import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchJobData } from "../redux/job/job.action";
import Authentication from "./Authentication";

const Home = ({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: CallableFunction;
}) => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState(false);

  const user = localStorage.getItem("currentUser");

  const jobs = useAppSelector((store) => store.jobReducer.job);
  const dispatch = useAppDispatch();

  const handleLanguageSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchJobData(selectedLanguage));
  }, [dispatch, selectedLanguage]);

  const viewJobs = async () => {
    if (selectedLanguage) {
      try {
        setLoading(true);
        navigate("/job-page", {
          state: { jobs, selectedLanguage },
        });
      } catch (error) {
        console.error("Error fetching job listings:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {user || isLoggedIn ? (
        <Box p={4}>
          <FormControl>
            <FormLabel>Select a Programming Language:</FormLabel>
            <Select
              placeholder="Choose a language"
              onChange={handleLanguageSelect}
              value={selectedLanguage}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </Select>
          </FormControl>
          <Button mt={4} onClick={viewJobs} isLoading={loading}>
            {loading ? <Spinner size="sm" color="white" /> : "View Jobs"}
          </Button>
        </Box>
      ) : (
        <Authentication setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
};

export default Home;
