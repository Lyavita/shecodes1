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

let days5names = [];
let days5date = [];
let days5month = [];

for (i = 0; i < 6; i++) {
	let dayNext = now.getDay() + i;
	if (dayNext >= 7) {
		dayNext = dayNext - 7;
	};
	days5names[i] = dayNext;

	let date = new Date();
	date.setDate(date.getDate() + i);
	days5date[i] = `${date.getDate()}`;
	days5month[i] = `${monthName[date.getMonth()]}`;
}
day1.textContent = `${dayName[days5names[1]]}`;
day2.textContent = `${dayName[days5names[2]]}`;
day3.textContent = `${dayName[days5names[3]]}`;
day4.textContent = `${dayName[days5names[4]]}`;
day5.textContent = `${dayName[days5names[5]]}`;

date1.textContent = `${days5date[1]}`;
date2.textContent = `${days5date[2]}`;
date3.textContent = `${days5date[3]}`;
date4.textContent = `${days5date[4]}`;
date5.textContent = `${days5date[5]}`;

month1.textContent = `${days5month[1]}`;
month2.textContent = `${days5month[2]}`;
month3.textContent = `${days5month[3]}`;
month4.textContent = `${days5month[4]}`;
month5.textContent = `${days5month[5]}`;

function cityEnter(event) {
	event.preventDefault();
	let cityCurrent = inputRegion.value;
	let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityCurrent}&units=metric`;
	cityElem.innerHTML = `Weather in the ${inputRegion.value.split('')[0].toUpperCase()+inputRegion.value.slice(1)}`;
	axios.get(`${apiUrl}&appid=${apiKey}`)
		.then(showTemperature);

	function showTemperature(response) {
		console.log(response);
		let lon = response.data.coord.lon;
		let lat = response.data.coord.lat;
		console.log(lon);
		console.log(lat);
		let apiUrl1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric`;
		let apiKey1 = `5f472b7acba333cd8a035ea85a0d4d4c`;
		axios.get(`${apiUrl1}&appid=${apiKey1}`)
			.then(forecast);

		function forecast(response) {
			console.log(response);
			let iconsFor5daysSrc = [];
			let iconsFor5daysAlt = [];
			let tempFor5days = [];
			for (i = 0; i < 6; i++) {
				iconsFor5daysSrc[i] = `http://openweathermap.org/img/wn/${response.data.daily[i].weather[0].icon}@2x.png`;
				iconsFor5daysAlt[i] = `${response.data.daily[i].weather[0].description}`;
				tempFor5days[i] = `${Math.round(response.data.daily[i].temp.day)}`;
			}
			icon1.setAttribute('src', iconsFor5daysSrc[0]);
			icon2.setAttribute('src', iconsFor5daysSrc[1]);
			icon3.setAttribute('src', iconsFor5daysSrc[2]);
			icon4.setAttribute('src', iconsFor5daysSrc[3]);
			icon5.setAttribute('src', iconsFor5daysSrc[4]);

			icon1.setAttribute('alt', iconsFor5daysAlt[0]);
			icon2.setAttribute('alt', iconsFor5daysAlt[1]);
			icon3.setAttribute('alt', iconsFor5daysAlt[2]);
			icon4.setAttribute('alt', iconsFor5daysAlt[3]);
			icon5.setAttribute('alt', iconsFor5daysAlt[4]);

			temp1CFvalue.textContent = `${tempFor5days[0]}`;
			temp2CFvalue.textContent = `${tempFor5days[1]}`;
			temp3CFvalue.textContent = `${tempFor5days[2]}`;
			temp4CFvalue.textContent = `${tempFor5days[3]}`;
			temp5CFvalue.textContent = `${tempFor5days[4]}`;
		}

		tempCurrentElem.innerHTML = Math.round(response.data.main.temp);
		for (i = 0; i < tempCFunit.length; i++) {
			tempCFunit[i].innerHTML = `°C`;
		}
		forecastNow1.innerHTML = Math.round(response.data.main.temp_min);
		forecastNow2.innerHTML = Math.round(response.data.main.temp_max);
		forecast.innerHTML = `Forecast `;
		sss.innerHTML = ` / `;
		description.innerHTML = response.data.weather[0].description;
		humidityNow.innerHTML = `humidity ${response.data.main.humidity}%`;
		windNow.innerHTML = `wind ${Math.round(response.data.wind.speed)}km/h`;
		iconElemMain.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
		iconElemMain.setAttribute('alt', response.data.weather[0].description);
	}
}

function switchCF(event) {
	event.preventDefault();
	if (tempCFunit[0].innerHTML === "°C") {
		for (i = 0; i < tempCFunit.length; i++) {
			tempCFunit[i].innerHTML = "°F";
		}
		tempCurrentElem.innerHTML = Math.round((tempCurrentElem.innerHTML * 9 / 5 + 32));
		forecastNow1.innerHTML = Math.round(forecastNow1.innerHTML * 9 / 5 + 32);
		forecastNow2.innerHTML = Math.round(forecastNow2.innerHTML * 9 / 5 + 32);
		temp1CFvalue.textContent = Math.round((temp1CFvalue.textContent * 9 / 5 + 32));
		temp2CFvalue.textContent = Math.round((temp2CFvalue.textContent * 9 / 5 + 32));
		temp3CFvalue.textContent = Math.round((temp3CFvalue.textContent * 9 / 5 + 32));
		temp4CFvalue.textContent = Math.round((temp4CFvalue.textContent * 9 / 5 + 32));
		temp5CFvalue.textContent = Math.round((temp5CFvalue.textContent * 9 / 5 + 32));
	} else {
		for (i = 0; i < tempCFunit.length; i++) {
			tempCFunit[i].innerHTML = "°C";
		}
		tempCurrentElem.innerHTML = Math.round((tempCurrentElem.innerHTML - 32) / 1.8);
		forecastNow1.innerHTML = Math.round((forecastNow1.innerHTML - 32) / 1.8);
		forecastNow2.innerHTML = Math.round((forecastNow2.innerHTML - 32) / 1.8);
		temp1CFvalue.textContent = Math.round(((temp1CFvalue.textContent - 32) / 1.8));
		temp2CFvalue.textContent = Math.round(((temp2CFvalue.textContent - 32) / 1.8));
		temp3CFvalue.textContent = Math.round(((temp3CFvalue.textContent - 32) / 1.8));
		temp4CFvalue.textContent = Math.round(((temp4CFvalue.textContent - 32) / 1.8));
		temp5CFvalue.textContent = Math.round(((temp5CFvalue.textContent - 32) / 1.8));
	}
}