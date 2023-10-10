import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Badge,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaMoneyBillWave, FaRegClock } from "react-icons/fa";
import Map from "../components/Map";
import { useLocation, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coverLetter: "",
    resume: null,
  });

  const navigate = useNavigate();
  const toast = useToast();

  const location = useLocation();
  const { currentJob } = location.state || {};

  console.log(currentJob);

  const handleApplyClick = () => {
    setIsApplying(true);
  };

  const handleCloseModal = () => {
    setIsApplying(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInput2Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (files: any) => {
    const file = files[0];
    setFormData({
      ...formData,
      resume: file,
    });
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.email || !formData.coverLetter) {
      toast({
        title: "Please fill all required fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setFormData({
      name: "",
      email: "",
      coverLetter: "",
      resume: null,
    });
    setIsApplying(false);

    toast({
      title: "Application submitted successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    navigate("/success-preview", {
      state: { formData },
    });
  };

  const calculateLPA = (minSalary: number, maxSalary: number) => {
    const minLPA = (minSalary * 12) / 100000;
    const maxLPA = (maxSalary * 12) / 100000;
    return `₹${minLPA.toFixed(1)} - ₹${maxLPA.toFixed(1)} LPA`;
  };

  return (
    <Box p={14} backgroundColor="#f5f5f5" borderRadius="lg" boxShadow="md">
      {currentJob ? (
        <Flex
          flexDirection={["column", "column", "column", "row"]}
          justify={"space-between"}
          w={"full"}
          gap={5}
        >
          <Box flex={1} pr={[0, 0, 6]}>
            <Flex placeItems={"center"} gap={5} flexWrap={"wrap"}>
              <Heading fontSize="2xl">{currentJob.title}</Heading>
              <Badge colorScheme="blue" fontSize="lg" borderRadius={"3px"}>
                {currentJob.category.label}
              </Badge>
            </Flex>
            <Text color="gray.600" fontSize="lg" mt={2}>
              {currentJob.company.display_name}
            </Text>
            <Flex alignItems="center" mt={2}>
              <Icon as={FaMapMarkerAlt} color="blue.500" />
              <Text ml={2}>
                {currentJob.latitude && currentJob.longitude
                  ? `${currentJob.location.display_name}`
                  : `${currentJob.location.display_name}`}
              </Text>
            </Flex>
            <Flex alignItems="center" mt={2}>
              <Icon as={FaMoneyBillWave} color="blue.500" />
              <Text ml={2}>
                {calculateLPA(currentJob.salary_min, currentJob.salary_max)}
              </Text>
            </Flex>
            <Flex alignItems="center" mt={2}>
              <Icon as={FaRegClock} color="blue.500" />
              <Text ml={2}>
                Contract Type: {currentJob.contract_time || "Part Time"}
              </Text>
            </Flex>
            <Text fontWeight="bold" fontSize="lg" mt={4}>
              Job Description
            </Text>
            <Text mt={2}>{currentJob.description}</Text>
            <Text fontWeight="bold" fontSize="lg" mt={4}>
              Job Locations
            </Text>
            <Text mt={2}>
              {currentJob.location.area.join(" | ") ||
                currentJob.location.display_name}
            </Text>
            <Flex alignItems="center" mt={8} gap={5} flexWrap={"wrap"}>
              <Button colorScheme={"red"} onClick={handleApplyClick}>
                Apply Now
              </Button>
              <Button colorScheme="blue" onClick={() => window.history.back()}>
                Back
              </Button>
            </Flex>
          </Box>
          <Box display={{ base: "flex", md: "flex" }}>
            <Map
              lat={currentJob?.latitude}
              lng={currentJob?.longitude}
              locationName={currentJob.location.display_name}
            />
          </Box>
        </Flex>
      ) : (
        <Text>No job details available.</Text>
      )}

      <Modal isOpen={isApplying} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apply for {currentJob?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Cover Letter Upto[500]</FormLabel>
              <Textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInput2Change}
                rows={4}
                maxLength={500}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Resume (Important)</FormLabel>
              <Input
                type={"file"}
                name="resume"
                onChange={(e) => handleFileChange(e.target.files)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleFormSubmit}>
              Submit
            </Button>
            <Button onClick={handleCloseModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default JobDetails;
