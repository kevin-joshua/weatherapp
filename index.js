const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".input");
const card = document.querySelector(".weatherdata")
const apikey = "e0548f46c88364f287990feeccba97bc";

weatherform.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityinput.value;

    if(city){
        try{
          const weatherdata = await getweatherdata(city);
          displayweather(weatherdata);
        }
        catch(error){
          console.log(error)
          displayerror(error)
        }
    }
    else{
      displayerror("PLEASE ENTER A CITY")
    }
});

async function getweatherdata(city){
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
  const response = await fetch(apiUrl);
  
  if(!response.ok){
    throw new Error("COULD NOT FETCH WEATHER DATA")
  }
  return await response.json();
  
}
function displayweather(data){
    const {name:city,
       main : {temp,humidity},
        weather: [{description,id}]} = data;
        card.textContent = ""
        card.style.display = "flex";
      
      celsius = temp - 273.15;
      celsius = celsius.toFixed(2)

      const cityDisplay = document.createElement("h1")
      const tempDisplay = document.createElement("p")
      const humidityDisplay = document.createElement("p")
      const descDisplay = document.createElement("p")
      const emoji = document.createElement("p")

      cityDisplay.textContent = city;
      card.appendChild(cityDisplay);
      cityDisplay.classList.add("cityname")
     tempDisplay.textContent = `${celsius}°C`
     tempDisplay.classList.add("tempDisplay");
     card.appendChild(tempDisplay)
     humidityDisplay.textContent =`Humidity:${ humidity}%`;
     humidityDisplay.classList.add("Humidity")
     card.appendChild(humidityDisplay);
     descDisplay.textContent = description;
     descDisplay.classList.add("descDisplay")
     card.appendChild(descDisplay)
    emoji.textContent = getweatheremoji(id);
    emoji.classList.add("Emoji");
      card.appendChild(emoji);
    
}
function getweatheremoji(id){
    switch(true){
      case(id>=200 && id<300):
       return "⛈️";
      case(id>=300 && id<600):
       return "🌧️"
      case(id>=600 && id<700):
       return "❄️"
      case(id>=700 && id<800):
       return "🌥️"
      case(id=== 800):
       return "☀️"
      case(id>=801 && id<810):
       return "☁️"
      default:
        return "⁉️";


    }
}
function displayerror(error){
    const errordisplay = document.createElement("p")
    errordisplay.textContent = error;
    errordisplay.classList.add("error")
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay)
}