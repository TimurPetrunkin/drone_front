import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ServerData from "../../api/api";

const ConnectForm = () => {
  const [auth, setAuth] = useState(false);
  const [save, setSave] = useState(false);
  const [link, setLink] = useState("");
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLinkFormValidate, setIsLinkFormValidate] = useState(false)
  const [isLoginFormValidate, setIsLoginFormValidate] = useState(false)
  const [isPasswordFormValidate, setIsPasswordFormValidate] = useState(false)
  const [isNameFormValidate, setIsNameFormValidate] = useState(false)
  const matches = useMediaQuery('(max-width:683px)');
  const navigate = useNavigate();

  const validate = () => {
    if (link != ""){
      setIsLinkFormValidate(false)
    } else {
      setIsLinkFormValidate(true)
    }
    if (auth){
      if (login != ""){
        setIsLoginFormValidate(false)
      } else {
        setIsLoginFormValidate(true)
      }
      if (password != ""){
        setIsPasswordFormValidate(false)
      } else {
        setIsPasswordFormValidate(true)
      }
      if (save){
        if(name !=""){
          setIsNameFormValidate(false)
        }
        else{
          setIsNameFormValidate(true)
        }
      }
    }
  }

  const FormSubmit = e => {
    e.preventDefault();
    if((!isLinkFormValidate&&!auth)||(!isLinkFormValidate&&!isLoginFormValidate&&!isPasswordFormValidate)){
      if(!isNameFormValidate&&save){ 
        const response = ServerData.saveConnect({
          link,
          login,
          name,
          password,
          auth,
        })
      }
      navigate("/model", {state:{link,login,password,auth}})
    }
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      display="flex"
      justifyContent="center"
      sx={{
        marginTop: 3,
      }}
      onSubmit={FormSubmit}
    >
      <Box>
        <Typography component="h1" variant="h6" textAlign="center">
          Введите адрес RTSP устройства наблюдения
        </Typography>
        <Box
          sx={{
            paddingX: 5,
            marginTop: 2,
          }}
        >
          <TextField
            color="secondary"
            fullWidth
            id="link"
            variant="outlined"
            label="Адрес устройства"
            helperText={isLinkFormValidate && "Введите адрес"}
            value={link}
            onChange={e => {setIsLinkFormValidate(false);setLink(e.target.value)}}
            error={isLinkFormValidate}
          />
        </Box>
        <FormGroup>
        <FormControlLabel
          control={<Switch defaultValue={false} color="secondary" onChange={()=>{setAuth(!auth)}} />}
          label="Авторизация"
        />
        <FormControlLabel
          control={<Switch defaultValue={false} color="secondary"  onChange={()=>{setSave(!save)}}/>}
          label="Сохранить подключение"
        />
        </FormGroup>
        {auth && <Box>
          <Typography component="h1" variant="h6" textAlign="center">
            Авторизация
          </Typography>
          <Box
            sx={{
              paddingX: 5,
              marginTop: 2,
            }}
          >
            <TextField
              color="secondary"
              id="login"
              variant="outlined"
              label="Логин"
              sx={{
                marginRight:2,
              }}
              value={login}
              onChange={e=>{setIsLoginFormValidate(false);setLogin(e.target.value)}}
              helperText={isLoginFormValidate && "Введите логин"}
              error={isLoginFormValidate}
              fullWidth={matches}
            />
            <TextField
              color="secondary"
              id="password"
              variant="outlined"
              label="Пароль"
              sx={{
                marginTop:{
                  xs:2,
                  sm:0
                }
              }}
              value={password}
              onChange={e=>{setIsPasswordFormValidate(false);setPassword(e.target.value)}}
              helperText={isPasswordFormValidate && "Введите пароль"}
              error={isPasswordFormValidate}
              fullWidth={matches}
            />
          </Box>
        </Box>}
        {save && <Box>
          <Typography component="h1" variant="h6" textAlign="center">
            Название подключения
          </Typography>
          <Box
            sx={{
              paddingX: 5,
              marginTop: 2,
            }}
          >
            <TextField
              color="secondary"
              id="name"
              variant="outlined"
              label="Название"
              value={name}
              onChange={e=>{setIsNameFormValidate(false);setName(e.target.value)}}
              helperText={isNameFormValidate && "Введите название"}
              error={isNameFormValidate}
              fullWidth
            />
          </Box>
        </Box>}
        <Box
          display="flex"
          justifyContent="center"
          sx={{
            paddingX: 16,
            marginTop: 2,
          }}
        >
          <Button type="submit" variant="contained" sx={{width:100}} onClick={validate} color="secondary">
            Далее
          </Button>
        </Box>
      </Box>
    </Box>
  );
};


export default ConnectForm;
