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

// import { getAuth } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const router = useRouter();
  const { username, userEmail, usageCount, isLoginPopupOpen } = useAppSelector(
    (state: any) => state.acctData
  );
  const dispatch = useAppDispatch();

  // const auth = getAuth();
  // const [user, loading] = useAuthState(auth);

  const handdleSignIn = async () => {
    dispatch(loginWithGoogle());
  };

  const handdleSignout = async () => {
    dispatch(logout());
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
          <Box sx={{ mb: 3, maxWidth: "250px" }}>
            <Typography
              variant="h4"
              component="h1"
              fontFamily={"-apple-system, Arial, Roboto, Helvetica,  Poppins "}
              color={"primary.main"}
            >
              <b>chatAero</b>
            </Typography>
            <Typography
              variant="body2"
              fontFamily={"Inter, -apple-system"}
              sx={{ ml: 0 }}
            >
              It&rsquo;s free! To make sure only real people using chatAero, we
              need you continue with Google to verify.
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="medium"
            startIcon={<GoogleIcon />}
            onClick={handdleSignIn}
            sx={{ textTransform: "none" }}
          >
            Continue with Google Account
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default LoginDialog;
