import React, { useRef, useState } from "react";
import Kakao from "./Kakao";
import Spotify from "./Spotify";
import Face from "./Face";

export default function App() {
  const canvasRef = useRef(null);
  const [stage, setStage] = useState(0);
  const [expressions, setExpressions] = useState({});

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <canvas ref={canvasRef} width={640} height={640} />
      </div>
      <Kakao canvasRef={canvasRef} stage={stage} setStage={setStage} />
      <Face stage={stage} setStage={setStage} setExpressions={setExpressions} />
      <Spotify stage={stage} expressions={expressions} />
    </div>
  );
}
