import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function MultilineTextFields(props: any) {
  const [input, setInput] = useState("");

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" }, //, width: "55ch"
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id={props.fieldName}
          label={props.fieldName}
          multiline
          maxRows={4}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInput(event.target.value);
          }}
        />
      </div>
    </Box>
  );
}
