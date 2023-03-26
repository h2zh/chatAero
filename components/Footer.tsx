import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import Head from "next/head";

const Footer = () => {
  const email = "howardev@outlook.com";
  const subject = "From your chatAero web app: ";
  const body = "Enter your words here...";

  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <Box
      sx={{
        // position: "relative",
        // bottom: 0,
        width: "100%",
        zIndex: 1,
        // marginTop: "auto",
        // height: "auto",
        backgroundColor: "#cfd8dc",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="flex-start">
          <Grid item xs={12}>
            <h3
              style={{
                fontFamily:
                  "-apple-system, Arial, Roboto, Helvetica,  Poppins ",
                fontSize: 20,
                color: "#0277bd",
              }}
            >
              chatAero
            </h3>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle2">
              {`© ${new Date().getFullYear()} Howard Zhong. All rights reserved.`}
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
              {`CS @ UW-Madison | Looking for software engineering 2023 summer/fall internship worldwide`}
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
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
};

export default Footer;
