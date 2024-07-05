import { useEffect, useRef } from "react";
// import authConfig from "../../oauth.config.json"
import useAuth from "../hooks/useAuth";

const GoogleSigninBtn = ({ onClick }) => {

  return (
    <button id="signin"  onClick={onClick} >
      google signin
    </button>
  );
};

export default GoogleSigninBtn;
