import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { Typography, Box, Button, Paper } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ServerData from "../api/api";
import TimeStampTable from "../components/TimeStampTable/TimeStampTable";
import BlockVision from "../components/BlockVision/BlockVision";
import { socket } from "../api/socket";

const ViewPage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [inFrame, setInFrame] = useState(false)
  const [detect, setDetect] = useState("")
  const [isConnected, setIsConnected] = useState(socket.connected);

  const end = async () => {
    const response = await ServerData.offCamera();
    navigate("/");
  };

  useEffect(() => {
    socket.connect()

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onRows(value) {
      setRows(previous => [...previous, value]);
    }

    function onScreen(value) {
      setDetect(value.name)
      setInFrame(value.onScreen)
    }

    socket.on('transcripts', onRows);
    socket.on('onScreen', onScreen);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('transcripts', onRows);
      socket.off('onScreen', onScreen);
    };
    
  }, []);
  
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography component="h1" variant="myh">
          <VisibilityIcon /> Распознавание
        </Typography>
        <Button variant="contained" onClick={end}>
          Завершить
        </Button>
      </Box>
        <Box sx={{ width: "100%", height: "100%", mt: 2 }}>
          <img
            key={Date.now()}
            src={ServerData.getStream()}
            alt="web camera"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      <Box sx={{
        mt:2
      }}>
        <TimeStampTable rows={rows}/>
      </Box>
      <BlockVision inFrame={inFrame} detect={detect}/>
    </Box>
  );
};

export default ViewPage;
