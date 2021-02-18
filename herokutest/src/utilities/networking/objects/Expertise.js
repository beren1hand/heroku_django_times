export default class Expertise {
    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.degreeTitles = json.degree_titles;
    }
}