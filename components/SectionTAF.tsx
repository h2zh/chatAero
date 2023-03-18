import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Skeleton, Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextOuput from "./TextOutput";
import SendIcon from "@mui/icons-material/Send";
import { setTAF } from "@/redux/reducers/userInput";

export default function SectionTAF(props: any) {
  const dispatch = useDispatch();
  const { TAF, TAFloading } = useSelector((state: any) => state.userInput);
  const { convosTAF } = useSelector((state: any) => state.convo);
  const [textTAF, setTextTAF] = useState("");
  let floatingSpace = convosTAF.length === 0 ? 0 : 2;

  useEffect(() => {
    setTextTAF(TAF);
  }, [TAF]);

  return (
    <Stack spacing={floatingSpace}>
      <Stack>
        {convosTAF.map((convo: any, index: any) => (
          <TextOuput
            key={index}
            role={convo.role}
            content={convo.content}
            time={convo.time}
          />
        ))}
      </Stack>

      {TAFloading && (
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
            id={"TAF"}
            label={"TAF"}
            multiline
            maxRows={4}
            value={textTAF}
            // disabled={TAFloading}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "10px", // need to restart the server to see this change
                },
              },
            }}
            onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
              // setTextMETAR(e.target.value);
              dispatch(setTAF(e.target.value));
            }, [])}
            InputProps={{
              endAdornment: (
                <>
                  <IconButton
                    sx={{ visibility: textTAF ? "visible" : "hidden" }}
                    onClick={() => {
                      dispatch(setTAF(""));
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                  <IconButton
                    sx={{ visibility: textTAF ? "visible" : "hidden" }}
                    onClick={() => {
                      props.handleTAF();
                      dispatch(setTAF(""));
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
