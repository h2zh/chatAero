import styles from "@/styles/Home.module.css";
import { Container, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMETAR, setTAF, setNOTAM } from "@/redux/reducers/userInput";
import {
  concatNOTAMconvos,
  concatMETARconvos,
  concatTAFconvos,
  popNOTAMconvos,
} from "@/redux/reducers/convo";
import SectionNOTAM from "@/components/sectionNOTAM";
import SectionMETAR from "@/components/sectionMETAR";
import SectionTAF from "@/components/sectionTAF";

export default function Decode() {
  //   const types = ["METAR", "TAF", "NOTAM"];
  const dispatch = useDispatch();

  const { METAR, TAF, NOTAM } = useSelector((state: any) => state.userInput);
  const { convosNOTAM, convosMETAR, convosTAF } = useSelector(
    (state: any) => state.convo
  );

  const handleEncodeAll = () => {
    if (NOTAM) {
      // add the latest user input to the conversation history for NOTAM
      dispatch(concatNOTAMconvos({ role: "user", content: NOTAM }));
      console.log(convosNOTAM);
      fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: convosNOTAM }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch(
            concatNOTAMconvos({
              role: "assistant",
              content: data.result.choices[0].message.content,
            })
          );
        });

      //   const data = await response.json();
    }
    if (METAR) {
      dispatch(concatMETARconvos({ role: "user", content: METAR }));
    }
    if (TAF) {
      dispatch(concatTAFconvos({ role: "user", content: TAF }));
    }
  };

  //   console.log(convosNOTAM);
  //   const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
  //     dispatch(setNOTAM(""));
  //     dispatch(setMETAR(""));
  //     dispatch(setTAF(""));

  //     console.log("METAR", METAR.length);
  //   };
  console.log(convosNOTAM);

  return (
    <Container sx={{ mt: 4 }} maxWidth="md">
      <Stack direction="column" spacing={{ xs: 2, md: 3 }}>
        <SectionNOTAM />
        <SectionMETAR />
        <SectionTAF />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{ marginTop: 3, justifyContent: "center" }}
      >
        <Button
          variant="contained"
          href="#contained-buttons"
          onClick={handleEncodeAll}
        >
          Decode
        </Button>
        {/* <Button
          variant="contained"
          href="#contained-buttons"
          onClick={handleClear}
        >
          Clear
        </Button> */}
      </Stack>
    </Container>
  );
}
