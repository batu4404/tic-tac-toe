import Node from './Node';
import Edge from './Edge';

// var root = new Node();
//
// var possibleSteps = root.getPossibleSteps();
//
// possibleSteps.forEach(function(step) {
//     console.log('step', step);
// });

var root = new Node();
let player = 1;

function createGameTree(node, player) {
    let possibleSteps = node.getPossibleSteps();
    let board = node.getBoard();



    if (possibleSteps.length === 0) {
        return;
    }

    let nextPlayer = (player + 1) % 2;

    for (let i = 0; i < possibleSteps.length; i++) {
        let step = possibleSteps[i];
        let edge = new Edge();
        let newNode = new Node();
        let edgeStep = player * 10 + step;
        let newBoard = board.slice();

        newBoard[step] = player;
        newNode.setBoard(newBoard);

        edge.setNext(newNode);
        edge.setStep(edgeStep);

        // console.log(edge.getStep());
        // console.log(newNode.getBoard());

        let winner = calculateWinner(board);

        if (winner !== null) {
            if (winner === 1) {
                node.setValue(1);
                console.log('win');
            } else {
                node.setValue(-1)
                console.log('lost');
            }

            return;
        } else {
            node.setValue(0);
        }

        if (possibleSteps.length - 1 > 0) {
            createGameTree(newNode, nextPlayer);
        }
    }
}

createGameTree(root, player);
console.log('done');

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

    if (squares[a] != null && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
