const UnitsTypeKey = "unitsType";

class WidgetComponent extends React.Component {
    state = {
        units: {}
    }

    constructor(props) {
        super(props);

        const units = localStorage.getItem(UnitsTypeKey);
        const type = (units && units.type) || 'metric';

        this.state = { units: Units[type] };
    }

    onUnitsChanged = (newUnits) => {
        this.setState({ units: newUnits });
        localStorage.setItem(UnitsTypeKey, (newUnits == Units.metric ? 'metric' : 'imperial'))
    }

    render() {
        if (!this.props.data || !this.props.data.data) {
            return <div></div>;
        }
        const [today, ...restOfWeek] = this.props.data.data.weather;
        const maxTempProp = `maxtemp${this.state.units.temp}`;
        return <div>
            <Header onUnitsChanged={this.onUnitsChanged} units={this.state.units} weather={today} />
            <div className='today_container'>
                <div className='temprature'>{today[maxTempProp]}&#176;</div>
                <TodayDetailedInfo weather={today} units={this.state.units} />
            </div>
            <div className='week_title'>Week</div>
            <div className='seperator'></div>
            <WeekDaysLayout weather={restOfWeek} units={this.state.units} />
        </div>
    }
}

const Header = props => {
    const date = new Date();
    const weatherConditions = getWeatherCondition(props.weather, props.units);
    const celciusClass = props.units.temp == Units.metric.temp ? 'selectedButton' : 'notSelectedButton';
    const farenhietClass = props.units.temp == Units.imperial.temp ? 'selectedButton' : 'notSelectedButton';
    return (
        <div className='header'>
            <div className='title'>Haifa - Israel</div>
            <div className='units_buttons'>
                <button onClick={() => { props.onUnitsChanged(Units.metric) }} className={celciusClass}>{Units.metric.temp}</button>
                <button onClick={() => { props.onUnitsChanged(Units.imperial) }} className={farenhietClass}>{Units.imperial.temp}</button>
            </div>
            <div className='details'>{days[date.getDay()]} {date.getDate()} {months[date.getMonth()]} {`${date.getHours()}:${date.getMinutes()}`}</div>
            {/* <div>{getMostSevereWeatherCode(props.weather)}</div> */}
            <div className='today'>
                <img className='today_image' src={weatherConditions.imageSource}></img><span className='today_title'>{weatherConditions.title}</span>
            </div>
        </div>
    )
}

const TodayDetailedInfo = props => {
    const wavesHeight = getRange(props.weather, `swellHeight_${props.units.size}`);
    const humidity = getRange(props.weather, 'humidity');
    const chanceOfRain = getRange(props.weather, 'chanceofrain');
    const windSpeedProp = `windspeed${props.units.speed}`;
    const windSpeed = getRange(props.weather, windSpeedProp);
    return (
        <div className='today_details_container'>
            <DetailsInfo imageSource='./assets/StatIcon_Wind.svg' title={windSpeed.max + props.units.speedTitle} />
            <DetailsInfo imageSource='./assets/StatIcon_Direction.svg' title={getWindDirection(props.weather)} />
            <DetailsInfo imageSource='./assets/WeatherIcon_Swell.svg' title={wavesHeight.min} details={wavesHeight.max} />
            <DetailsInfo imageSource='./assets/StatIcon_Himi.svg' title={`${humidity.max}\%`} />
            <DetailsInfo imageSource='./assets/StatIcon_Rain.svg' title={`${chanceOfRain.max}\%`} />
        </div>)
}

const DetailsInfo = props => {
    const titleDetails = props.details ? ` - ${props.details}` : ''
    return (
        <div className='today_details'>
            <img src={props.imageSource}></img>
            <div>{props.title}{titleDetails}</div>
        </div>
    )
}

const WeekDaysLayout = props => {
    return (
        <div className='days_container'>
            {props.weather.map(weather => <WeekDayComponent key={weather.date} weather={weather} units={props.units} />)}
        </div>
    )
}

const WeekDayComponent = props => {
    const maxTempProp = `maxtemp${props.units.temp}`;
    const minTempProp = `mintemp${props.units.temp}`;

    const weatherCondition = getWeatherCondition(props.weather, props.units);
    return (
        <div className='day_of_week'>
            {/* <div>{getMostSevereWeatherCode(props.weather)}</div> */}
            <div className='day_title'>{days[new Date(props.weather.date).getDay()]}</div>
            <div className='day_icon'><img src={weatherCondition.imageSource}></img></div>
            <div className='day_details'>
                <div>{props.weather[maxTempProp]}&#176;</div>
                <div className='low'>{props.weather[minTempProp]}&#176;</div>
            </div>
        </div>);
}

function getWeatherCondition(weather, units) {
    const weatherCode = getMostSevereWeatherCode(weather);
    const windSpeedProp = `windspeed${units.speed}`;
    const windSpeed = getRange(weather, windSpeedProp);
    const maxSpeed = units == Units.metric ? windSpeed.max * 0.621371 : windSpeed.max;
    if (maxSpeed >= 25) {
        return WeatherConditions.Windy;
        // } else if (maxSpeed >= 15) {
        // return WeatherConditions.Breezy;
    }
    return WeatherConditions[weatherCode];
}

const QuerySearcher = {
    search: function (searchQuery) {

        return fetch(createQuery(searchQuery, 'marine')).then((response) => {
            return response.json();
        });
    }
}

function createQuery(searchQuery, api) {
    let getQuery = '';
    if (searchQuery.query) {
        getQuery = `https://api.worldweatheronline.com/premium/v1/${api}.ashx?key=0894c92fc9f949e3827133843191104&format=json&num_of_days=7&q=
                    ${searchQuery.query}`;
    } else if (searchQuery.location) {
        getQuery = `https://api.worldweatheronline.com/premium/v1/${api}.ashx?key=0894c92fc9f949e3827133843191104&format=json&num_of_days=7&q=
                    ${searchQuery.location.lat},
                    ${searchQuery.location.lon}`;
    }
    if (!getQuery) {
        return;
    }
    return getQuery;
}


// const QuerySearcher = {
//     search: function (searchQuery) {
//         let getQuery = '';
//         if (searchQuery.query) {
//             getQuery = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchQuery.query + '&appid=4b5c2816e4b0b19d58dc1511e8d35730&units=metric';
//         } else if (searchQuery.location) {
//             getQuery = 'https://api.openweathermap.org/data/2.5/weather?lat=' + searchQuery.location.lat + '&lon=' + searchQuery.location.lon + '&appid=4b5c2816e4b0b19d58dc1511e8d35730&units=metric';
//         }
//         if (!getQuery) {
//             return;
//         }

//         return fetch(getQuery).then((response) => {
//             return response.json();
//         });
//     }
// }