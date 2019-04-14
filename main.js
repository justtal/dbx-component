function SearchQuery(query, lat, lon) {
    return {
        query,
        location: {
            lat, lon
        }
    }
};
const SearchQueryKey = "searchQueryLatLon";

class Form extends React.PureComponent {
    state = {
      searchQuery: '32.819913, 34.998619'
    }

    handleSubmit = event => {
        event.preventDefault();
        const query = this.state.searchQuery;
        const splitForLocation = query.split(',');

        if (splitForLocation === query || !this.validGeoLocation(splitForLocation)) {
            this.props.onSubmit(SearchQuery(this.state.searchQuery));
        } else {
            this.props.onSubmit(SearchQuery(null, splitForLocation[0].trim(), splitForLocation[1].trim()));
        }
    }

    validGeoLocation(strArray) {
        if (!Array.isArray(strArray) || strArray.length != 2) {
            return false;
        }
        if (isNaN(strArray[0]) || isNaN(strArray[1])) { //  32.819913, 34.998619
            return false;
        }
        return true;
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

class App extends React.PureComponent {
    state = {
        data: {}
    }

    constructor(props) {
        super(props);

        const searchQueryStorage = localStorage.getItem(SearchQueryKey);
        let query;
        if (searchQueryStorage && searchQueryStorage.startsWith('{')) {
            query = JSON.parse(searchQueryStorage);
        }
        if (query) {
            this.search(query);
        }
    }

    search = (searchQuery) => {
        QuerySearcher.search(searchQuery).then ((json) => {
            this.setState({
                data: json
            })    
        });
    }

    onSearchClicked = (searchQuery) => {
        localStorage.setItem(SearchQueryKey, JSON.stringify(searchQuery));
        this.search(searchQuery);
    }

    render() {
        
        return <div>
            {this.renderFormIfRequired()}
            <WidgetComponent data={this.state.data}/>
        </div>
    }
    
    renderFormIfRequired = () => {
        const searchQueryStorage = localStorage.getItem(SearchQueryKey);
        if (searchQueryStorage && searchQueryStorage.startsWith('{')) {
            return;
        }

        return <Form onSubmit={this.onSearchClicked}/>
    }
}

const e = React.createElement;
const domContainer = document.querySelector('#dom_container');
ReactDOM.render(e(App), domContainer);