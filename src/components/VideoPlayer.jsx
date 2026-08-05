// frontend/src/components/VideoPlayer.jsx
import React, { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ video, autoPlay = false, controls = true }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    // Set up event listeners for video analytics if needed
    return () => {
      // Cleanup
    };
  }, []);

  if (!video || !video.videoUrl) {
    return (
      <div className="w-full h-full min-h-[300px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No video to display</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ReactPlayer
        ref={playerRef}
        url={video.videoUrl}
        width="100%"
        height="100%"
        controls={controls}
        playing={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              controls: 1,
            },
          },
          vimeo: {
            playerOptions: {
              byline: false,
              portrait: false,
              title: false,
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;