import { Box, Heading } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box>
      <Link to="/">
        <Heading textAlign="center">Парсер кинопоиска</Heading>
      </Link>
      <Outlet />
    </Box>
  );
}
