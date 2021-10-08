import  {useEffect,useState} from 'react';
import WeatherUI from './WeatherUI';

const WeatherApp = () => {
    const [weather, setWeather] = useState({});
    let t = false;
    const getweatherInfo = async (city)=> {
      try {
        city = city ? city : "pune"
       let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
       const data = await res.json();
       const { main:weather,icon } = data.weather[0];
       const {temp,humidity} = data.main;
       const {speed} = data.wind;
       const {country} = data.sys;
       const {name,timezone} = data;
       const obj = {
         temp,humidity,speed,country,name,weather,timezone,icon
       }
       setWeather(obj);
      } catch (error) {
        t=true;
        console.log(error);
        alert("please Enter Valid City")
      }
    }
  
    useEffect(() => {
      getweatherInfo();
    },[])
    return (
        <div className="container vertical-center">
        <WeatherUI obj = { weather } getWeatherData={getweatherInfo} t = {t}/>
        </div>
    )
}

export default WeatherApp
