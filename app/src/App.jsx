import React from 'react';
import PropTypes from 'prop-types';
import { Event } from 'react-socket-io';

class App extends React.Component {
  static contextTypes = {
    socket: PropTypes.object.isRequired
  }

  state = {
    name: '',
    points: 0,
    words: [],
    timeLeft: 0
  }
  
  onWords = (words) => {
    if(!words || !words.length){
      alert("There are no new new words");
    }
    else{
      console.log("Words in: ", words);
      this.setState({words});
    }
  }
  
  onTime = (timeLeft) => {
    console.log("Time in: ", timeLeft);
    this.setState({timeLeft});
  }

  render() {
    const { words, timeLeft } = this.state;
    return (
      <div id="mainApp">
        <Event event='words' handler={this.onWords} />
        <Event event='time' handler={this.onTime} />

        <div id="timeLeft">
          { timeLeft }
        </div>

        <div id="wordsList">
          { timeLeft > 0 && 
            words.map(w => <h1>{w}</h1>)
          }
          
          { timeLeft < 1 && 
            <div id="timeUp">
              <h1>Time's Up</h1>
              <p>Waiting for next Turn</p>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
