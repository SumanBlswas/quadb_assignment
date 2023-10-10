import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Text,
  Link,
  Icon,
  VStack,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import { FaFileDownload } from "react-icons/fa";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};

  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      p={14}
      bgGradient="linear(to-r, teal.300, blue.500)"
      boxShadow="lg"
      rounded="lg"
      color="white"
    >
      <Flex
        mr={{ base: 0, md: 6 }}
        gap={3}
        flexDir={"column"}
        w={"45%"}
        placeItems={"center"}
        justify={"space-between"}
      >
        <Heading fontSize="2xl">Application Preview</Heading>
        <Avatar name={formData.name} src={formData.image} size={"2xl"} />
        <VStack spacing={4} mt={4} alignItems="flex-start">
          <Text fontSize="xl">Name: {formData.name}</Text>
          <Text fontSize="xl">Email: {formData.email}</Text>
          <Text fontSize="xl">Cover Letter:</Text>
          <Text fontSize="lg" textAlign="left" px={4}>
            {formData.coverLetter}
          </Text>
        </VStack>
        <Button
          mt={6}
          colorScheme="teal"
          onClick={() => navigate("/")}
          size="lg"
        >
          Close
        </Button>
      </Flex>
      {formData.resume && (
        <Box flex={1} ml={{ base: 0, md: 6 }}>
          <Box
            p={4}
            bg="white"
            boxShadow="md"
            rounded="lg"
            h="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Text fontSize="xl">Resume Preview:</Text>
            <iframe
              src={URL.createObjectURL(formData.resume)}
              title="Resume Preview"
              width="100%"
              height="100%"
              frameBorder="0"
            />
            <Link
              href={URL.createObjectURL(formData.resume)}
              isExternal
              textDecoration="underline"
              display="inline-block"
              mt={4}
            >
              <Icon as={FaFileDownload} mr={2} />
              Download Resume
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Success;
