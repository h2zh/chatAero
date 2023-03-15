import React from "react";
// import ChatMsg from "@mui-treasury/components/chatMsg/ChatMsg"; // false alarm
import ChatMsg from "./ChatMsg.js";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

export default function TextOuput({ role, content, time }: any) {
  return (
    <>
      {role === "assistant" && <ChatMsg messages={[content]} />}
      {role === "user" && <ChatMsg side={"right"} messages={[content]} />}
    </>
  );
}
