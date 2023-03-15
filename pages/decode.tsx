import styles from "@/styles/Home.module.css";
import { Container, Divider, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNOTAM,
  setMETAR,
  setTAF,
  setNOTAMLoading,
} from "@/redux/reducers/userInput";
import {
  concatNOTAMconvos,
  concatMETARconvos,
  concatTAFconvos,
  popNOTAMconvos,
  Conversation,
} from "@/redux/reducers/convo";
import SectionNOTAM from "@/components/sectionNOTAM";
import SectionMETAR from "@/components/sectionMETAR";
import SectionTAF from "@/components/sectionTAF";

export default function Decode() {
  //   const types = ["METAR", "TAF", "NOTAM"];
  const dispatch = useDispatch();

  const { METAR, TAF, NOTAM, loading } = useSelector(
    (state: any) => state.userInput
  );
  const { convosNOTAM, convosMETAR, convosTAF } = useSelector(
    (state: any) => state.convo
  );
  const initNOTAMPrompt = "Decode everything in the following NOTAM. Use UTC. ";
  //   const [isFirstNOTAM, setIsFirstNOTAM] = useState(true);

  const handleEncodeAll = async () => {
    const myNOTAMmsg: Conversation = {
      role: "user",
      content: NOTAM,
      time: new Date().getTime(),
    };
    if (NOTAM) {
      dispatch(setNOTAMLoading(true));
      // TODO: delete the input text

      // add the latest user input to the conversation history for NOTAM
      dispatch(concatNOTAMconvos(myNOTAMmsg));
      //   let inputPrompt = isFirstNOTAM ? initNOTAMPrompt.concat(NOTAM) : NOTAM;
      //   setIsFirstNOTAM(false);

      console.log(convosNOTAM);
      const response = await fetch("/api/davinci", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: initNOTAMPrompt.concat(NOTAM),
        }), // initPrompt will be prepended to the user input every time
      }).then((response) => response.json());
      dispatch(setNOTAMLoading(false));

      if (response.text) {
        dispatch(
          concatNOTAMconvos({
            role: "assistant",
            content: response.text,
            time: new Date().getTime(),
          })
        );
        // clear the user input and state var NOTAM
        dispatch(setNOTAM(""));
      } else {
        alert("Something went wrong. Please try again later. ");
      }
    }

    if (METAR) {
      dispatch(
        concatMETARconvos({
          role: "user",
          content: METAR,
          time: new Date().getTime(),
        })
      );
    }
    if (TAF) {
      dispatch(
        concatTAFconvos({
          role: "user",
          content: TAF,
          time: new Date().getTime(),
        })
      );
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
    <Container sx={{ mt: 2 }} maxWidth="md">
      <Stack direction="column" spacing={{ xs: 2, md: 3 }}>
        <SectionNOTAM />
        {convosMETAR.length > 0 ?? <Divider />}
        <SectionMETAR />
        {convosTAF.length > 0 ?? <Divider />}
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
