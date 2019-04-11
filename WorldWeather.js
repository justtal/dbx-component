
const Results = props => {
    const data = parseResult(props.data);
    return <div>
        {/* <img src={icon}></img> */}
        <div>Humidity: {data.humidity}</div>
        <div>Swell height: {data.swellHeight}</div>
    </div>
}

function parseResult(data) {
    if (!data || !data.data) {
        return {};
    }
    const weather = data.data.weather[0];
    const hourly = weather.hourly[0];
    return {
        humidity: hourly.humidity,
        swellHeight: hourly.swellHeight_m
    };
}

const QuerySearcher = {
    search: function(searchQuery) {
        let getQuery = '';
        if (searchQuery.query) {
            getQuery = 'http://api.worldweatheronline.com/premium/v1/marine.ashx?key=0894c92fc9f949e3827133843191104&format=json&q=' + searchQuery.query
        } else if (searchQuery.location) {
            getQuery = 'http://api.worldweatheronline.com/premium/v1/marine.ashx?key=0894c92fc9f949e3827133843191104&format=json&q=' + searchQuery.location.lat + ',' + searchQuery.location.lon;
        }
        if (!getQuery) {
            return;
        }

        return fetch(getQuery).then((response) => {
            return response.json();
    });
    }
}