import Degree from './Degree'

export default class University {
    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.location = json.location;
        /** @type {Array<Degree>} */
        this.degreesFrom = json.degrees_from.map(json => new Degree(json));
    }
}