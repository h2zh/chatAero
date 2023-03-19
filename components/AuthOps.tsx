import {
  setActiveUser,
  setUserLogOut,
  setIsLoginPopupOpen,
  setUsageCount,
  setAuthLoading,
  setError,
} from "@/redux/reducers/acctData";
import { AppDispatch } from "@/redux/store";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/pages/api/firebase";

/** the function returns another function that takes the dispatch method as its argument. 
 This is a common pattern in Redux when using asynchronous actions, and it allows the 
 inner function to dispatch actions (setXXX..) and access the Redux store as needed. */
export const loginWithGoogle = () => async (dispatch: AppDispatch) => {
  dispatch(setAuthLoading(true)); // authLoading will be set to false in setActiveUser

  signInWithPopup(auth, new GoogleAuthProvider())
    .then((result: any) => {
      dispatch(setIsLoginPopupOpen(false));
      dispatch(
        setActiveUser({
          username: result.user.displayName,
          userEmail: result.user.email,
        })
      );
    })
    .catch((error) => {
      dispatch(setError(error.message));
    });
};

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(setAuthLoading(true));
  auth
    .signOut()
    .then(() => {
      dispatch(setUserLogOut());
    })
    .catch((error) => {
      dispatch(setError(error.message));
    });
};
