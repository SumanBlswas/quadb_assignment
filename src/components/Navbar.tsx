import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { User } from "./Register";

const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const userData = localStorage.getItem("currentUser");
  const user: User = userData ? JSON.parse(userData) : null;

  return (
    <Box bg="blue.500" py={4} px={8} boxShadow="md" fontFamily={"mono"}>
      <Flex justify="space-between" align="center">
        <Link as={RouterLink} to={"/"} _hover={{ textDecoration: "none" }}>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            JobsFinder
          </Text>
        </Link>
        <Box>
          <Link
            as={RouterLink}
            to="/"
            mr={4}
            fontSize="xl"
            color="whiteAlpha.800"
            _hover={{ textDecoration: "none", color: "whiteAlpha.900" }}
            fontWeight={"semibold"}
          >
            Home
          </Link>
          {user || isLoggedIn ? (
            <Link
              as={RouterLink}
              to="/profile"
              fontSize="xl"
              color="whiteAlpha.800"
              _hover={{ textDecoration: "none", color: "whiteAlpha.900" }}
              fontWeight={"semibold"}
            >
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <Link
              as={RouterLink}
              to="/authentication"
              fontSize="xl"
              color="whiteAlpha.800"
              _hover={{ textDecoration: "none", color: "whiteAlpha.900" }}
              fontWeight={"semibold"}
            >
              Login
            </Link>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
