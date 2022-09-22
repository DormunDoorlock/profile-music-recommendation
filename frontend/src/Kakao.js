import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function Kakao({ canvasRef }) {
  const [profileImage, setProfileImage] = useState("");

  const handleKakaoLogin = useCallback(() => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/login",
    });
  }, []);

  const getProfileImage = useCallback(() => {
    fetch("https://1k6jwmoqb0.execute-api.ap-northeast-2.amazonaws.com/dev/handler/login", {
      method: "POST",
      body: JSON.stringify({ code: new URL(window.location.href).searchParams.get("code") }),
    })
      .then((response) => response.json())
      .then((data) => setProfileImage(data.profile));
  }, []);

  useEffect(() => {
    window.Kakao.isInitialized() || window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
  }, []);

  useEffect(() => {
    new URL(window.location.href).searchParams.get("code") && getProfileImage();
    history.replaceState(null, null, "/");
  }, [getProfileImage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = profileImage;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
      const x = canvas.width / 2 - (image.width / 2) * scale;
      const y = canvas.height / 2 - (image.height / 2) * scale;
      context.drawImage(image, x, y, image.width * scale, image.height * scale);
    };
  }, [profileImage]);

  return <button onClick={handleKakaoLogin}>카카오 로그인</button>;
}

Kakao.propTypes = {
  canvasRef: PropTypes.object.isRequired,
};
