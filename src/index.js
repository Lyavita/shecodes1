let now = new Date();
let dayName = ["Sunday", "Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Saturday"];
let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let dataTimeElem = document.getElementById("data-time");
let cityElem = document.getElementById("city");
let formRegion = document.getElementById("form-region");
let inputRegion = document.getElementById("input-region");
let tempCFunit = document.getElementById("temp-CF-unit");
let tempCurrentElem = document.querySelector("#temp-CF-value");
let switchTempCF = document.getElementById("weather-in-city-now-1");

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
		console.log(tempCurrent);
		// let tempCurrentElem = document.querySelector("#temp-CF-value");
		console.log(tempCurrentElem);
		tempCurrentElem.innerHTML = `${tempCurrent}`
		tempCFunit.innerHTML = `°C`
	}
}

function switchCF(event) {
    event.preventDefault();
      
    if (tempCFunit.innerHTML === "°C") {
        tempCFunit.innerHTML = "°F";
        tempCurrentElem.innerHTML = `${Math.round(tempCurrentElem.innerHTML * 9/5 + 32)}`;
    } else {
        tempCFunit.innerHTML = "°C";
        tempCurrentElem.innerHTML = `${Math.round((tempCurrentElem.innerHTML - 32)/1.8)}`;
    }
}