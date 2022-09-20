import React, { useCallback, useEffect, useRef, useState } from "react";

export default function Kakao() {
  const canvasRef = useRef(null);
  const [profileImage, setProfileImage] = useState("");

  const handleKakaoLogin = useCallback(() => {
    window.Kakao.Auth.login({
      success: function () {
        getProfileImage();
      },
      fail: function (error) {
        console.log(error);
      },
    });
  }, []);

  const handleKakaoLogout = useCallback(() => {
    window.Kakao.Auth.logout();
  }, []);

  const getProfileImage = useCallback(() => {
    window.Kakao.API.request({
      url: "/v1/api/talk/profile",
      success: function (response) {
        console.log(response);
        setProfileImage(response.profileImageURL);
      },
      fail: function (error) {
        console.log(error);
      },
    });
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
      <canvas ref={canvasRef} width={640} height={640} />
    </div>
  );
}
