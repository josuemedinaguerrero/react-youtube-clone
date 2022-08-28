import { useAppDispatch } from "../redux/hooks";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const GoogleSign = () => {
  const dispatch = useAppDispatch();

  const handleCredentialResponse = async (user) => {
    const { email, picture, name } = jwt_decode(user.credential);
    try {
      dispatch(loginStart());
      const userGoogle = await axios.post(
        "https://jmg-youtube-clone.herokuapp.com/api/auth/google",
        {
          name,
          email,
          img: picture,
        }
      );
      dispatch(loginSuccess(userGoogle.data));
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "620865660073-d67gb65ua9r21u6tlun1e0b57qtqnmgp.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      auto_select: false,
    });

    window.google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "medium",
    });
  }, []);

  return <div id="buttonDiv"></div>;
};

export default GoogleSign;
