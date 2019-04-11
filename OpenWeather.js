const Results = props => {
    const weatherData = props.data;
    if (!weatherData || !weatherData.main) {
        return <div>N/A</div>
    }
    const icon = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const weather = weatherData.main;
    const weatherDescription = weatherData.weather[0].description;
    const placeName = weatherData.name;
    return <div>
        <div>Weather in: {placeName}</div>
        <img src={icon}></img>
        <div>Temprature: {weather.temp} deg</div>
        <div>{weatherDescription}</div>
    </div>
}

const QuerySearcher = {
    search: function(searchQuery) {
        let getQuery = '';
        if (searchQuery.query) {
            getQuery = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchQuery.query + '&appid=4b5c2816e4b0b19d58dc1511e8d35730&units=metric';
        } else if (searchQuery.location) {
            getQuery = 'https://api.openweathermap.org/data/2.5/weather?lat=' + searchQuery.location.lat + '&lon=' + searchQuery.location.lon + '&appid=4b5c2816e4b0b19d58dc1511e8d35730&units=metric';
        }
        if (!getQuery) {
            return;
        }

        return fetch(getQuery).then((response) => {
            return response.json();
    });
    }
}