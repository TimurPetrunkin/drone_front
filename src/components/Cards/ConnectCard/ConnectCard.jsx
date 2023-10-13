import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate} from 'react-router-dom'
import cl from "../Card.module.css"
import ServerData from '../../../api/api'

const ConnectCard = props => {
  const navigate = useNavigate()
  const ConnectClick = () => {
      if(props.onDelete){
        props.remove(props.connect)
        const respone = ServerData.deleteConnect(props.connect);
      }else {
        navigate("/model", {state:props.connect})
      }
      
  }
  const animOn = () => {
    return props.onDelete ? cl.anim : ""
  }

  return (
    <Grid item xs={3}>
        <Card className={animOn()}>
        <CardActionArea  onClick={ConnectClick}>
        <CardContent>
        <Typography component="h2" variant="h6" textAlign="center">
            {props.connect.name} 
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography component="p" variant="body1" textAlign="center">
              {props.connect.link}
        </Typography>
        </CardContent>
        </CardActionArea>
        </Card>
        </Grid>
  )
}

ConnectCard.propTypes = {
  connect:PropTypes.object,
  onDelete:PropTypes.bool,
  remove:PropTypes.func
}

export default ConnectCard