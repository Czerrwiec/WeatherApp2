
export const getWeatherByCity = (city) => {
	return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=56cc15ea412dde439e138982af15aca1&units=metric`)
		.then((resp) => resp.json())
		.then(data => data)
};
