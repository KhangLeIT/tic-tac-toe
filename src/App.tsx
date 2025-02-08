import React, { useState } from 'react';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import Header from './components/Header';

const App: React.FC = () => {
  const [history, setHistory] = useState<{ X: number; O: number; Draw: number }>({ X: 0, O: 0, Draw: 0 });

  const updateHistory = (winner: 'X' | 'O'| 'Draw') => {
    setHistory(prevHistory => ({ ...prevHistory, [winner]: prevHistory[winner] + 1 }));
  };

  return (
    <div className="app">
      <Header />
      <Board updateHistory={updateHistory} />
      <ScoreBoard history={history} />
    </div>
  );
};

export default App;