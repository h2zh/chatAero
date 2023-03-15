import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Skeleton, Stack, TextField } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNOTAM } from "@/redux/reducers/userInput";
import TextOuput from "./TextOutput";

export default function SectionNOTAM() {
  const dispatch = useDispatch();
  // const { NOTAM } = useSelector((state: any) => state.userInput);
  const [textNOTAM, setTextNOTAM] = useState("");
  const { convosNOTAM } = useSelector((state: any) => state.convo);
  const { NOTAMloading } = useSelector((state: any) => state.userInput);

  const testObj = [
    { role: "user", content: "hi i'm a user", time: 1678906080121 },
    { role: "assistant", content: "hi i'm an assistant", time: 1678906102272 },
  ];

  return (
    <Stack spacing={2}>
      <Stack>
        {convosNOTAM.map((convo: any, index: any) => (
          <TextOuput
            key={index}
            role={convo.role}
            content={convo.content}
            time={convo.time}
          />
        ))}
      </Stack>

      {NOTAMloading && (
        <Stack direction="row" spacing={1}>
          <Skeleton variant="circular" width={10} height={10} />
          <Skeleton variant="circular" width={10} height={10} />
          <Skeleton variant="circular" width={10} height={10} />
          <Skeleton variant="circular" width={10} height={10} />
          <Skeleton variant="circular" width={10} height={10} />
          <Skeleton variant="circular" width={10} height={10} />
        </Stack>
      )}
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
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "10px", // need to restart the server to see this change
                },
              },
            }}
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
    </Stack>
  );
}
