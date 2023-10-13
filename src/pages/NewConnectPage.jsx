import * as React from "react";
import {
  Typography,
  Box,
} from "@mui/material";
import LeakAdd from "@mui/icons-material/LeakAdd";
import ConnectForm from "../components/ConnectForm/ConnectForm";


 const NewConnectPage = () =>{
  return (
            <Box>
              <Typography component="h1" variant="myh">
              <LeakAdd/> Подключение 
              </Typography>
              <ConnectForm/>
            </Box>
  );
}
export default NewConnectPage;
