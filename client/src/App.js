import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  handleChange = (e) =>{
    console.log("============file==>", e.target.files)
    this.setState({
      file: e.target.files[0]
    })
  }

  handleFileUpload = () => {

    console.log("===========name==>", this.state.file)

    let data = new FormData();
    data.append('file', this.state.file);
    data.append('name', this.state.file.name);
    
    axios.post('http://localhost:4000/files', data)
        .then(response => alert(response.data.url))
        .catch(error => alert("an error occured")); 

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="file" onChange={this.handleChange} />
        <button onClick={this.handleFileUpload}>Submit</button>
      </div>
    );
  }
}

export default App;
