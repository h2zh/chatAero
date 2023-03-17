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
  fontSize: "1.1rem",
  fontWeight: 400,
  fontFamily: "Inter, -apple-system, Arial, Roboto, Helvetica,  Poppins ",
  marginBottom: theme.spacing(4),
  // color: "theme.palette.common.black",
  textAlign: "left",
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
    <Box
      sx={{
        width: "100%",
        // height: "100vh", comment out to avoid the content overflow
        position: "relative",
        // backgroundColor: "#ECF2FF",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        background: `linear-gradient(to bottom, #1976d2, #F6F1F1)`,
      }}
    >
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12} margin={2}>
            {/* <TitleTypography gutterBottom>About chatAero</TitleTypography> */}
            <BodyTypography paragraph color={"white"}>
              Introducing chatAero, a new GPT-based aviation message translator
              designed for the aviation community, developed by Howard Zhong.
              With his cross-disciplinary experience in both Computer Science
              and Aviation, Howard identified the needs for AIGC in the aviation
              industry. He worked closely with pilots, air traffic controllers,
              dispatchers, and aviation enthusiasts to create chatAero, an AIGC
              solution that tailors to different usage scenarios of aviation
              messages.
            </BodyTypography>
          </Grid>
          <Grid item xs={12}>
            <TitleTypography gutterBottom>About the author</TitleTypography>
            <BodyTypography paragraph>
              Howard Zhong is a Computer Science Master&rsquo;s student at
              University of Wisconsin-Madison, expecting to graduate in May
              2024. He previously earned his Bachelor&rsquo;s degree from the
              Honors Class of Civil Aviation University of China.
              <br />
              <br />
              He is enthusiastic in building robust software systems. From
              enterprise microservices built on Java Spring Boot to open-source
              civil hacking project coded with React, he dedicates to full-stack
              development and embraces the opportunities to grow in different
              settings.
              <br />
              <br />
              He is looking for software engineering 2023 summer/fall internship
              worldwide <br />
              <br />
              <Link href={mailtoUrl} underline="always">
                Contact
              </Link>
              {` | `}
              <Link
                href={"https://www.linkedin.com/in/howard-zhong-uwmadison/"}
              >
                Linkedin
              </Link>
            </BodyTypography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
