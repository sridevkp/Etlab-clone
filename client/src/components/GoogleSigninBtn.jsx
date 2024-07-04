import { useEffect, useRef } from "react";
import authConfig from "../../oauth.config.json"
import useAuth from "../hooks/useAuth";

const GoogleSigninBtn = ({ handleCallbackResponse }) => {
  const { setAuth } = useAuth()
  const btnRef = useRef()

  useEffect( () => {
    /* global google */ 
    google.accounts.id.initialize({
        client_id : authConfig.web.client_id,
        callback  : handleCallbackResponse
    })
    google.accounts.id.renderButton( 
      btnRef.current,
      { theme: "outline", size: "large" }
    )
  }, []) 

  return (
    <div id="signin" ref={btnRef} ></div>
  );
};

export default GoogleSigninBtn;
