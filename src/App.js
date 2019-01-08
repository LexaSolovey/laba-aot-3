import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var data = require('./text.json'); 
const keyword_extractor = require("keyword-extractor");

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      extractedWords: '',
      selectedLanguage: 'russian'
    }
    document.title = "Keyword Extractor";
  }

  handleChooseText = (event) => {
    const id = event.target.attributes['id-of-comment'].value;
    const choosenText = data.find(item => item.id === Number(id));
    
    this.setState({ text: choosenText.text });
  }

  handleInnputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  } 

  extractWords = () => {
    const { text, selectedLanguage } = this.state;
    const extractionResult = keyword_extractor.extract(text,{
      language: selectedLanguage,
      remove_digits: true,
      return_changed_case:true,
      remove_duplicates: false
    });

    this.setState({ extractedWords: extractionResult.join(', ') })
  }

  render() {
    const { text, extractedWords } = this.state;

    return (
      <div className="App">
      <aside>
        <ul onClick={this.handleChooseText}>
          {data.map(({ name, id }) => (
            <li key={id} id-of-comment={id}>{name}</li>
          ))}
        </ul>
      </aside>
      <main>
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Keyword Extractor</h2>
          </header>
          <div>
            <select name="selectedLanguage" onChange={this.handleInnputChange}>
              <option value="russian">Russian</option>
              <option value="english">English</option>
              <option value="polish">Polish</option>
              <option value="german">German</option>
              <option value="spanish">Spanish</option>
            </select>
            <textarea name="text" rows={10} value={text} onChange={this.handleInnputChange}></textarea>
            <div>
              <button onClick={this.extractWords}>Extract</button>
            </div>
            <textarea rows={10} disabled value={extractedWords}></textarea>
          </div>
      </main>
      </div>
    );
  }
}

export default App;
