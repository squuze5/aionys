import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Notes from './components/Notes';

class App extends React.Component {
  
  render() {
    return (
      <div className="App container">
        <Notes />
      </div>
    )
  }
}

export default App;
