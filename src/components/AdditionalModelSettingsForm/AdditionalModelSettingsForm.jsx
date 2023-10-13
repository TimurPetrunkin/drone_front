import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const coefficients_conf = [
  0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7,
];
const coefficients_iou = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

const AdditionalModelSettingsForm = (props) => {
  const handleChange = (event) => {
    props.setDetectObject(event.target.value);
    setSelected((prev) => !prev);
  };
  const [selected, setSelected] = useState(false);

  const handler = (event) => {
    props.setModelSettings((prev) => {
      prev[event.target.name]= event.target.value;
      return prev
    });
  }

  return (
    <Box>
      <Typography component="h1" variant="h6" textAlign="center">
        Выбор объекта реагирования
      </Typography>
      <Box display="flex" justifyContent="center" sx={{ minWidth: 120, mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel color="secondary">Объект реагирования</InputLabel>
          <Select
            color="secondary"
            value={props.detectObject}
            label="Объект реагирования"
            onChange={handleChange}
          >
            {props.detectList.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.name_rus}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography component="h1" variant="h6" textAlign="center" sx={{ mt: 2 }}>
        Продвинутые настройки
      </Typography>
      <Box display="flex" justifyContent="space-between" flexDirection="column">
        <TextField
          name="conf"
          color="secondary"
          select
          label="Conf"
          defaultValue="0.35"
          helperText="Порог обнаружения объекта моделью"
          sx={{ mt: 3 }}
          onChange={handler}
        >
          {coefficients_conf.map((value, index) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="iou"
          color="secondary"
          select
          label="IoU"
          defaultValue="0.7"
          helperText="Пересечение порога объединения (IoU)"
          sx={{ mt: 3 }}
          onChange={handler}
        >
          {coefficients_iou.map((value, index) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="max_det"
          defaultValue="300"
          color="secondary"
          label="Максимум объектов на одном кадре"
          type="number"
          helperText="Максимальное количество объектов единовременно в кадре"
          sx={{ mt: 3 }}
          onChange={handler}
        />
        <TextField
          name="frame"
          defaultValue="5"
          color="secondary"
          label="Значение формирования фреймов"
          type="number"
          helperText="Параметр отвечает за количество распознанных кадров. Чем меньше значение тем плавнее. Значение 1 равно 30 кадрам в секунду"
          sx={{ mt: 3 }}
          onChange={(e)=>{
            props.setFrame(e.target.value)
          }}
        />
      </Box>
      <Box display="flex" justifyContent="space-evenly" sx={{ mt: 4 }}>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            props.setNext((prev) => !prev);
            props.setModelSettings({
              conf:0.35,
              iou:0.7,
              max_det:300
            });
          }}
          aria-label="Назад"
        >
          Назад
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={props.start}
          disabled={!selected}
          aria-label="Начать"
        >
          Начать
        </Button>
      </Box>
    </Box>
  );
};

AdditionalModelSettingsForm.propTypes = {
  detectList: PropTypes.array,
  setDetectObject: PropTypes.func,
  setModelSettings: PropTypes.func,
  setNext: PropTypes.func,
  modelSettings: PropTypes.object,
  setFrame:PropTypes.func,
  start:PropTypes.func,
  detectObject: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default AdditionalModelSettingsForm;
