import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

export default function Spotify({ expressions }) {
  const [tracks, setTracks] = useState([]);

  const getRecommendedMusicList = useCallback(() => {
    fetch("https://avi5pau41d.execute-api.ap-northeast-2.amazonaws.com/dev/handler/musicRec", {
      method: "POST",
      body: JSON.stringify(expressions),
    })
      .then((response) => response.json())
      .then((data) => setTracks(data.tracks));
  }, []);

  return (
    <>
      <div onClick={getRecommendedMusicList}>Get Recommended Music List</div>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>아티스트</th>
            <th>링크</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => (
            <tr key={track.id}>
              <td>{track.name}</td>
              <td>{track.artists[0].name}</td>
              <td>
                <a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
                  링크
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

Spotify.propTypes = {
  expressions: PropTypes.object.isRequired,
};
