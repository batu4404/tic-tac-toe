import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import getBot from './bot/index.js';

// class Square extends React.Component {
//     render() {
//         return (
//             <button className="square" onClick={this.props.onClick}>
//                 {this.props.value}
//             </button>
//         );
//     }
// }

function Square(props) {
    return (
        <button className="square" onClick={props.onClick} >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    // constructor() {
    //     super();

    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true
    //     };

    //     //this.handleClick = this.handleClick.bind(this);
    // }

    handleClick(i) {
        let squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    renderSquare(i) {
        if (this.props.onClick) {
            return (
                <Square
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                />
            );
        } else {
            return (
                <Square
                    value={this.props.squares[i]}
                />
            );
        }
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.bot = getBot();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            isHuman: true,
            isGameOn: true,
            isDraw: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i) {
        if (this.state.isDraw) {
            return;
        }

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        // const isDraw = checkDraw(squares);
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        const isDraw = checkDraw(squares);

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            isHuman: !this.state.isHuman,
            isDraw: isDraw
        }, () => {
            if (!this.state.isHuman && !this.state.isDraw) {
                this.bot.play(i, this.handleClick);
            }
        });
    }

    jumpTo(step) {
        return;

        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    restartGame() {
        this.bot.reset();

        this.setState({
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            isHuman: true,
            isGameOn: true,
            isDraw: false
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        // const winner = calculateWinner(current.squares);
        const isHuman = this.state.isHuman;

        const moves = history.map((step, move) => {
            const desc = move ?
                'Move #' + move :
                'Game start';
            if (move === 0) {
                return (
                    <li key={move}>
                        <a href="#" onClick={() => this.restartGame()}>{desc}</a>
                    </li>
                );
            } else {
                return (
                    <li key={move}>
                        <a href="#">{'Move #' + move}</a>
                    </li>
                );
            }
            // return (
            //     <li key={move}>
            //         <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
            //     </li>
            // );
        });

        let status;
        if (this.state.isDraw) {
            status = 'Draw!!!';
        } else {
            let winner = calculateWinner(current.squares);
            if (winner) {
                status = 'Winner: ' + winner;
            } else {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            }
        }

        return (
            <div className="game">
                <div className="game-board">
                    {isHuman ? (
                            <Board
                                squares={current.squares}
                                onClick={(i) => this.handleClick(i)} />
                        ) : (
                            <Board
                                squares={current.squares} />
                        )
                    }
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function checkDraw(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
            return false;
        }
    }
    return true;
}
