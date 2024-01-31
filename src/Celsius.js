import Weather from "./Weather";
import Forecast from "./Forecast";
import { FaArrowDownLong } from "react-icons/fa6";
import './Screen.css';
import React from 'react'

const Celsius = ({city}) => {
  return (
    <div className="container">
        <div><Weather city={city}/></div>
        <FaArrowDownLong className="arrow"/>
        <div className="top"><Forecast city={city}/></div>
    </div>
  )
}

export default Celsius