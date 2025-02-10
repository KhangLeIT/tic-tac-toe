import React, { useState, useEffect } from "react";
import Square from "./Square";
import ScoreBoard from "./ScoreBoard";

// Định nghĩa kiểu dữ liệu cho props của component Board
type BoardProps = {
  updateHistory: (winner: "X" | "O" | "Draw") => void;
};

// Component Board - Bảng chơi Tic-Tac-Toe
const Board: React.FC<BoardProps> = ({ updateHistory }) => {
  // Khai báo state lưu trữ trạng thái của các ô vuông trên bảng
  const [squares, setSquares] = useState<Array<"X" | "O" | null>>(Array(9).fill(null));
  // State kiểm tra lượt chơi hiện tại (true = "X", false = "O")
  const [isXNext, setIsXNext] = useState(true);
  // State lưu trữ người chiến thắng hoặc kết quả hòa
  const [winner, setWinner] = useState<"X" | "O" | "Draw" | null>(null);
  // State lưu các ô chiến thắng (nếu có)
  const [winningSquares, setWinningSquares] = useState<number[]>([]);
  // State điều khiển hiển thị modal thông báo chiến thắng
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  // State lưu điểm số của hai người chơi và số lần hòa
  const [score, setScore] = useState({ X: 0, O: 0, Draw: 0 });

  // useEffect để hiển thị modal thông báo chiến thắng sau 1.5 giây khi có người thắng
  useEffect(() => {
    if (winner) {
      setTimeout(() => setShowWinnerModal(true), 1500);
    }
  }, [winner]);

  // Hàm xử lý khi người chơi nhấn vào một ô trên bảng
  const handleClick = (index: number) => {
    // Nếu ô đã được chọn hoặc đã có người thắng thì không làm gì
    if (squares[index] || winner) return;

    // Tạo bản sao của mảng squares và cập nhật ô được chọn
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    // Chuyển lượt chơi cho người tiếp theo
    setIsXNext(!isXNext);

    // Kiểm tra xem có người thắng hay không
    const result = calculateWinner(newSquares);
    if (result) {
      setWinner(result.winner); // Cập nhật người thắng
      setWinningSquares(result.line); // Lưu các ô chiến thắng
      updateHistory(result.winner); // Cập nhật lịch sử trận đấu
      setScore((prev) => ({ ...prev, [result.winner]: prev[result.winner] + 1 })); // Cập nhật điểm số
    } else if (!newSquares.includes(null)) {
      // Nếu không còn ô trống mà không có người thắng -> Hòa
      setWinner("Draw");
      updateHistory("Draw");
      setScore((prev) => ({ ...prev, Draw: prev.Draw + 1 }));
    }
  };

  // Hàm kiểm tra xem có ai thắng hay không
  const calculateWinner = (squares: Array<"X" | "O" | null>): { winner: "X" | "O"; line: number[] } | null => {
    // Các bộ 3 ô có thể tạo thành chiến thắng
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Hàng ngang
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cột dọc
      [0, 4, 8], [2, 4, 6], // Đường chéo
    ];
    // Kiểm tra từng bộ 3 ô để tìm người thắng
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] }; // Trả về người thắng và vị trí các ô thắng
      }
    }
    return null; // Không có người thắng
  };

  // Hàm khởi động lại trò chơi
  const handleRestart = () => {
    setSquares(Array(9).fill(null)); // Reset bảng chơi
    setIsXNext(true); // X luôn đi trước
    setWinner(null); // Xóa trạng thái thắng
    setWinningSquares([]); // Xóa danh sách ô thắng
    setShowWinnerModal(false); // Đóng modal chiến thắng
  };

  return (
    <div className="game-container">
      {/* Bảng chơi Tic-Tac-Toe */}
      <div className="board">
        {squares.map((square, index) => (
          <Square
            key={index}
            value={square}
            onClick={() => handleClick(index)}
            isWinningSquare={winningSquares.includes(index)}
          />
        ))}
      </div>

      {/* Nút khởi động lại trò chơi */}
      <button className="btnRestart" onClick={handleRestart}>
        Restart
      </button>

      {/* Hiển thị trạng thái đang kiểm tra người thắng */}
      {winner && !showWinnerModal && (
        <div className="status">Is showing winner</div>
      )}

      {/* Hiển thị modal thông báo kết quả */}
      {showWinnerModal && (
        <div className="winner-modal">
          <h2>
            {winner === "Draw" ? "Draw!!!" : `Người Chơi ${winner} Thắng!!!`}
          </h2>
          <ScoreBoard history={score} />
          <button onClick={handleRestart}>Restart Game</button>
        </div>
      )}
    </div>
  );
};

export default Board;
