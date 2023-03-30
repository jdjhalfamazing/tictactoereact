import React, { useState } from 'react';
import './App.css';

function App() {
  const [player, setPlayer] = useState('X');
  const [gameState, setGameState] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState(null);

  const checkWinner = () => {
    const possibleWins = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    for (let i = 0; i < possibleWins.length; i++) {
      const [a, b, c] = possibleWins[i];
      if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
        setWinner(gameState[a]);
        return;
      }
    }

    if (!gameState.includes('')) {
      setWinner('T');
    }
  };

  const handleBoxClick = (index) => {
    if (winner || gameState[index]) {
      return;
    }

    const newGameState = [...gameState];
    newGameState[index] = player;
    setGameState(newGameState);

    const nextPlayer = player === 'X' ? 'O' : 'X';
    setPlayer(nextPlayer);

    checkWinner();
  };

  const handleRestartClick = () => {
    setPlayer('X');
    setGameState(Array(9).fill(''));
    setWinner(null);
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="game-container">
        {gameState.map((value, index) => (
          <div key={index} className="box" onClick={() => handleBoxClick(index)}>
            {value}
          </div>
        ))}
      </div>
      {winner && (
        <div className="winner-container">
          {winner === 'T' ? (
            <div>It's a tie!</div>
          ) : (
            <div>{winner} wins!</div>
          )}
          <button onClick={handleRestartClick}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;
