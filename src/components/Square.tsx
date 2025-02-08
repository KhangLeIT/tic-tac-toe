import React from 'react';

type SquareProps = {
  value: 'X' | 'O' | null;
  onClick: () => void;
  isWinningSquare: boolean;
};

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare }) => {
  return (
    <button className={`square ${value} ${isWinningSquare ? 'winning' : ''}`} onClick={onClick}>
      <span className="content">{value}</span>
    </button>
  );
};

export default Square;
