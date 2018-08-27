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
      console.log(data);

      var photoSet = [];

      data.map((photo, i) => {
        var randomWidth = Math.floor(Math.random() * Math.floor(3)) + 1;
        var randomHeight = Math.floor(Math.random() * Math.floor(3)) + 1;
        var imgSrc = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
        photoSet.push({
          src: imgSrc,
          width: randomWidth,
          height: randomWidth,
          title: photo.title,
        });

        this.setState({photos: photoSet});
      });
    })
  }

  // submit the search to API
  handleSubmit(event) {
    event.preventDefault();
    console.log("im triggled")
    if (this.state.value.length === 0) {
      console.log("value's length === 0")
      this.getPhotosURLs();
      event.preventDefault();
    } else {
      console.log("im working")
      this.filterPhotos(this.state.photos, this.state.value);
    }

  }

  filterPhotos(photos, keywords) {
    var filteredPhotos = [];

    for (let i = 0; i < photos.length; i++) {
      let photo = photos[i];

      if (photo.title.includes(keywords)) {
        filteredPhotos.push(photo);
      }
    }

    console.log("filteredPhoto", filteredPhotos);
    this.setState({photos: filteredPhotos});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    console.log(this.state.photos);
    return (

      <div className="App">
        <header>
          <h1>Installations</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              <span> Search by brand, model or camera model name </span>

              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <span>
              <input type="submit" value="Go" />
            </span>
          </form>
        </header>
        <p>



          <Gallery photos={this.state.photos} />
        </p>
      </div>
    );
  }
}

export default App;
