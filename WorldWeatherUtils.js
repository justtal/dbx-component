
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const Units = {
    metric: {
        type: 'metric',
        temp: 'C',
        size: 'm',
        speed: 'Kmph',
        speedTitle: 'km/h'
    },
    imperial: {
        type: 'imperial',
        temp: 'F',
        size: 'ft',
        speed: 'Miles',
        speedTitle: 'mp/h'
    }
}
function WeatherInfo(imageSource, title) {
    return {
        imageSource,
        title
    }
}

const WeatherConditions = {
    Breezy: WeatherInfo('./assets/WeatherIcon_Sun.svg', 'Breezy'),
    Windy: WeatherInfo('./assets/StatIcon_Wind.svg', 'Windy'),
    113: WeatherInfo('./assets/WeatherIcon_Sun.svg', 'Sunny'),
    116: WeatherInfo('./assets/WeatherIcon_SunCloud.svg', 'Partly cloudy'),
    119: WeatherInfo('./assets/WeatherIcon_Cloud.svg', 'Cloudy'),
    122: WeatherInfo('./assets/WeatherIcon_Cloud.svg', 'Overcast'),
    143: WeatherInfo('./assets/WeatherIcon_Cloud.svg', 'Mist'),
    176: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Patchy rain possible'),
    179: WeatherInfo('./assets/WeatherIcon_SunCloud.svg', 'Patchy snow possible'),
    182: WeatherInfo('./assets/WeatherIcon_SunCloud.svg', 'Patchy sleet possible'),
    185: WeatherInfo('./assets/WeatherIcon_SunCloud.svg', 'Patchy freezing drizzle possible'),
    200: WeatherInfo('./assets/WeatherIcon_SunCloud.svg', 'Thundery outbreaks possible'),
    227: WeatherInfo('./assets/WeatherIcon_SunCloud.svg', 'Blowing snow'),
    230: WeatherInfo('./assets/WeatherIcon_SunCloud.svg', 'Blizzard'),
    248: WeatherInfo('./assets/WeatherIcon_SunCloud.svg', 'Fog'),
    260: WeatherInfo('./assets/WeatherIcon_SunCloud.svg', 'Freezing fog'),
    263: WeatherInfo('./assets/WeatherIcon_SunCloud.svg', 'Patchy light drizzle'),
    266: WeatherInfo('./assets/WeatherIcon_SunCloud.svg', 'Light drizzle'),
    281: WeatherInfo('./assets/WeatherIcon_SunCloud.svg', 'Freezing drizzle'),
    284: WeatherInfo('./assets/WeatherIcon_SunCloud.svg', 'Heavy freezing drizzle'),
    293: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Patchy light rain'),
    296: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Light rain'),
    299: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Moderate rain at times'),
    302: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Moderate rain'),
    305: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Heavy rain at times'),
    308: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Heavy rain'),
    311: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Light freezing rain'),
    395: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Moderate or heavy snow'),
    392: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Patchy light snow'),
    389: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Moderate or heavy rain'),
    386: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Patchy light rain'),
    377: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Light showers'),
    374: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Light showers of ice pellets'),
    371: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Moderate or heavy snow showers'),
    368: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Light snow showers'),
    365: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Moderate or heavy sleet showers'),
    362: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Light sleet showers'),
    359: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Torrential rain shower'),
    356: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Moderate or heavy rain shower'),
    353: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Light rain shower'),
    350: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Ice pellets'),
    338: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Heavy snow'),
    335: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Patchy heavy snow'),
    332: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Moderate snow'),
    329: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Patchy moderate snow'),
    326: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Light snown'),
    323: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Patchy light snow'),
    320: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Moderate or heavy sleet'),
    317: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Light sleet'),
    314: WeatherInfo('./assets/WeatherIcon_Rain.svg', 'Moderate or Heavy freezing rain'),
}
const HOUR_TO_SHOW = 3;

function getMostSevereWeatherCode(weather) {
    const hourly = weather.hourly;
    let mostSevereWeatherCode = 0;
    hourly.forEach(hour => {
        if (hour.weatherCode > mostSevereWeatherCode) {
            mostSevereWeatherCode = hour.weatherCode;
        }
    });

    return mostSevereWeatherCode;
}

function getRange(weather, propName) {
    const hourly = weather.hourly;
    let min = 1000;
    let max = 0;
    hourly.forEach(hour => {
        min = Math.min(hour[propName], min);
        max = Math.max(hour[propName], max);
    });

    return {
        min,
        max
    }
}

function getWindDirection(weather) {
    const hourly = weather.hourly;
    return hourly[HOUR_TO_SHOW].winddir16Point;
}
