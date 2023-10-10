import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}

const Login = ({ setIsLoggedIn }: { setIsLoggedIn: CallableFunction }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        const storedUsers: User[] = JSON.parse(
          localStorage.getItem("users") || "[]"
        );

        const user = storedUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));

          toast({
            title: "Logged in Successfully.",
            description: "You have successfully logged in.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setIsLoggedIn(true);
          navigate("/");
        } else {
          toast({
            title: "Invalid Credentials.",
            description: "Check your email and password before login.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Empty Field.",
          description: "Check your email and password before login.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred during login.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"} mt={5}>
        <Box
          width="350px"
          p={6}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="lg"
          bg={"#fff"}
        >
          <Heading size="lg" mb={6}>
            Login
          </Heading>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme={"pink"}
            size="lg"
            onClick={handleLogin}
            width="100%"
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
