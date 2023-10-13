import React, { useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Box, Button} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReactPlayer from 'react-player'
import ServerData from "../api/api";
import TimeStampTable from "../components/TimeStampTable/TimeStampTable";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";

const ViewPage = () => {
  const [rows, setRows] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [fetchRows, isRowsLoading] = useFetching(
    async () => {
      const path = location.state.videoData.split("mp4")[0]+"json"
      const response = await ServerData.getTranscript(path);
      setRows([...response.data]);
    }
  );
  
  useEffect(() => {
    fetchRows()
  }, []);
  if (location.state == undefined) {
    navigate("/");
  }
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography component="h1" variant="myh">
          <VisibilityIcon /> Просмотр записи
        </Typography>
        <Button variant="contained" component={Link} to="/videos">
          Назад
        </Button>
      </Box>
      <Box sx={{
        mt:2
      }}>
      <ReactPlayer url={ServerData.getVideo(location.state.videoData)} width='100%'
          height='100%'
          controls={true}/>
      </Box>
      {isRowsLoading ? <Loader/> :
      <Box sx={{
        mt:2
      }}>
        <TimeStampTable rows={rows}/>
      </Box>
      }
    </Box>
  );
};

export default ViewPage;
