import React, { useEffect, useState } from "react";
import { Typography, Box} from "@mui/material";
import DatasetIconDatasetIcon from "@mui/icons-material/Dataset";
import {useLocation, useNavigate } from "react-router-dom";
import ServerData from "../api/api";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/Loader/Loader";
import TransferList from "../components/TransferList/TransferList";
import AdditionalModelSettingsForm from "../components/AdditionalModelSettingsForm/AdditionalModelSettingsForm";


const ModelSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [modelClass, setModelClass] = useState([]);
  const [next, setNext] = useState(false);
  const [detectList, setDetectList] = useState([]);
  const [detectObject, setDetectObject] = useState("");
  const [frame, setFrame] = useState(5)
  const [modelSettings, setModelSettings] = useState({
    conf:0.35,
    iou:0.7,
    max_det:300
  });

  const [fetchModelClass, isModelClassLoading] = useFetching(async () => {
    const response = await ServerData.getModelClass(location.state.model);
    setModelClass([...response.data]);
  });

  const start = async () => {
    const data = {
      ...location.state,
      model_settings : modelSettings,
      frame:frame,
      detect_list: detectList.map((value)=>value.id - 1).sort(),
      detect_object:detectObject-1
    }
    const response = await ServerData.setParams(data);
    if (response.status === 200) {
      navigate("/view");
    } else {
      alert("Не удалось подключиться. Возврат на главную страницу")
      navigate("/")
    }
  }

  useEffect(() => {
    fetchModelClass();
  }, []);

  if (location.state == undefined) {
    navigate("/");
  }

  return (
    <Box>
      <Typography component="h1" variant="myh">
        <DatasetIconDatasetIcon /> Настройка модели
      </Typography>
      {!isModelClassLoading ? (
        !next ? (
          <TransferList
            list={modelClass}
            setNext={setNext}
            setDetectList={setDetectList}
          />
        ) : (
          <AdditionalModelSettingsForm
            detectList={detectList}
            setDetectObject={setDetectObject}
            setModelSettings={setModelSettings}
            setFrame={setFrame}
            detectObject={detectObject}
            modelSettings={modelSettings}
            setNext={setNext}
            start={start}
          />
        )
      ) : (
        <Box display="flex" justifyContent="center" sx={{ marginTop: 10 }}>
          <Loader />
        </Box>
      )}
    </Box>
  );
};

export default ModelSettings;
