import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { ReactNode } from "react";
import { Box, styled } from "@mui/material";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
}));

export default function Layout({ children, ...props }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Main>{children}</Main>
      {/* <Footer /> */}
    </Box>
  );
}
