import ReactPlayer from "react-player";

import classes from "./AudioPlayer.module.scss";

const AudioPlayer = ({ episode, clearSelection }) => (
  <div className={classes.AudioPlayer}>
    <div className={classes.AudioPlayer__Top}>
      <div className={classes.AudioPlayer__Top__Title}>{episode.title}</div>
      <div onClick={() => clearSelection()}>X</div>
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
