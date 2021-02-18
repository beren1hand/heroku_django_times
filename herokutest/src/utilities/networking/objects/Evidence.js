export default class Evidence {
    constructor(json) {
        this.id = json.id;
        this.title = json.title;
        this.link = json.link;
        this.description = json.description;
        this.opinionsJustified = json.opinions_justified;
        this.supportsIdeas = json.supports_ideas;
    }
}