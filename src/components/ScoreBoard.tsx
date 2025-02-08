import React from 'react';

type ScoreBoardProps = {
  history: { X: number; O: number; Draw: number };
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({ history }) => {
  return (
    <div className="scoreboard">
      <h2 className="score-title">Score Board</h2>
      <div className="score-content">
        <div className="score-item">
          <span className="player-name">X</span>
          <span className="player-score">{history.X}</span>
        </div>
        <div className="score-item">
          <span className="player-name">O</span>
          <span className="player-score">{history.O}</span>
        </div>
        <div className="score-item">
          <span className="player-name">Draw</span>
          <span className="player-score">{history.Draw}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
