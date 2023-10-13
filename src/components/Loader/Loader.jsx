import React from 'react'
import { ThreeCircles } from "react-loader-spinner";
const Loader = () => {
  return (
    <ThreeCircles
            height="200"
            width="200"
            color="#002855"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
  )
}


export default Loader