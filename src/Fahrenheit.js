import Fweather from "./Fweather";
import Fforecast from "./Fforecast";
import { FaArrowDownLong } from "react-icons/fa6";
import './Screen.css';
import React from 'react'

const Fahrenheit = ({city}) => {
  return (
    <div className='container'>
        <div><Fweather city={city}/></div>
        <FaArrowDownLong className="arrow"/>
        <div className="top"><Fforecast city={city}/></div>
    </div>
  )
}

export default Fahrenheit;