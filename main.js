const input_id = "input_field";

// const InputField = props => {
//     return <input placeholder='Location to seek'></input>
// }
// const SearchButton = props => {
//     return <button onClick={props.submitSearch}>Search</button>
// }

const SearchQueryKey = "searchQuery";

class Form extends React.PureComponent {
    state = {
      searchQuery: ''
    }

    constructor(props) {
        super(props);
    }
  
    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.searchQuery);
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text"
            value={this.state.searchQuery}
            onChange={event => this.setState({searchQuery: event.target.value})}
            placeholder="Location search"
            required
            />
          <button>Search</button>
        </form>
      )
    }
  }

const Results = props => {
    const {weatherData} = props;
    if (!weatherData || !weatherData.main) {
        return <div>N/A</div>
    }
    const icon = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const weather = weatherData.main;
    const weatherDescription = weatherData.weather[0].description;
    return <div>
        <img src={icon}></img>
        <div>Temprature: {weather.temp} deg</div>
        <div>{weatherDescription}</div>
    </div>
}

class App extends React.PureComponent {
    state = {
        weatherData: {}
    }

    constructor(props) {
        super(props);
        const query = localStorage.getItem(SearchQueryKey);
        if (query) {
            this.search(query);
        }
    }

    search = (searchQuery) => {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + searchQuery + '&appid=4b5c2816e4b0b19d58dc1511e8d35730&units=metric') // lat=35&lon=139&
        .then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
                weatherData: json
            })    
        });
    }

    onSearchClicked = (searchQuery) => {
        localStorage.setItem(SearchQueryKey, searchQuery);
        this.search(searchQuery);
    }

    render() {
        return <div>
            <Form onSubmit={this.onSearchClicked}/>
                {/* <InputField/><SearchButton onClick={this.onSearchClicked}/> */}
                <Results weatherData={this.state.weatherData}/>
            </div>        
    }
}

const e = React.createElement;
const domContainer = document.querySelector('#dom_container');
ReactDOM.render(e(App), domContainer);