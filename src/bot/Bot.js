import GameTree from './GameTree';
import Node from './Node';
import Edge from './Edge';
import {createGameTree, minimax, getBestMoveStep} from './GameTree';

export default class Bot {
    constructor() {
        this.root = new Node();
        createGameTree(this.root, 0);
        this.currentNode = this.root;
        console.log(this.root);
    }

    reset() {
        this.currentNode = this.root;
    }

    play(competitorStep, callback) {
        // console.log('competitor step', competitorStep);
        let nextNode = this.currentNode.getNextNode(competitorStep)
        this.currentNode = nextNode;
        let bestNextStepFound = getBestMoveStep(nextNode);

        if (!bestNextStepFound) {
            return;
        }

        let nextStep = bestNextStepFound.getStep() % 10;
        this.currentNode = bestNextStepFound.getNext();
        callback(nextStep);
    }
}
