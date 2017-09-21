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

export function createGameTree(node, player = 1) {
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

        node.addEdge(edge);

        let winner = calculateWinner(board);

        if (winner !== null) {
            if (winner === 1) {
                newNode.setValue(1);
            } else {
                newNode.setValue(-1)
            }

            return;
        } else {
            newNode.setValue(0);
        }

        if (possibleSteps.length - 1 > 0) {
            createGameTree(newNode, nextPlayer);
        }
    }
}

export function minimax(node, isMaximisingPlayer) {
    let nextSteps = node.getEdges();
    let bestStep;

    if (nextSteps.length === 0) {
        return node.getValue();
    }

    if (isMaximisingPlayer) {
        bestStep = -69;

        for (let i = 0; i < nextSteps.length; i++) {
            let value = minimax(nextSteps[i].getNext(), !isMaximisingPlayer);
            // console.log('value', value);
            if (value > bestStep) {
                bestStep = value;
            }
        }
    } else {
        bestStep = 69;

        for (let i = 0; i < nextSteps.length; i++) {
            let value = minimax(nextSteps[i].getNext(), !isMaximisingPlayer);
            // console.log('value', value);

            if (value < bestStep) {
                bestStep = value;
            }
        }
    }

    // console.log('best', bestStep);

    return bestStep;
}

export function getBestMoveStep(node) {
    let nextSteps = node.getEdges();
    let bestStep = -69;
    let bestStepFound;
    let isMaximisingPlayer = true;
    for (let i = 0; i < nextSteps.length; i++) {
        let value = minimax(nextSteps[i].getNext(), !isMaximisingPlayer);
        console.log('value', value);
        if (value > bestStep) {
            bestStep = value;
            bestStepFound = nextSteps[i].getStep();
        }
    }

    return bestStepFound % 10;;
}

// createGameTree(root, player);
//
// console.log('root', root.getEdges());

// getBestMoveStep(root, true);
// console.log('value', root.getValue());

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
