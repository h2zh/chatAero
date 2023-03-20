import styles from "@/styles/Home.module.css";
import { Chip, Container, Divider, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
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
import { setIsLoginPopupOpen, setUsageCount } from "@/redux/reducers/acctData";
import SectionNOTAM from "@/components/SectionNOTAM";
import SectionMETAR from "@/components/SectionMETAR";
import SectionTAF from "@/components/SectionTAF";
import SectionAFTN from "@/components/SectionAFTN";
import SectionSITA from "@/components/SectionSITA";
import ExportButton from "@/components/ExportButton";
import Head from "next/head";
import Login from "@/components/Login";
import { toDate, isBetween } from "@/util/DateFuncs";

export default function AllSections() {
  const dispatch = useAppDispatch();

  const { METAR, TAF, NOTAM, AFTN, SITA, loading } = useAppSelector(
    (state: any) => state.userInput
  );
  const { convosNOTAM, convosMETAR, convosTAF, convosAFTN, convosSITA } =
    useAppSelector((state: any) => state.convo);

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
      dispatch(setUsageCount(1));

      let resContent = null;
      // pivot function to parse a JSON response from NOTAM API call
      if (content === NOTAM) {
        const resJSON = JSON.parse(response.text);
        const NOTAMNumber = resJSON["NOTAM_number"];
        const locationCode = resJSON["location_code"];
        const effectiveTime = resJSON["effective_time"];
        const expirationTime = resJSON["expiration_time"];
        const plainEnglish = resJSON["plain_English"];

        const startTime = toDate(effectiveTime); //UTC
        const endTime = toDate(expirationTime);
        const now = new Date();
        const statusTag = isBetween(now, startTime, endTime)
          ? "[Active Now]"
          : "";

        resContent =
          "[NOTAM Number] " +
          NOTAMNumber +
          "\n[Location]     " +
          locationCode +
          "\n[Effective Time] " +
          startTime.toUTCString() +
          " (" +
          startTime.toLocaleString("en-US", {
            timeZoneName: "short",
          }) +
          ") " +
          statusTag +
          "\n[Expiration Time] " +
          endTime.toUTCString() +
          " (" +
          endTime.toLocaleString("en-US", {
            timeZoneName: "short",
          }) +
          ")" +
          "\n" +
          plainEnglish;
      } else {
        resContent = response.text;
      }

      if (response.text) {
        dispatch(
          concatFieldConvos({
            role: "assistant",
            content: resContent, // '\n' is handled by ChatMsg when mapping to html <p>
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
      'Decode everything in the following NOTAM in plain English. Use UTC. Your response should be in JSON format with parameters: "NOTAM_number", "location_code", "effective_time", "expiration_time", "plain_English". All values in JSON should be a string. \n';

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
  // console.log(convosNOTAM);

  return (
    <>
      {/* {!username && <Login />} */}

      <Container sx={{ mt: 3, height: "100vh" }} maxWidth="md">
        <Head>
          <title>chatAero | Aviation Messages AI Decoder</title>
        </Head>
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
            size="medium"
            endIcon={<SendIcon />}
            onClick={handleEncodeAll}
          >
            Decode
          </Button>
          <ExportButton handleAllExport={handleAllExport} />
        </Stack>
      </Container>
    </>
  );
}
