import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNOTAM } from "@/redux/reducers/userInput";
import TextOuput from "./TextOutput";

export default function SectionNOTAM() {
  const dispatch = useDispatch();
  // const { NOTAM } = useSelector((state: any) => state.userInput);
  const [textNOTAM, setTextNOTAM] = useState("");
  const { convosNOTAM } = useSelector((state: any) => state.convo);
  const testObj = [
    { role: "user", content: "hi i'm a user" },
    { role: "assistant", content: "hi i'm an assistant" },
  ];

  return (
    <Stack>
      <Box
        component="form"
        sx={{ width: "100%" }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            fullWidth
            id={"NOTAM"}
            label={"NOTAM"}
            multiline
            maxRows={4}
            value={textNOTAM}
            onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
              setTextNOTAM(e.target.value);
              dispatch(setNOTAM(e.target.value));
            }, [])}
            InputProps={{
              style: {
                height: "56px", // need to restart the server to see this change
              },
              endAdornment: (
                <IconButton
                  sx={{ visibility: textNOTAM ? "visible" : "hidden" }}
                  onClick={() => {
                    setTextNOTAM("");
                  }}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </div>
      </Box>
      <Stack>
        {/* {testObj
          .filter((convo: any) => convo.role === "assistant")
          .map((convo: any, index: any) => (
            <TextOuput key={index} answer={convo.content} />
          ))} */}
        {convosNOTAM
          .filter((convo: any) => convo.role === "assistant")
          .map((convo: any, index: any) => (
            <TextOuput key={index} answer={convo.content} />
          ))}
      </Stack>
    </Stack>
  );
}
