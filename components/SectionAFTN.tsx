import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Skeleton, Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextOuput from "./TextOutput";
import SendIcon from "@mui/icons-material/Send";
import { setAFTN } from "@/redux/reducers/userInput";

export default function SectionAFTN(props: any) {
  const dispatch = useDispatch();
  const { AFTN, AFTNloading } = useSelector((state: any) => state.userInput);
  const { convosAFTN } = useSelector((state: any) => state.convo);
  const [textAFTN, setTextAFTN] = useState("");
  let floatingSpace = convosAFTN.length === 0 ? 0 : 2;

  useEffect(() => {
    setTextAFTN(AFTN);
  }, [AFTN]);

  return (
    <Stack spacing={floatingSpace}>
      <Stack>
        {convosAFTN.map((convo: any, index: any) => (
          <TextOuput
            key={index}
            role={convo.role}
            content={convo.content}
            time={convo.time}
          />
        ))}
      </Stack>

      {AFTNloading && (
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
            id={"AFTN"}
            label={"AFTN"}
            multiline
            maxRows={4}
            value={textAFTN}
            // disabled={AFTNloading}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "10px", // need to restart the server to see this change
                },
              },
            }}
            onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(setAFTN(e.target.value));
            }, [])}
            InputProps={{
              endAdornment: (
                <>
                  <IconButton
                    sx={{ visibility: textAFTN ? "visible" : "hidden" }}
                    onClick={() => {
                      dispatch(setAFTN(""));
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                  <IconButton
                    sx={{ visibility: textAFTN ? "visible" : "hidden" }}
                    onClick={() => {
                      props.handleAFTN();
                      dispatch(setAFTN(""));
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
