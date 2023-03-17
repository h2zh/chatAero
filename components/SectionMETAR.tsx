import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Skeleton, Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMETAR } from "@/redux/reducers/userInput";
import TextOuput from "./TextOutput";
import SendIcon from "@mui/icons-material/Send";

export default function SectionMETAR(props: any) {
  const dispatch = useDispatch();
  const { METAR } = useSelector((state: any) => state.userInput);
  const [textMETAR, setTextMETAR] = useState("");
  const { convosMETAR } = useSelector((state: any) => state.convo);
  const { METARloading } = useSelector((state: any) => state.userInput);
  let floatingSpace = convosMETAR.length === 0 ? 0 : 2;

  useEffect(() => {
    setTextMETAR(METAR);
  }, [METAR]);

  return (
    <Stack spacing={floatingSpace}>
      <Stack>
        {convosMETAR.map((convo: any, index: any) => (
          <TextOuput
            key={index}
            role={convo.role}
            content={convo.content}
            time={convo.time}
          />
        ))}
      </Stack>

      {METARloading && (
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
            id={"METAR"}
            label={"METAR"}
            multiline
            maxRows={4}
            value={textMETAR}
            // disabled={METARloading}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "10px", // need to restart the server to see this change
                },
              },
            }}
            onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
              // setTextMETAR(e.target.value);
              dispatch(setMETAR(e.target.value));
            }, [])}
            InputProps={{
              endAdornment: (
                <>
                  <IconButton
                    sx={{ visibility: textMETAR ? "visible" : "hidden" }}
                    onClick={() => {
                      dispatch(setMETAR(""));
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                  <IconButton
                    sx={{ visibility: textMETAR ? "visible" : "hidden" }}
                    onClick={() => {
                      props.handleMETAR();
                      dispatch(setMETAR(""));
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
