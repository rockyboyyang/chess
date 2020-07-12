import React, { useState, useEffect, useRef } from 'react';
import Login from './components/Login';
import GuestMenu from './components/GuestMenu'
import GameBoard from './components/GameBoard'
import Home from './components/Home'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import readyUpChessBoard from './assets/squaresArray'

function App() {
  const [turn, changeTurn] = useState('white')
  // console.log(turn, 'll')
  const [gameStatus, setGameStatus] = useState('PLAYING')
  const squares = readyUpChessBoard();
  const [playerName, setPlayerName] = useState('');
  const [match, setMatch] = useState(null)
  const [gameBoard, setGameBoard] = useState(squares)
  // console.log('App',gameBoard.slice(48, 56).includes('null'))
  const webSocket = useRef(null)
  useEffect(() => {
    if(!playerName) {
      return;
    }

    const ws = new WebSocket(process.env.REACT_APP_WS_URL);


    ws.onopen = () => {
      sendMessage('add-new-player', { playerName })
    };

    ws.onmessage = e => {
      // console.log( `Processing incoming message ${e.data}...`)

      const message = JSON.parse(e.data);
      switch(message.type) {
        case 'start-game':
          setMatch(message.data);
          setGameBoard(message.data.squareValues)
          break;
        case 'update-board':
          setGameBoard(message.data.gameboard);
          if (message.newTurn === 'black') changeTurn('white')
          if (message.newTurn === 'white') changeTurn('black')
          // console.log(message.currentStatus)
          setGameStatus(message.currentStatus)
          break
        default:
          throw new Error(`Unknown message type: ${message.type}`)
      }
    };

    ws.onerror = e => {
      console.log(e);
    };

    ws.onclose = e => {
      console.log(`Connection closed: ${e}`);
      webSocket.current = null;
      setPlayerName('');
      setMatch(null);
    };

    const sendMessage = (type, data) => {
      const message = JSON.stringify({
        type,
        data,
      });

      // console.log(`Sending message ${message}...`);

      ws.send(message);
    };

    webSocket.current = {
      ws,
      sendMessage,
    };

    return function cleanup() {
      if(webSocket.current !== null) {
        webSocket.current.ws.close()
      }
    }
  }, [playerName, setGameBoard])

  const updatePlayerName = (playerName) => {
    setPlayerName(playerName)
  }

  const sendGameboard = (layout, turn, gameStatus) => {
    // console.log(gameBoard)
    console.log(gameStatus)
    webSocket.current.sendMessage('update-gameboard', { gameBoard: layout, turn, gameStatus });
  };

  return (
    <BrowserRouter>
      {playerName ? (
        <GameBoard playerName={playerName} match={match} gameBoard={gameBoard} setGameBoard={setGameBoard} sendGameboard={sendGameboard} turn={turn} changeTurn={changeTurn} gameStatus={gameStatus} setGameStatus={setGameStatus}/>
      ) : (
        <Home updatePlayerName={updatePlayerName} />
      )}
        {/* {localStorage.Token ? (<Route path="/login"><Login /></Route>) : (<Route path="/guestMenu"><GuestMenu /></Route>)} */}
        {/* <Route path="/login"><Login /></Route>
        <Route path="/guestMenu"><GuestMenu /></Route> */}
        {/* <Route path="/gameBoard"><GameBoard /></Route> */}
    </BrowserRouter>
  );
}

export default App;
