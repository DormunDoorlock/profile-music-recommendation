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
    setExpressions({ ...detections.expressions });
    faceapi.draw.drawDetections(canvas, detections);
    faceapi.draw.drawFaceExpressions(canvas, detections);
  }, [setExpressions]);

  return (
    <button style={{ marginRight: 20 }} onClick={detectFace}>
      얼굴 인식 &amp; 감정 분석
    </button>
  );
}

Face.propTypes = {
  setExpressions: PropTypes.func.isRequired,
};
