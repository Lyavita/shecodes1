let now = new Date();
let dayName = ["Sunday", "Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Saturday"];
let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let dataTimeElem = document.getElementById("data-time");
let cityElem = document.getElementById("city");
let formRegion = document.getElementById("form-region");
let inputRegion = document.getElementById("input-region");

formRegion.addEventListener("submit", cityEnter);

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
		let tempCurrentElem = document.querySelector("#temp-CF-value");
		console.log(tempCurrentElem);
		tempCurrentElem.innerHTML = `${tempCurrent}°C`
	}
}