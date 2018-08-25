import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // submit the search to API
  handleSubmit(event) {
    console.log(event)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    console.log(this.state.value);
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
          Hello world
        </p>
      </div>
    );
  }
}

export default App;
