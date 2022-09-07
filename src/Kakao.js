import React, { useCallback, useEffect, useState } from "react";

export default function Kakao() {
  const [profileImage, setProfileImage] = useState("");

  const handleKakaoLogin = useCallback(() => {
    window.Kakao.Auth.login({
      success: function (response) {
        console.log(response);
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
      url: "/v2/user/me",
      success: function (response) {
        console.log(response);
        setProfileImage(response.kakao_account.profile.profile_image_url);
      },
      fail: function (error) {
        console.log(error);
      },
    });
  }, []);

  useEffect(() => {
    window.Kakao.isInitialized() ||
      window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
  });

  return (
    <div>
      <div onClick={handleKakaoLogin}>카카오 로그인</div>
      <div onClick={handleKakaoLogout}>카카오 로그아웃</div>
      <div onClick={getProfileImage}>프로필 사진 가져오기</div>
      <img src={profileImage} />
    </div>
  );
}
