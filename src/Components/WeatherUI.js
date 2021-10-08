import React, {useState, useEffect} from 'react'
import moment from 'moment';
import 'moment-timezone';



const WeatherUI = ({ obj,getWeatherData}) => {
    const [weatherIcon,setWeatherIcon] = useState("./sunny.png")
    const [searchValue,setSearchValue] = useState("")
    const {
        temp,humidity,speed,country,name,weather,timezone,icon
      } = obj;

   

      var dec = moment().utc().utcOffset(timezone/60);
      const mom =dec.format('LT');

      const getDataAndSetValue = () =>{
        getWeatherData(searchValue);
        setSearchValue("");
      }


      useEffect(() => {
          setWeatherIcon(`http://openweathermap.org/img/wn/${icon}.png`)
      }, [icon])

    return (
        <div className="container-fluid ">
        <div className="row justify-content-center  ">
        <div className="col-12 col-md-4 col-sm-12 col-xs-12">
        <div className="form-inline input-group">
        <input className="form-control mr-sm-2 col-md-4" type="search"
         placeholder="Search" aria-label="Search"
         value = {searchValue} 
         onChange={(event)=>{ setSearchValue(event.target.value) }}
         onKeyPress = {(e) => {if(e.key ==="Enter") getDataAndSetValue() }}
         />
      <button className="btn btn-outline-success input-group-prepend col-md-4" 
      type="submit" onClick={()=>{getDataAndSetValue() }} >Search</button>
      </div>
      <br/>
        <div className="card p-4" style = {{"backgroundColor" : '#FFCB9A'}}>
        <div className="d-flex ">
            <h6 className="flex-grow-1">{name},{country}</h6>
            <h6>{ mom }</h6>
        </div>
        <div className="d-flex flex-column temp mt-5 mb-3 ">
            <h1 className="mb-0 font-weight-bold" id="heading"> {temp}&deg; C </h1> 
            <span className="small grey">{weather}</span>
        </div>
        <div className="d-flex">
        <div className="temp-details flex-grow-1">
            <p className="my-1"> <img src="https://i.imgur.com/B9kqOzp.png" height="17px" alt="wind-speed"/> 
            <span> {speed} km/h </span> </p>
            <p className="my-1"> <i className="fa fa-tint mr-2" aria-hidden="true"></i>
             <span> {humidity}% </span> </p>
            <p className="my-1"> <img src="https://i.imgur.com/wGSJ8C5.png" height="17px" alt="sunrise" />
             <span> 0.2h </span> </p>
        </div>
        <div > <img src={weatherIcon} width="100px" alt="weather-icon"/>  </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default WeatherUI
