import { getWeatherByCity } from './apiService.js';
import { mapListToDOMElements } from './DOMActions.js';

class WeatherApp {
	constructor() {
		this.viewElems = {};
		this.connectDOMElements();
		this.setupListeners();
	}

	connectDOMElements = () => {
		const listOfIds = Array.from(document.querySelectorAll('[id]')).map(
			(elem) => elem.id
		);
		this.viewElems = mapListToDOMElements(listOfIds);
	};

	setupListeners = () => {
		this.viewElems.searchInput.addEventListener('keydown', this.handleSubmit);
		this.viewElems.searchButton.addEventListener('click', this.handleSubmit);
		this.viewElems.returnToSearchBtn.addEventListener(
			'click',
			this.returnToSearch
		);
	};

	handleSubmit = () => {
		if (event.type === 'click' || event.key === 'Enter') {
			this.fadeInOut();
			let input = this.viewElems.searchInput.value;
			if (this.viewElems.searchInput.value == '') {
				input = 'New York';
			}
			getWeatherByCity(input).then((data) => {
				this.displayWeatherData(data);
			})
		}
	};

	fadeInOut = () => {
		if (
			this.viewElems.mainContainer.style.opacity === '0.9' ||
			this.viewElems.mainContainer.style.opacity === ''
		) {
			this.viewElems.mainContainer.style.opacity = '0';
		} else if ((this.viewElems.mainContainer.style.opacity = '0')) {
			this.viewElems.mainContainer.style.opacity = '0.9';
		}
	};

	switchView = () => {
		if (this.viewElems.weatherSearchView.style.display !== 'none') {
			this.viewElems.weatherSearchView.style.display = 'none';
			this.viewElems.weatherForecastView.style.display = 'block';
		} else {
			this.viewElems.weatherForecastView.style.display = 'none';
			this.viewElems.weatherSearchView.style.display = 'flex';
		}
	};

	returnToSearch = () => {
		this.fadeInOut();

		setTimeout(() => {
			this.switchView();
			this.fadeInOut();
		}, 400);
		this.viewElems.searchInput.value = '';
	};

	displayWeatherData = (data) => {
		setTimeout(() => {
			this.switchView();
			this.fadeInOut();
		}, 400);

		const iconURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

		this.viewElems.weatherCity.textContent = data.name;
		this.viewElems.weatherIcon.src = iconURL
		this.viewElems.weatherIcon.alt = data.weather[0].description;

		const temp = data.main.temp.toFixed(1);
		const tempMax = data.main.temp_max.toFixed(1);
		const tempMin = data.main.temp_min.toFixed(1);

		this.viewElems.weatherCurrentTemp.textContent = `Current temp: ${temp}°C`;
		this.viewElems.weatherMaxTemp.textContent = `Max temp: ${tempMax}°C`;
		this.viewElems.weatherMinTemp.textContent = `Min temp: ${tempMin}°C`;
	};
}

document.addEventListener('DOMContentLoaded', new WeatherApp());
