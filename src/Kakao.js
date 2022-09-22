import React, { useCallback, useEffect, useRef, useState } from "react";

export default function Kakao() {
  const canvasRef = useRef(null);
  const [profileImage, setProfileImage] = useState("");

  const handleKakaoLogin = useCallback(() => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/login",
      prompts: "login",
    });
  }, []);

  const handleKakaoLogout = useCallback(() => {
    window.Kakao.Auth.logout();
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
  });

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

  return (
    <div>
      <div onClick={handleKakaoLogin}>카카오 로그인</div>
      <div onClick={handleKakaoLogout}>카카오 로그아웃</div>
      <div onClick={getProfileImage}>프로필 사진 불러오기</div>
      <canvas ref={canvasRef} width={640} height={640} />
    </div>
  );
}
