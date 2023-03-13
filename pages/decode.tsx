import InfoType from "@/components/InfoType";
import styles from "@/styles/Home.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Decode() {
  const types = ["METAR", "TAF", "NOTAM"];

  return (
    <main>
      {/* <div className={styles.center}> */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {types.map((t) => {
          return <InfoType key={t} type={t} />;
        })}
      </Box>
      <Button variant="contained" href="#contained-buttons">
        Decode
      </Button>
      {/* </div> */}
    </main>
  );
}
