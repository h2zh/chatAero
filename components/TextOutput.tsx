import React from "react";
// import ChatMsg from "@mui-treasury/components/chatMsg/ChatMsg"; // false alarm
import ChatMsg from "./ChatMsg.js";

export default function TextOuput({ role, content, time }: any) {
  return (
    <>
      {role === "assistant" && <ChatMsg messages={[content]} />}
      {role === "user" && <ChatMsg side={"right"} messages={[content]} />}
    </>
  );
}
