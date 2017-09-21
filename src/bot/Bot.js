import GameTree from './GameTree';
import Node from './Node';
import Edge from './Edge';
import {createGameTree, minimax, getBestMoveStep} from './GameTree';

export default class Bot {
    constructor() {
        this.currentNode = new Node();
        createGameTree(this.currentNode, 0);
        console.log(this.currentNode);
    }

    play(competitorStep, callback) {
        let nextNode = this.currentNode.getNextNode(competitorStep)
        console.log('next node', nextNode);
        let nextStep = getBestMoveStep(nextNode);
        console.log('nextStep', nextStep);
        callback(nextStep);
    }
}
