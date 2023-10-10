import { Box } from "@chakra-ui/react";
import "./App.css";
import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Box>
      <Navbar isLoggedIn={isLoggedIn} />
      <Box p={20} pt={10} pb={5}>
        <AllRoutes setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      </Box>
    </Box>
  );
}

export default App;
