import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      photos: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getPhotosURLs = this.getPhotosURLs.bind(this);
  }

  componentDidMount() {
    this.getPhotosURLs();
  }

  getPhotosURLs() {
    $.get('/api/photos', (data) => {
      this.setState({photos: data});
    })
  }

  // submit the search to API
  handleSubmit(event) {
    console.log(event)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    console.log(this.state.photos);
    return (

      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Installations</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Search by brand, model or camera model name
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Go" />
          </form>
        </header>
        <p className="App-intro">
          {this.state.photos.map((photo)=>
            <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
          )}
        </p>
      </div>
    );
  }
}

export default App;
