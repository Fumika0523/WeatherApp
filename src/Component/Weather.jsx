import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Weather = () => {
    const inputRef  = useRef()
    const [weatherData, setWeatherData] = useState(false)
    console.log(weatherData)
    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":drizzle_icon,
        "03n":drizzle_icon,
        "04d":rain_icon,
        "04n":rain_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,
    }
    const search = async(city)=>{
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            console.log(url)
            const response = await fetch(url)
            const data = await response.json()

            if(!response.ok){
                alert(data.message)
                return
            }

            console.log(data.weather[0].icon)
            console.log(data.weather)
            console.log(clear_icon)
            const icon= allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
            humidity:data.main.humidity,
            tempreture:Math.floor(data.main.temp),
            windSpeed:data.wind.speed,
            location:data.name,
            icon:icon
            })

        } catch (error) {
            setWeatherData(false)
            console.error("Error in fetching weather data")
        }
    }
    useEffect(()=>{
        search("London")
    },[])

  return (
    <Container fluid className=' m-0 p-0 border-danger border app border-4'>
    <Row className='border-primary m-0  border-3' >
    <Col xs={11} sm={8} md={6} lg={4} className="mx-auto border-4  border-danger weather  d-flex flex-column align-items-center justify-content-center " 
    style={{padding:"30px 40px",borderRadius:"10px",placeSelf:"center"}}
    // style={{position:"relative",overflow:"hidden",,padding:"40px",borderRadius:"10px",transition:"fadeIn"}}
    >
        <div className="search-bar d-flex align-items-center gap-3 ">
            <input ref={inputRef} type="text" placeholder='Search' className='bg-light'/>
            <img src={search_icon} alt=""  onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
          <img src={weatherData.icon} alt="" className='weather-icon'/>
            {/* Temperature */}
          <p className='temperature'>{weatherData.tempreture}℃</p>
          {/* Location */}
          <p className='location'>{weatherData.location}</p>

            <div className="weather-data mx-auto ">
                <div className="col border-danger">
                    <img src={humidity_icon} alt="" />
                    <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                     </div>
                 </div>
                <div className="col border-danger ">
                    <img src={wind_icon}  alt="" />
                    <div>
                    <p>{weatherData.windSpeed}Km/h</p>
                    <span>Wind Speed</span>
                    </div>
            </div>
         </div>
        </>:
        <>
        </>
        }
     </Col>
    </Row>
    </Container>
  )
}

export default Weather