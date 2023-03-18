import styles from "@/styles/Home.module.css";
import { Chip, Container, Divider, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNOTAM,
  setMETAR,
  setTAF,
  setAFTN,
  setSITA,
  setNOTAMloading,
  setMETARloading,
  setTAFloading,
  setAFTNloading,
  setSITAloading,
} from "@/redux/reducers/userInput";
import {
  concatNOTAMconvos,
  concatMETARconvos,
  concatTAFconvos,
  popNOTAMconvos,
  Conversation,
  concatAFTNconvos,
  concatSITAconvos,
} from "@/redux/reducers/convo";
import SectionNOTAM from "@/components/SectionNOTAM";
import SectionMETAR from "@/components/SectionMETAR";
import SectionTAF from "@/components/SectionTAF";
import SectionAFTN from "@/components/SectionAFTN";
import SectionSITA from "@/components/SectionSITA";
import ExportButton from "@/components/ExportButton";

export default function Decode() {
  const dispatch = useDispatch();

  const { METAR, TAF, NOTAM, AFTN, SITA, loading } = useSelector(
    (state: any) => state.userInput
  );
  const { convosNOTAM, convosMETAR, convosTAF, convosAFTN, convosSITA } =
    useSelector((state: any) => state.convo);

  const handleSubmit = async (
    content: string,
    initPrompt: string,
    setField: any,
    setFieldLoading: any,
    concatFieldConvos: any
  ) => {
    if (content) {
      const myMsg: Conversation = {
        role: "user",
        content: content,
        time: new Date().getTime(),
      };
      dispatch(setFieldLoading(true));

      // add the latest user input to the conversation history for NOTAM
      dispatch(concatFieldConvos(myMsg));

      // delete the state var NOTAM and indirectly delete the text field via useEffect in child component
      dispatch(setField(""));

      //   console.log(convos);
      const response = await fetch("/api/davinci", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: initPrompt.concat(content),
        }), // initPrompt will be prepended to the user input every time
      }).then((response) => response.json());
      dispatch(setFieldLoading(false));

      if (response.text) {
        dispatch(
          concatFieldConvos({
            role: "assistant",
            content: response.text, // .replace(/\n/g, "<br />")
            time: new Date().getTime(),
          })
        );
      } else {
        alert("Something went wrong. Please try again later. ");
      }
    }
  };

  const handleNOTAM = async () => {
    const initNOTAMPrompt =
      "Decode everything in the following NOTAM. Use UTC. ";

    handleSubmit(
      NOTAM,
      initNOTAMPrompt,
      setNOTAM,
      setNOTAMloading,
      concatNOTAMconvos
    );
  };

  const handleMETAR = async () => {
    const initMETARPrompt =
      "Decode everything in the following METAR. Use UTC. ";

    handleSubmit(
      METAR,
      initMETARPrompt,
      setMETAR,
      setMETARloading,
      concatMETARconvos
    );
  };

  const handleTAF = async () => {
    const initTAFPrompt = "Decode everything in the following TAF. Use UTC. ";

    handleSubmit(TAF, initTAFPrompt, setTAF, setTAFloading, concatTAFconvos);
  };

  const handleAFTN = async () => {
    const initAFTNPrompt =
      "Decode everything in the following AFTN Teletype message. Use UTC. ";

    handleSubmit(
      AFTN,
      initAFTNPrompt,
      setAFTN,
      setAFTNloading,
      concatAFTNconvos
    );
  };

  const handleSITA = async () => {
    const initSITAPrompt =
      "Decode everything in the following SITA Teletype message. Use UTC. ";

    handleSubmit(
      SITA,
      initSITAPrompt,
      setSITA,
      setSITAloading,
      concatSITAconvos
    );
  };

  const handleEncodeAll = async () => {
    handleNOTAM();
    handleMETAR();
    handleTAF();
    handleAFTN();
    handleSITA();
  };

  const handleOneExport = (fieldConvos: any, filename: string) => {
    if (fieldConvos.length > 0) {
      const convosString = JSON.stringify(fieldConvos);
      const convosBlob = new Blob([convosString], {
        type: "text/plain",
      });
      const convosURL = URL.createObjectURL(convosBlob);
      const convosLink = document.createElement("a");
      convosLink.download = `chatAero_${filename}.json`;
      convosLink.href = convosURL;
      convosLink.click();
    }
  };

  const handleAllExport = () => {
    handleOneExport(convosNOTAM, "NOTAM");
    handleOneExport(convosMETAR, "METAR");
    handleOneExport(convosTAF, "TAF");
    handleOneExport(convosAFTN, "AFTN");
    handleOneExport(convosSITA, "SITA");
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
    <Container sx={{ mt: 3, height: "100vh" }} maxWidth="md">
      <Stack direction="column" spacing={{ xs: 2, md: 2 }}>
        {convosNOTAM.length > 0 && (
          <Divider>
            <Chip label="NOTAM" size="medium" variant="outlined" />
          </Divider>
        )}
        <SectionNOTAM handleNOTAM={handleNOTAM} />
        {convosMETAR.length > 0 && (
          <Divider>
            <Chip label="METAR" size="medium" variant="outlined" />
          </Divider>
        )}
        <SectionMETAR handleMETAR={handleMETAR} />
        {convosTAF.length > 0 && (
          <Divider>
            <Chip label="TAF" size="medium" variant="outlined" />
          </Divider>
        )}
        <SectionTAF handleTAF={handleTAF} />
        {convosAFTN.length > 0 && (
          <Divider>
            <Chip label="AFTN" size="medium" variant="outlined" />
          </Divider>
        )}
        <SectionAFTN handleAFTN={handleAFTN} />
        {convosSITA.length > 0 && (
          <Divider>
            <Chip label="SITA" size="medium" variant="outlined" />
          </Divider>
        )}
        <SectionSITA handleSITA={handleTAF} />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{ marginY: 3, justifyContent: "center", paddingBottom: 15 }}
      >
        <Button
          variant="contained"
          href="#contained-buttons"
          size="medium"
          endIcon={<SendIcon />}
          onClick={handleEncodeAll}
        >
          Decode
        </Button>
        <ExportButton handleAllExport={handleAllExport} />
      </Stack>
    </Container>
  );
}
