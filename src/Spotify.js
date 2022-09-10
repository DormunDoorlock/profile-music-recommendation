import React, { useCallback, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

export default function Spotify() {
  const [isInitialized, setIsInitialized] = React.useState(false);

  const initializeSpotify = useCallback(() => {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${window.btoa(
          process.env.REACT_APP_SPOTIFY_CLIENT_ID +
            ":" +
            process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
        )}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    })
      .then((response) => response.json())
      .then(({ access_token }) => spotifyApi.setAccessToken(access_token))
      .then(() => setIsInitialized(true));
  }, []);

  useEffect(() => {
    isInitialized || initializeSpotify();
  });

  return;
}
