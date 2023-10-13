import React, { useEffect, useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import DatasetIconDatasetIcon from "@mui/icons-material/Dataset";
import { useLocation, useNavigate } from "react-router-dom";
import ModelCard from "../components/Cards/ModelCard/ModelCard";
import ServerData from "../api/api";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/Loader/Loader";

const ModelPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [models, setModels] = useState([]);

  const [fetchModels, isModelLoading] = useFetching(
    async () => {
      const response = await ServerData.getModels();
      setModels([...response.data]);
    }
  );

  
  useEffect(() => {
    fetchModels();
  }, []);

  if (location.state == undefined) {
    navigate("/");
  }
  return (
    <Box>
      <Typography component="h1" variant="myh">
        <DatasetIconDatasetIcon /> Модель
      </Typography>
      {!isModelLoading ? <Grid
        container
        spacing={2}
        sx={{
          marginTop: 2,
        }}
      >
        {models.map((model, index) => (
          <ModelCard
            key={index}
            title={model.title}
            text={model.text}
            value={model.file}
          />
        ))}
      </Grid>
      : 
      <Box display="flex" justifyContent="center" sx={{ marginTop: 10 }}>
          <Loader/>
        </Box>
      }
    </Box>
  );
};

export default ModelPage;
