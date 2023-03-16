import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNOTAM } from "@/redux/reducers/userInput";
import TextOuput from "./TextOutput";
import SendIcon from "@mui/icons-material/Send";

export default function SectionNOTAM(props: any) {
  const dispatch = useDispatch();
  const { NOTAM } = useSelector((state: any) => state.userInput);
  const [textNOTAM, setTextNOTAM] = useState("");
  const { convosNOTAM } = useSelector((state: any) => state.convo);
  const { NOTAMloading } = useSelector((state: any) => state.userInput);
  let floatingSpace = convosNOTAM.length === 0 ? 0 : 2;

  // text field is subject to state var NOTAM, later on, only the state var NOTAM need to update
  useEffect(() => {
    setTextNOTAM(NOTAM);
  }, [NOTAM]);

  const testObj = [
    { role: "user", content: "hi i'm a user", time: 1678906080121 },
    { role: "assistant", content: "hi i'm an assistant", time: 1678906102272 },
  ];

  return (
    <Stack spacing={floatingSpace}>
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
              // setTextNOTAM(e.target.value);
              dispatch(setNOTAM(e.target.value));
            }, [])}
            InputProps={{
              endAdornment: (
                <>
                  <IconButton
                    sx={{ visibility: textNOTAM ? "visible" : "hidden" }}
                    onClick={() => {
                      dispatch(setNOTAM(""));
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                  <IconButton
                    sx={{ visibility: textNOTAM ? "visible" : "hidden" }}
                    onClick={() => {
                      props.handleNOTAM();
                      dispatch(setNOTAM(""));
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </>
              ),
            }}
          />
        </div>
      </Box>
    </Stack>
  );
}
