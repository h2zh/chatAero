import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Skeleton, Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextOuput from "./TextOutput";
import SendIcon from "@mui/icons-material/Send";
import { setSITA } from "@/redux/reducers/userInput";

export default function SectionSITA(props: any) {
  const dispatch = useDispatch();
  const { SITA, SITAloading } = useSelector((state: any) => state.userInput);
  const { convosSITA } = useSelector((state: any) => state.convo);
  const [textSITA, setTextSITA] = useState("");
  let floatingSpace = convosSITA.length === 0 ? 0 : 2;

  useEffect(() => {
    setTextSITA(SITA);
  }, [SITA]);

  return (
    <Stack spacing={floatingSpace}>
      <Stack>
        {convosSITA.map((convo: any, index: any) => (
          <TextOuput
            key={index}
            role={convo.role}
            content={convo.content}
            time={convo.time}
          />
        ))}
      </Stack>

      {SITAloading && (
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
            id={"SITA"}
            label={"SITA"}
            multiline
            maxRows={4}
            value={textSITA}
            disabled={SITAloading}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "10px", // need to restart the server to see this change
                },
              },
            }}
            onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(setSITA(e.target.value));
            }, [])}
            InputProps={{
              endAdornment: (
                <>
                  <IconButton
                    sx={{ visibility: textSITA ? "visible" : "hidden" }}
                    onClick={() => {
                      dispatch(setSITA(""));
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                  <IconButton
                    sx={{ visibility: textSITA ? "visible" : "hidden" }}
                    onClick={() => {
                      props.handleSITA();
                      dispatch(setSITA(""));
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
