import { getWeatherByCity } from './apiService.js';

const viewElems = {};

const getDOMElem = (id) => {
	return document.getElementById(id);
};

const connectHTMLElems = () => {
	viewElems.mainContainer = getDOMElem('mainContainer');
	viewElems.weatherSearchView = getDOMElem('weatherSearchView');
	viewElems.weatherForecastView = getDOMElem('weatherForecastView');

	viewElems.searchInput = getDOMElem('searchInput');
	viewElems.searchButton = getDOMElem('searchButton');
	viewElems.weatherCityContainer = getDOMElem('weatherCityContainer');

	viewElems.weatherCity = getDOMElem('weatherCity');
	viewElems.weatherIcon = getDOMElem('weatherIcon');

	viewElems.weatherCurrentTemp = getDOMElem('weatherCurrentTemp');
	viewElems.weatherMaxTemp = getDOMElem('weatherMaxTemp');
	viewElems.weatherMinTemp = getDOMElem('weatherMinTemp');

	viewElems.returnToSearchBtn = getDOMElem('returnToSearchBtn');
};

const setupListeners = () => {
	viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
	viewElems.searchButton.addEventListener('click', onClickSubmit);
	viewElems.returnToSearchBtn.addEventListener('click', returnToSearch);
};

const initializeApp = () => {
	connectHTMLElems();
	setupListeners();
};

const onEnterSubmit = (event) => {
	if (event.key === 'Enter') {
		fadeInOut();
		let input = viewElems.searchInput.value;
		getWeatherByCity(input).then((data) => {
			displayWeatherData(data);
		});
	}
};

const onClickSubmit = () => {
	fadeInOut();
	let input = viewElems.searchInput.value;
	getWeatherByCity(input).then((data) => {
		displayWeatherData(data);
	});
};

const fadeInOut = () => {
	if (
		viewElems.mainContainer.style.opacity === '0.9' ||
		viewElems.mainContainer.style.opacity === ''
	) {
		viewElems.mainContainer.style.opacity = '0';
	} else if ((viewElems.mainContainer.style.opacity = '0')) {
		viewElems.mainContainer.style.opacity = '0.9';
	}
};

const switchView = () => {
	if (viewElems.weatherSearchView.style.display !== 'none') {
		viewElems.weatherSearchView.style.display = 'none';
		viewElems.weatherForecastView.style.display = 'block';
	} else {
		viewElems.weatherForecastView.style.display = 'none';
		viewElems.weatherSearchView.style.display = 'flex';
	}
};

const returnToSearch = () => {
	fadeInOut();

	setTimeout(() => {
		switchView();
		fadeInOut();
	}, 400);
	viewElems.searchInput.value = '';
};

const displayWeatherData = (data) => {
	setTimeout(() => {
		switchView();
		fadeInOut();
	}, 400);

	viewElems.weatherCity.textContent = data.name;
	viewElems.weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
	viewElems.weatherIcon.alt = data.weather[0].description

	viewElems.weatherCurrentTemp.textContent = `Current temp: ${data.main.temp.toFixed(1)}°C`
	viewElems.weatherMaxTemp.textContent = `Max temp: ${data.main.temp_max.toFixed(1)}°C`
	viewElems.weatherMinTemp.textContent = `Min temp: ${data.main.temp_min.toFixed(1)}°C`
};

document.addEventListener('DOMContentLoaded', initializeApp);
