import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTAF } from "@/redux/reducers/userInput";

export default function SectionTAF() {
  const dispatch = useDispatch();
  // const { TAF } = useSelector((state: any) => state.userInput);
  const [textTAR, setTextTAR] = useState("");

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
            id={"TAF"}
            label={"TAF"}
            multiline
            maxRows={4}
            value={textTAR}
            onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
              setTextTAR(e.target.value);
              dispatch(setTAF(e.target.value));
            }, [])}
            InputProps={{
              style: {
                height: "56px", // need to restart the server to see this change
              },
              endAdornment: (
                <IconButton
                  sx={{ visibility: textTAR ? "visible" : "hidden" }}
                  onClick={() => {
                    setTextTAR("");
                  }}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </div>
      </Box>
      {/* <TextOuput></TextOuput> */}
    </Stack>
  );
}
