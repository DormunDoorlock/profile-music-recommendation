import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import * as faceapi from "face-api.js";

export default function Face({ setExpressions }) {
  useEffect(() => {
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]);
  }, []);

  const detectFace = useCallback(async () => {
    const canvas = document.querySelector("canvas");
    const detections = await faceapi
      .detectSingleFace(canvas)
      .withFaceLandmarks()
      .withFaceExpressions();
    console.log(detections);
    setExpressions(detections.expressions);
    faceapi.draw.drawDetections(canvas, detections);
    faceapi.draw.drawFaceExpressions(canvas, detections);
  }, []);

  return <div onClick={detectFace}>Detect Face</div>;
}

Face.propTypes = {
  setExpressions: PropTypes.func.isRequired,
};
