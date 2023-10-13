import React, {useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const BlockVision = props => {
    
  return (
    <Paper sx={{
        position:"fixed",
        bottom:"0",
        right:"0",
        width:250,
        height:150,
        backgroundColor: props.inFrame ? "#b52d28" : "#23941f",
      }} 
      elevation={5}>
        <Typography component="p" variant="h6" textAlign="center" sx={{
          margin:"auto",
          width:"60%",
          padding:3,
          color:"white"
        }}>
          {props.inFrame ? `Объект ${props.detect} обнаружен`: `Объект ${props.detect} не обнаружен`}
        </Typography>
      </Paper>
  )

}

BlockVision.propTypes = {
    inFrame : PropTypes.bool,
    detect : PropTypes.string
}

export default BlockVision