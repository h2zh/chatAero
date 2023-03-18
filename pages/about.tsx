import Footer from "@/components/Footer";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Link,
  styled,
} from "@mui/material";
import { Metadata } from "next";
import Head from "next/head";

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 700,
  fontFamily: "-apple-system, Arial, Roboto, Helvetica,  Poppins ",
  // marginBottom: theme.spacing(4),
  margin: theme.spacing(2),
  color: theme.palette.primary.main,
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.15)",
  textAlign: "center",
}));

const BodyTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: 400,
  fontFamily: "Inter, -apple-system, Arial, Roboto, Helvetica,  Poppins ",
  marginBottom: theme.spacing(4),
  color: "white",
  textAlign: "left",
  margin: 20,
}));

// export const metadata: Metadata = {
//   title: "About",
//   description: "chatAero and the author",
// };

export default function About() {
  const email = "howardev@outlook.com";
  const subject = "From your chatAero web app: ";
  const body = "Enter your words here...";

  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          background: `linear-gradient(to bottom, #1976d2, #F6F1F1)`,
          height: "100vh",
        }}
      >
        <Head>
          <title>About | chatAero</title>
        </Head>
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "top",
            alignItems: "center",
          }}
        >
          <Box>
            <BodyTypography sx={{ mb: "2rem" }}>
              Introducing{" "}
              <i>
                <strong>chatAero</strong>
              </i>
              , a new GPT-based aviation message translator designed for the
              aviation community, developed by Howard Zhong. With his
              cross-disciplinary experience in both Computer Science and
              Aviation, Howard identified the needs for AIGC in the aviation
              industry. He worked closely with pilots, air traffic controllers,
              dispatchers, and aviation enthusiasts to build chatAero, an AIGC
              tool that tailors to different usage scenarios of aviation
              messages.
            </BodyTypography>
          </Box>
          {/* <Typography variant="h6" sx={{ mb: "1rem" }}>
          About the author
        </Typography>
        <Typography variant="body1" sx={{ mb: "1rem" }}>
          Howard Zhong is a Computer Science Master’s student at University of
          Wisconsin-Madison, expecting to graduate in May 2024. He previously
          earned his Bachelor’s degree from the Honors Class of Civil Aviation
          University of China.
        </Typography>
        <Typography variant="body1" sx={{ mb: "1rem" }}>
          He is enthusiastic about building robust software systems. From
          enterprise microservices built on Java Spring Boot to open-source
          civil hacking projects coded with React, he dedicates to full-stack
          development and embraces the opportunities to grow in different
          settings.
        </Typography>
        <Typography variant="body1" sx={{ mb: "1rem" }}>
          He is looking for software engineering 2023 summer/fall internship
          worldwide.
        </Typography> */}
        </Container>
      </Box>
      <Footer />
    </>
  );
}

{
  /* <Link href={mailtoUrl} underline="always">
                  Contact
                </Link>
                {` | `}
                <Link
                  href={"https://www.linkedin.com/in/howard-zhong-uwmadison/"}
                >
                  Linkedin
                </Link> */
}
