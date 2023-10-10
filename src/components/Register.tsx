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

export interface User {
  name: string;
  email: string;
  password: string;
}

const Register = ({ setIsLoggedIn }: { setIsLoggedIn: CallableFunction }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [conPassword, setConPassword] = useState<string>("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const userData: User = { name, email, password };
      const storedUsers: User[] = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      if (
        name !== "" &&
        email !== "" &&
        password !== "" &&
        conPassword !== ""
      ) {
        if (password === conPassword) {
          const isEmailTaken = storedUsers.some((user) => user.email === email);

          if (!isEmailTaken) {
            storedUsers.push(userData);
            localStorage.setItem("users", JSON.stringify(storedUsers));

            toast({
              title: "Account created.",
              description: `Hello, ${name}! Your account has been created successfully.`,
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            localStorage.setItem("currentUser", JSON.stringify(userData));
            setIsLoggedIn(true);
            navigate("/");
          } else {
            toast({
              title: "Email already exists!",
              description: `Hey, ${name}! This email is already registered. Please use a different email.`,
              status: "warning",
              duration: 5000,
              isClosable: true,
            });
          }
        } else {
          toast({
            title: "Password Mismatch!",
            description: `Hey, ${name}! Your password entries do not match.`,
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Empty Field!",
          description: "Please fill in all fields.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Registration Error!",
        description: `Hey, ${name}! An error occurred during registration.`,
        status: "error",
        duration: 5000,
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
            Signup
          </Heading>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Password Again</FormLabel>
            <Input
              type="password"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme={"purple"}
            size="lg"
            onClick={handleSignup}
            width="100%"
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
