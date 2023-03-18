import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export default function Layout({ children, ...props }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}
