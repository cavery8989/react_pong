import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './redux/reducers/reducers';
import createLogger from 'redux-logger';
import {HotKeys} from 'react-hotkeys';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board'


const hotKeyMap = {
  paddleUp: 'up',
  paddleDown: 'down'
};
const logger = createLogger();
const store = createStore(
  reducer, applyMiddleware(logger)
);

class App extends Component {

  render() {
    const Styles = {
      display: 'flex',
      justifyContent: 'center'
    };

    return (
      <Provider store={store}>
        <HotKeys keyMap={hotKeyMap}>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h2>Welcome to Pong</h2>
            </div>
            <div style={Styles} className="container">
              <Board/>
            </div>
          </div>
        </HotKeys>
      </Provider>
    );
  }
}


export default App;
