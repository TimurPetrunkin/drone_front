import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import ServerData from "../../../api/api";
import cl from "../Card.module.css";

const VideoCard = (props) => {
  const navigate = useNavigate();
  const videoDate = props.videoData.split("_")[0];
  const videoTime = () => {
    let time = props.videoData.split("_")[1];
    time = time+":"+props.videoData.split("_")[2]
    return time.split(".")[0];
  };

  const videoClick = () => {
    if(props.onDelete){
        props.remove(props.videoData);
        const response = ServerData.deleteVideo(props.videoData)
    }else{
        navigate("/player", {
            state: {
              videoData: props.videoData,
            },
          });
    }
  };

  const animOn = () => {
    return props.onDelete ? cl.anim : "";
  };

  return (
    <Grid item xs={4}>
      <Card className={animOn()}>
        <CardActionArea onClick={videoClick}>
          <CardContent>
            <Typography component="h2" variant="h6" textAlign="center">
              Видеозапись
            </Typography>
            <Divider sx={{ my: 1 }} />
            <CardMedia sx={{ height: 140, mb: 1 }}>
              <ReactPlayer
                url={ServerData.getVideo(props.videoData)}
                width="100%"
                height="100%"
              />
            </CardMedia>
            <Typography component="p" variant="body1" textAlign="center">
              Дата записи {videoDate} {videoTime()}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

VideoCard.propTypes = {
  videoData: PropTypes.string,
  remove: PropTypes.func,
  onDelete: PropTypes.bool,
};

export default VideoCard;
