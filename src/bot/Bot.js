export default class Bot {
    constructor() {
        this.currentNode = null;
    }

    play(competitorStep) {
        let nextNode = this.currentNode.getNextNode(competitorStep)
    }
}
