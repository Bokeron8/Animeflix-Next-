"use client";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useEffect, useRef } from "react";

export const VideoJS = ({ options, episodeInfo, serverURL }) => {
  const videoRef = useRef();
  const playerRef = useRef();

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(serverURL);
    }
  }, [options, videoRef, serverURL]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      const watchingList =
        JSON.parse(localStorage.getItem("watching-list")) || [];

      let episodeIdx = watchingList.findIndex(
        (episode) => episode.title == episodeInfo.title
      );
      if (episodeIdx === -1) {
        watchingList.push({
          title: episodeInfo.title,
          episodeNumber: episodeInfo.episodeNumber,
          href: episodeInfo.href,
          img: episodeInfo.img,
          timeStamp: 0,
        });
        episodeIdx = watchingList.length - 1;
      }
      const currentEpisode = watchingList[episodeIdx];
      console.log(currentEpisode, episodeInfo);
      const currentTime =
        currentEpisode.episodeNumber === episodeInfo.episodeNumber
          ? currentEpisode?.timeStamp
          : 0 || 0;
      player.currentTime(currentTime);

      window.addEventListener("beforeunload", function (e) {
        const timeStamp = player.currentTime();
        watchingList[episodeIdx].timeStamp = timeStamp;
        watchingList[episodeIdx].episodeNumber = episodeInfo.episodeNumber;
        watchingList[episodeIdx].href = episodeInfo.href;
        localStorage.setItem("watching-list", JSON.stringify(watchingList));
      });

      return () => {
        if (player && !player.isDisposed()) {
          const timeStamp = player.currentTime();
          watchingList[episodeIdx].timeStamp = timeStamp;
          watchingList[episodeIdx].episodeNumber = episodeInfo.episodeNumber;
          watchingList[episodeIdx].href = episodeInfo.href;
          localStorage.setItem("watching-list", JSON.stringify(watchingList));
          player.dispose();
          playerRef.current = null;
        }
      };
    }
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
