export default class Topic {
    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.description = json.description;
        this.expertises = json.expertises;
    }
}