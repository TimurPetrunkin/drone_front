import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ConnectCard from "../components/Cards/ConnectCard/ConnectCard";
import { useFetching } from "../hooks/useFetching";
import ServerData from "../api/api";
import Loader from "../components/Loader/Loader";

const ConnectsPage = (props) => {
  const [connects, setConnects] = useState([]);
  const [onDelete, setOnDelete] = useState(false);
  const [fetchConnects, isConnectLoading] = useFetching(async () => {
    const response = await ServerData.getConnects();
    setConnects([...response.data]);
  });

  const removeConnect = (connect) => {
    setConnects(connects.filter(c => c.name !== connect.name))
  }

  useEffect(() => {
    fetchConnects();
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography component="h1" variant="myh">
          <FormatListBulletedIcon /> Выбор подключения
        </Typography>
        <Box>
        <Button component={Link} to="/new_connect" variant="contained" sx={{mr:2}}>
          Новое подключение
        </Button>
        {!onDelete ? 
        <Button onClick={()=>setOnDelete(true)}  variant="contained" color="error">
        Удалить подключение
      </Button>
      :
      <Button onClick={()=>setOnDelete(false)}   variant="contained">
          Отмена
        </Button>
      }
        </Box>
      </Box>
      {!isConnectLoading ? (
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: 2,
          }}
        >
          {connects.map((connect, index) => (
            <ConnectCard key={index} connect={connect} onDelete={onDelete} remove={removeConnect}/>
          ))}
        </Grid>
      ) : (
        <Box display="flex" justifyContent="center" sx={{ marginTop: 10 }}>
          <Loader/>
        </Box>
      )}
    </Box>
  );
};

export default ConnectsPage;
