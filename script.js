const apiKey = 'd3c39f57206d5904890771c822ffaac3';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// captura del evento click
const boton = document.querySelector("button");
boton.addEventListener("click",()=> capturarCiudad());

// funcion para mostar los párametros climaticos de dicha ciudad
function capturarCiudad(){
    // capturamos el nombre de la ciudad
    const inCiudad = document.querySelector('input').value;
    // construción de la url para la ciudad dada
    const url = apiUrl + inCiudad + "&appid=" + apiKey;
    console.log(inCiudad)
    console.log(url);

    // Llamado a la función para consultar la Api
    const responseApi = ConsumirApiWithAxios(url);

    // Llamado a la función para para consumir la Api
    console.log(responseApi);
    getDatosApi(responseApi);
}

// función para consultar la Api, nos retorna una promesa
async function ConsumirApiWithAxios(url){

    //esconder error 
    const errorElement = document.querySelector(".error");
    errorElement.style.display = "none";

    try{
        const response = await axios.get(url);
        console.log(`la petición a la Api se completó correctamente: ${response.status}`);
        return await response.data;
    }
    catch(error){
        console.log(`Falló la peticion con error: ${error.message}`);
        document.querySelector('.weather').style.display = 'none';
        const errorElement = document.querySelector(".error");
        errorElement.style.display = "block";
    }
}

// Funcion para consumir la Api
async function getDatosApi(resp){
    const resApi = await resp;
    console.log(resApi);

    // Accseso a las variables requeridas
    // Clima-icono
    const weatherMain = resApi.weather[0].main;
    console.log( weatherMain);

    // Temperatura
    const tempMain = resApi.main.temp;
    console.log( tempMain);

    // humedad
    const humidityMain = resApi.main.humidity;
    console.log( humidityMain);

    // viento
    const windMain = resApi.wind.speed;
    console.log( windMain);

    // Name cyte
    const nameCity = resApi.name;
    console.log( nameCity);

    //mostrar parametros en la carta prinsipal
    document.querySelector('.weather').style.display = 'block';
    
    document.querySelector('.temp').textContent =`${tempMain}°C`;
    document.querySelector('.city').textContent = nameCity;
    document.querySelector('.humidity').textContent = `${humidityMain}%`;
    document.querySelector('.wind').textContent = `${windMain}km/h`;

    // Despliegue del Icono adecuado
    var weatherIcon = document.querySelector('.weather-icon');
    
    switch (weatherMain) {
        case "Clouds":
            weatherIcon.src = 'images/clouds.png';
          break;
        case "Clear":
            weatherIcon.src = 'images/clear.png';
          break;
        case "Rain":
            weatherIcon.src = 'images/rain.png';
            break;
        case "Drizzle":
            weatherIcon.src = 'images/drizzle.png';
            break;
        case "Mist":
            weatherIcon.src = 'images/mist.png';
            break;
        default:
            weatherIcon.src = 'images/rain.png';
      }
}