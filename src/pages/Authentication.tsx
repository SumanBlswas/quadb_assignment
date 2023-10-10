import { useState } from "react";
import { Box, Button, Container } from "@chakra-ui/react";
import Login from "../components/Login";
import Register from "../components/Register";

const Authentication = ({
  setIsLoggedIn,
}: {
  setIsLoggedIn: CallableFunction;
}) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToLogin = () => {
    setIsLogin(true);
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  return (
    <Container centerContent>
      <Box mt={10}>
        <Button
          colorScheme={isLogin ? "pink" : "blue"}
          variant={isLogin ? "solid" : "outline"}
          mr={2}
          onClick={switchToLogin}
        >
          Login
        </Button>
        <Button
          colorScheme={!isLogin ? "pink" : "blue"}
          variant={isLogin ? "outline" : "solid"}
          ml={2}
          onClick={switchToRegister}
        >
          Sign Up
        </Button>
      </Box>
      <Box mt={4}>
        {isLogin ? (
          <Login setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Register setIsLoggedIn={setIsLoggedIn} />
        )}
      </Box>
    </Container>
  );
};

export default Authentication;
