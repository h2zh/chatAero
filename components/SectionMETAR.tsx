import { Box, IconButton, Stack, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMETAR } from "@/redux/reducers/userInput";

export default function SectionMETAR() {
  const dispatch = useDispatch();
  // const { METAR } = useSelector((state: any) => state.userInput);
  const [textMETAR, setTextMETAR] = useState("");
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
            id={"METAR"}
            label={"METAR"}
            value={textMETAR} // Can't use METAR from useSelector; useRef and inputRef={METARTextfield} to bind
            multiline
            maxRows={4}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTextMETAR(e.target.value);
              dispatch(setMETAR(e.target.value));
            }}
            InputProps={{
              style: {
                height: "56px", // need to restart the server to see this change
              },
              endAdornment: (
                <IconButton
                  sx={{ visibility: textMETAR ? "visible" : "hidden" }}
                  onClick={() => {
                    setTextMETAR("");
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
