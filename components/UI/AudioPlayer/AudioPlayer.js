import ReactPlayer from "react-player";

import classes from "./AudioPlayer.module.scss";

const AudioPlayer = ({ episode }) => (
  <div className={classes.AudioPlayer}>
    <div className={classes.AudioPlayer__Title}>
      {episode.title}
      {console.log("E: ", episode)}
    </div>
    <ReactPlayer
      url={episode.enclosure.url}
      width="100%"
      height="50px"
      playing={true}
      controls={true}
    />
  </div>
);

export default AudioPlayer;
