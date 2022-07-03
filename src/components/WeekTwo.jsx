
import { useEffect, useState } from 'react';
import axios from 'axios';
import cloudImg from './imagenes/Cloud.png'

const EntregableSemana2 = () => {

    const [wheater, setWheater] = useState({});
    let [degree,setDegree]=useState(true)

    useEffect(() => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            const crd = pos.coords;

            setWheater({
                latitude: crd.latitude,
                longitude: crd.longitude
            })

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=14d0cc4474dd79a6e6352e4ec922768b`)
                .then(res => {
                    setWheater(res.data)
                    console.log(res.data)

                })


        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }, [])
let celcius=wheater.main?.temp-273.15
let fahrenheit=celcius*9/5+32

const changeDegree=()=>{
setDegree(!degree)
}

    return (

        <div className='card'>
            
            <div>
                <h1>Wheather app</h1>
                <h2>{wheater?.name} {wheater.sys?.country}</h2>
            </div>
            <div className='horizontal'>
                <div className='cardInside cloud'>
                    <img src={cloudImg} alt=""/>
                    <span>{degree? celcius +" °C":fahrenheit +" °F"}</span>
                </div>
                <div className='cardInside'>
                    <h2>{wheater.weather?.[0].description}</h2>
                    <ul>
                        <li>Wind speed: <span>{wheater.wind?.speed} m/s</span></li>
                        <li>Clouds: <span>{wheater.clouds?.all} %</span></li>
                        <li>Pressure: <span>{wheater.main?.pressure} hPa</span></li>
                    </ul>
                </div>
            </div>
            <br/>
            <button onClick={changeDegree}>Degrees °F/°C</button>
            <br/>
        </div>


    )
}
export default EntregableSemana2