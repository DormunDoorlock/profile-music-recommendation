import React, { useRef, useState } from "react";
import Kakao from "./Kakao";
import Spotify from "./Spotify";
import Face from "./Face";

export default function App() {
  const canvasRef = useRef(null);
  const [expressions, setExpressions] = useState({});

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <canvas ref={canvasRef} width={640} height={640} />
      </div>
      <Kakao canvasRef={canvasRef} />
      <Face setExpressions={setExpressions} />
      <Spotify expressions={expressions} />
    </div>
  );
}
