import React from "react";
import { useRouter } from "next/router";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/material";
import { setUsageCount, setIsLoginPopupOpen } from "@/redux/reducers/acctData";
import { loginWithGoogle, logout } from "./AuthOps";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const Login = ({ open, onClose }: LoginDialogProps) => {
  const router = useRouter();
  const { username, userEmail, usageCount, isLoginPopupOpen } = useAppSelector(
    (state: any) => state.acctData
  );
  const dispatch = useAppDispatch();

  const handdleSignIn = async () => {
    dispatch(loginWithGoogle());
  };

  const handdleSignout = async () => {
    dispatch(logout());
    router.push("/");
  };

  // logout user when they chat over 30 messages
  if (usageCount > 30) {
    dispatch(setUsageCount(0));
    handdleSignout();
    alert(
      "We apologize for the inconvenience, but you have reached the maximum number of messages allowed for today. Please visit us again tomorrow. Our developer is actively working on implementing support for more messages, and we appreciate your patience and understanding in the meantime."
    );
  }

  return (
    <Box>
      <Dialog open={open} onClose={onClose} sx={{}}>
        <Box sx={{ m: 3 /* margin top */ }}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              component="h1"
              fontFamily={"-apple-system, Arial, Roboto, Helvetica,  Poppins "}
              color={"primary.main"}
            >
              <b>chatAero</b>
            </Typography>
            {/* <Typography fontFamily={"Inter, -apple-system"}>Howdy!</Typography> */}
          </Box>

          <Button
            variant="contained"
            href="#contained-buttons"
            size="medium"
            startIcon={<GoogleIcon />}
            onClick={handdleSignIn}
          >
            Continue with Google
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Login;
