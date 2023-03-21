import Footer from "@/components/Footer";
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Head from "next/head";
import Link from "next/link";

const RootBox = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 700,
  // marginBottom: theme.spacing(4),
  margin: theme.spacing(3),
  color: theme.palette.common.white,
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
  textAlign: "center",
}));

const SubtitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 400,
  marginBottom: theme.spacing(4),
  color: "#146C94",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.25)",
  textAlign: "center",
}));

const ButtonButton = styled(Button)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 700,
  color: theme.palette.primary.dark,
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  borderRadius: theme.spacing(2),
  textTransform: "uppercase",
  textAlign: "center",
}));

export default function Index() {
  return (
    <>
      <Head>
        <title>chatAero | Decode METAR, TAF, NOTAM and more</title>
        <meta
          name="description"
          content="A Tool for Understanding Aviation Information"
        />
      </Head>
      <RootBox>
        <Container maxWidth="xl">
          <TitleTypography variant="h1">
            Build for Aviation Professionals & Enthusiasts
          </TitleTypography>
          <SubtitleTypography variant="h4">
            Your AI-powered multi-tasking aviation message decoder
          </SubtitleTypography>
          <SubtitleTypography>
            <Link href="/decode" passHref>
              <ButtonButton variant="contained" color="secondary">
                Get started
              </ButtonButton>
            </Link>
          </SubtitleTypography>
        </Container>
      </RootBox>
      <Footer />
    </>
  );
}
