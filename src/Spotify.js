import React, { useCallback } from "react";
import PropTypes from "prop-types";

export default function Spotify({ expressions }) {
  const getRecommendedMusicList = useCallback(() => {
    fetch("https://480ytpc372.execute-api.ap-northeast-2.amazonaws.com/dev/handler/musicRmd", {
      method: "POST",
      body: JSON.stringify(expressions),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return <div onClick={getRecommendedMusicList}>Get Recommended Music List</div>;
}

Spotify.propTypes = {
  expressions: PropTypes.object.isRequired,
};
