import React , { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import './Home.css'
import Celsius from './Celsius';
import Fahrenheit from './Fahrenheit';
const Home = () => {
    const [city, setCity] = useState('');
    const [search,setSearch] = useState('');
    const [deg,setDeg] = useState(0);
    return (
      <div className="App">
        <h1>Weather App</h1>
        <div className='bar'>
          <div className='searchCont'>
            <input type="text" value={city} placeholder='Search city here' onChange={(e) => setCity(e.target.value)} />
            <button type='submit' onClick={(e)=>setSearch(city)}>
              <IoMdSearch />
            </button>
          </div>
          <div className='toggle'>
            <button className={deg === 0 ? 'active' : ''} onClick={(e)=>setDeg(0)}>Celsius Scale</button>
            <button className={deg === 1 ? 'active' : ''} onClick={(e)=>setDeg(1)}>Fahrenheit Scale</button>
          </div>
        </div>
        {search ? (
          <div className='home'>
            {deg ? (<Fahrenheit city={search}/>):(<Celsius city={search}/>)}
          </div>
        ) : (
          <p>Please enter a city to get weather information.</p>
        )}
      </div>
    );
}

export default Home