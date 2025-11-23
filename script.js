const API_KEY = 'YOUR_API_KEYS';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const nameCity = document.getElementById('name-city');
const temperature = document.getElementById('temperature');
const weatherDiscription = document.getElementById('weather-discription');
const weatherDetails = document.getElementById('weather-details');
const feel = document.getElementById('feel');
const pressure = document.getElementById('pressure');
const water = document.getElementById('water');
const wind = document.getElementById('wind');
async function getWeather(city) {
    try {
        const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Город не найден');
        }
        const data = await response.json();
        return data;
    }
        catch(error) {
        console.error('Ошибка:', error);
        alert('Не удалось получить данные о погоде. Проверьте название города.');
        return null;
        
        }
}
function showWeather(data) {
    nameCity.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDiscription.textContent = `${(data.weather[0].description)}`;
    feel.textContent = `${Math.round(data.main.feels_like)}°C`;
    pressure.textContent = `${Math.round(data.main.pressure)}гПа`;
    water.textContent = `${Math.round(data.main.humidity)}%`;
    wind.textContent = `${Math.round(data.wind.speed)}м/с`;
}
searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return alert('Введите название города');
    const weatherData = await getWeather(city);
    if (weatherData) showWeather(weatherData);
});
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});