import Edge from './Edge';

export default class Node {
    constructor(board = null) {
        this.board = Array(9).fill(null);
        this.edges = Array();
        this.label = null;
        this.value = null;
    }

    getBoard() {
        return this.board;
    }

    getEdges() {
        if (this.edges !== null) {
            return this.edges;
        } else {
            return [];
        }
    }

    getValue() {
        return this.value;
    }

    setBoard(newBoard) {
        this.board = newBoard;
    }

    setEdges(newEdges) {
        this.edges = newEdges;
    }

    setValue(value) {
        this.value = value;
    }

    addEdge(newEdge) {
        this.edges.push(newEdge);
    }

    getPossibleSteps() {
        var possibleSteps = Array();

        for (let i = 0; i < 9; i++) {
            if (this.board[i] === null) {
                possibleSteps.push(i);
            }
        }

        return possibleSteps;
    }

    getNextNode(competitorStep) {
        for (let i = 0; i < this.edges.length; i++) {
            console.log(this.edges[i]);
            if (this.edges[i].getStep() === competitorStep) {
                return this.edges[i].getNext();
            }
        }

        return null;
    }
}
