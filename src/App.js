import React, { Component } from 'react';
import Today from './components/today'
import History from './components/history'
import Header from './components/header'


class App extends Component {
  render() {
    return (
      <div>
        <Header />
         <Today /> 
         <History />
      </div>
    );
  }
}

export default App;
