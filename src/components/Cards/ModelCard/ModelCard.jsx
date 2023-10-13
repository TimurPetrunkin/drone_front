import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useLocation} from 'react-router-dom'

const ModelCard = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const setModel = () => {
      navigate("/model_settings", {state:{
        ...location.state,
        model:props.value,
      }})
  }

  return (
    <Grid item xs={4}>
        <Card>
        <CardActionArea  onClick={setModel} >
        <CardContent>
        <Typography component="h2" variant="h6" textAlign="center">
            {props.title}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography component="p" variant="body1" textAlign="center">
              {props.text}
        </Typography>
        </CardContent>
        </CardActionArea>
        </Card>
        </Grid>
  )
}


ModelCard.propTypes = {
  title:PropTypes.string,
  text:PropTypes.string,
  value:PropTypes.string,
}

export default ModelCard;