let now = new Date();
let dayName = ["Sunday", "Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Saturday"];
let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let dataTimeElem = document.getElementById("data-time");
let cityElem = document.getElementById("city");
let formRegion = document.getElementById("form-region");
let inputRegion = document.getElementById("input-region");
let tempCFunit = document.querySelectorAll(".temp-CF-unit");
let tempCurrentElem = document.querySelector("#temp-CF-value");
let switchTempCF = document.getElementById("weather-in-city-now-1");
let iconElemMain = document.getElementById("icon-weather-main");
let description = document.getElementById("description");
let windNow = document.getElementById("wind-now");
let humidityNow = document.getElementById("humidity-now");
let forecastNow1 = document.getElementById("forecast-now1");
let forecastNow2 = document.getElementById("forecast-now2");
let forecastNow = document.getElementById("forecast");
let sss = document.getElementById("sss");

formRegion.addEventListener("submit", cityEnter);
switchTempCF.addEventListener("click", switchCF);

function checkHoursMinuts(value) {
	if (value < 10) {
		return value = "0" + value;
	} else {
		return value;
	}
}

dataTimeElem.innerHTML = `${dayName[now.getDay()]}, ${monthName[now.getMonth()]} ${now.getDate()}, ${checkHoursMinuts(now.getHours())}:${checkHoursMinuts(now.getMinutes())}`;

function cityEnter(event) {
    event.preventDefault();
    let cityCurrent = inputRegion.value;
	let apiKey = "29eb375fa9dacf6024b7749010f9cfe9";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityCurrent}&units=metric`;
    cityElem.innerHTML = `Weather in the ${inputRegion.value.split('')[0].toUpperCase()+inputRegion.value.slice(1)}`;
	axios.get(`${apiUrl}&appid=${apiKey}`)
		.then(showTemperature);

	function showTemperature(response) {
		console.log(response.data)
		let tempCurrent = Math.round(response.data.main.temp);
		
		tempCurrentElem.innerHTML = `${tempCurrent}`
		tempCFunit[0].innerHTML = `°C`;
		tempCFunit[1].innerHTML = `°C`;

		forecastNow1.innerHTML = Math.round(response.data.main.temp_min);
		forecastNow2.innerHTML = Math.round(response.data.main.temp_max);
		forecastNow.innerHTML = `Forecast `;
		sss.innerHTML = ` / `;
		description.innerHTML = response.data.weather[0].main;
		humidityNow.innerHTML = `${response.data.main.humidity}%`;
		windNow.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
		console.log(forecastNow1);
		console.log(forecastNow2);
		iconElemMain.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
		iconElemMain.setAttribute('alt', response.data.weather[0].description);
	}
}

function switchCF(event) {
    event.preventDefault();
      
    if (tempCFunit[0].innerHTML === "°C") {
		tempCFunit[0].innerHTML = "°F";
		tempCFunit[1].innerHTML = "°F";
		tempCurrentElem.innerHTML = Math.round(tempCurrentElem.innerHTML * 9 / 5 + 32);
		forecastNow1.innerHTML = Math.round(forecastNow1.innerHTML * 9 / 5 + 32);
		forecastNow2.innerHTML = Math.round(forecastNow2.innerHTML * 9 / 5 + 32);
    } else {
		tempCFunit[0].innerHTML = "°C";
	tempCFunit[1].innerHTML = "°C";
        tempCurrentElem.innerHTML = Math.round((tempCurrentElem.innerHTML - 32)/1.8);
    forecastNow1.innerHTML = Math.round((forecastNow1.innerHTML - 32)/1.8);
	    forecastNow2.innerHTML = Math.round((forecastNow2.innerHTML - 32)/1.8);
	}
}