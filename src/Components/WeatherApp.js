import  {useEffect,useState} from 'react';
import WeatherUI from './WeatherUI';

const WeatherApp = () => {
    const [weather, setWeather] = useState({});

    const getweatherInfo = async ()=> {
      try {
       let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=nashik&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
       const data = await res.json();
       const { main:weather } = data.weather[0];
       const {temp,humidity} = data.main;
       const {speed} = data.wind;
       const {country} = data.sys;
       const {name,timezone} = data;
       const obj = {
         temp,humidity,speed,country,name,weather,timezone
       }
       setWeather(obj);
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      getweatherInfo();
    }, [])
    return (
        <div className="container vertical-center">
        <WeatherUI obj = { weather }/>
        </div>
    )
}

export default WeatherApp
