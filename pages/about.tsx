import { Box, Container, Divider, Grid, Typography, Link } from "@mui/material";

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
        // position: "fixed",
        bottom: 0,
        width: "100%",
        height: "90vh",
        // backgroundColor: "#ECF2FF",
        paddingTop: "2rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <h3
              style={{
                fontFamily:
                  "-apple-system, Arial, Roboto, Helvetica,  Poppins ",
                fontSize: 20,
                color: "#0277bd",
              }}
            >
              About the author
            </h3>
          </Grid>
          <Grid item xs={12}>
            <Typography
              color="textSecondary"
              variant="subtitle2"
              sx={{ mb: 1 }}
            >
              Howard Zhong is a Computer Science Master’s student at University
              of Wisconsin-Madison, expecting to graduate in May 2024. He
              previously earned his Bachelor degree from the Honors Class of
              Civil Aviation University of China.
            </Typography>
            <Typography
              color="textSecondary"
              variant="subtitle2"
              sx={{ mb: 1 }}
            >
              He is enthusiastic in building robust software systems. From
              enterprise microservices built on Java Spring Boot to open-source
              civil hacking project coded with React, he dedicates to full-stack
              development and embraces the opportunities to grow in different
              settings.
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
              He is looking for software engineering 2023 internship worldwide |{" "}
              <Link href={mailtoUrl} underline="always">
                Contact
              </Link>
              {` | `}
              <Link
                href={"https://www.linkedin.com/in/howard-zhong-uwmadison/"}
              >
                Linkedin
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
