import { Box, Heading, Text, Button, SimpleGrid } from "@chakra-ui/react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setPagination } from "../redux/job/job.action";
import Job from "../types/types";

const calculateLPA = (minSalary: number, maxSalary: number) => {
  const minLPA = (minSalary * 12) / 100000;
  const maxLPA = (maxSalary * 12) / 100000;
  return `₹${minLPA.toFixed(1)} LPA to ₹${maxLPA.toFixed(1)} LPA`;
};

const getContractType = (contract_time: string) => {
  return contract_time ? "Full Time" : "Part Time";
};

const JobCard = ({
  job,
  navigate,
}: {
  job: Job;
  navigate: NavigateFunction;
}) => (
  <Box
    p={4}
    borderWidth="1px"
    borderRadius="md"
    boxShadow="md"
    bg="white"
    transition="transform 0.2s"
    _hover={{ transform: "scale(1.05)" }}
  >
    <Heading size="md">{job.title}</Heading>
    <Text mt={2} fontSize="sm">
      {job.company.display_name}
    </Text>
    <Text fontSize="sm">{calculateLPA(job.salary_min, job.salary_max)}</Text>
    <Text fontSize="sm">Contract: {getContractType(job.contract_time)}</Text>
    <Button
      mt={4}
      colorScheme="blue"
      size="sm"
      onClick={() =>
        navigate(`/job-details`, {
          state: { currentJob: job },
        })
      }
    >
      View Details
    </Button>
  </Box>
);

const JobPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedLanguage } = location.state || {};
  const jobs = useAppSelector((state) => state.jobReducer.job);
  const currentPage = useAppSelector((state) => state.jobReducer.currentPage);
  const itemsPerPage = useAppSelector((state) => state.jobReducer.itemsPerPage);

  const dispatch = useAppDispatch();

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const perPage = parseInt(event.target.value, 10);
    dispatch(setPagination(1, perPage)); // Reset to the first page when perPage changes
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    dispatch(setPagination(nextPage, itemsPerPage));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      dispatch(setPagination(prevPage, itemsPerPage));
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const jobsToDisplay = jobs.slice(startIndex, endIndex);

  return (
    <Box p={4}>
      <Heading mb={4}>Job Listings for {selectedLanguage}</Heading>
      <Box mb={4}>
        <label htmlFor="perPageSelect">Items per page:</label>
        <select
          id="perPageSelect"
          value={itemsPerPage}
          onChange={handlePerPageChange}
        >
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
      </Box>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
        {jobsToDisplay && jobsToDisplay.length > 0 ? (
          jobsToDisplay.map((job: Job) => (
            <JobCard key={job.id} job={job} navigate={navigate} />
          ))
        ) : (
          <Text>No job listings found for {selectedLanguage}.</Text>
        )}
      </SimpleGrid>
      <Button mt={4} onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous Page
      </Button>
      <Button
        mt={4}
        ml={2}
        onClick={handleNextPage}
        disabled={endIndex >= jobs.length}
      >
        Next Page
      </Button>
    </Box>
  );
};

export default JobPage;
