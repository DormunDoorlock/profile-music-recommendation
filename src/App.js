import React, { useEffect } from "react";
import Kakao from "./Kakao";
import Spotify from "./Spotify";
import Face from "./Face";

export default function App() {
  const [expressions, setExpressions] = React.useState({});

  useEffect(() => {
    console.log(expressions);
  }, [expressions]);

  return (
    <>
      <Kakao />
      <Spotify expressions={expressions} />
      <Face setExpressions={setExpressions} />
    </>
  );
}
