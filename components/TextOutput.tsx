import { Card, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function TextOuput(props: any) {
  return (
    <Card
      variant="outlined"
      sx={{ backgroundColor: "#eceff1", color: "black" }}
    >
      <CardContent>
        <Typography variant="body1">{props.answer}</Typography>
      </CardContent>
    </Card>
  );
}
