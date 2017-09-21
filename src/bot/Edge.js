export default class Edge {
    constructor() {
        this.next = null;
        this.step = null;
    }

    getNext() {
        return this.next;
    }

    getStep() {
        return this.step;
    }

    setNext(next) {
        this.next = next;
    }

    setStep(step) {
        this.step = step;
    }
}
