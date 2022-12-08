const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=56cc15ea412dde439e138982af15aca1';
const API_UNITS = '&units=metric';



export const getWeatherByCity = (city) => {
	const URL = API_LINK + city + API_KEY + API_UNITS;
	return fetch(URL)
		.then((resp) => resp.json())
		.then(data => data)
};
