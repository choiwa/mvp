import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import Gallery from 'react-photo-gallery';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      photos: [],
      filteredPhotos: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getPhotosURLs = this.getPhotosURLs.bind(this);
    this.filterPhotos = this.filterPhotos.bind(this);
  }

  componentDidMount() {
    this.getPhotosURLs();
  }

  getPhotosURLs() {
    $.get('/api/photos', (data) => {
      var photoSet = [];
      console.log(data);

      data.map((photo, i) => {
        var randomWidth = Math.floor(Math.random() * Math.floor(2)) + 1;
        var randomHeight = Math.floor(Math.random() * Math.floor(2)) + 1;
        console.log(randomWidth)
        var imgSrc = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
        photoSet.push({
          src: imgSrc,
          width: 1,
          height: 1,
          title: photo.title,
        });

        this.setState({photos: photoSet});
        this.setState({filteredPhotos: []});
      });
    })
  }

  // submit the search to API
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value.length === 0) {
      this.getPhotosURLs();
      event.preventDefault();
    } else {
      this.filterPhotos(this.state.photos, this.state.value);
    }
    this.setState({value: ""});
  }

  filterPhotos(photos, keywords) {
    var filteredPhotos = [];

    for (let i = 0; i < photos.length; i++) {
      let photo = photos[i];

      if (photo.title.toLowerCase().includes(keywords.toLowerCase())) {
        filteredPhotos.push(photo);
      }
    }
    this.setState({filteredPhotos: filteredPhotos});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Installations</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              <span> Search by car brand, model, color or equipment name </span>
              <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="try toyota, white, touch screen, kenwood or reversing camera"/>
            </label>
            <span>
              <input type="submit" value="Go" />
              <input type="submit" value="All Images"/>
            </span>
          </form>
        </header>
        {this.state.filteredPhotos.length === 0 ? <p> {this.state.photos.length} image(s) selected</p> : <p> {this.state.filteredPhotos.length} image(s) selected</p>}

          {this.state.filteredPhotos.length === 0 ? <Gallery className="reloadFadeIn" photos={this.state.photos} /> : <Gallery className="reloadFadeIn" photos={this.state.filteredPhotos} />}
      </div>
    );
  }
}

export default App;
