import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navigation } from "./Navigation";

export const Root = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Box flex="1" overflow="auto">
        <Outlet
          context={{
            searchQuery,
            setSearchQuery,
          }}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
};
