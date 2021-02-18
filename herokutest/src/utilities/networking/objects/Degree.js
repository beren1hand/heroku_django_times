export default class Degree {
    constructor(json) {
        this.id = json.id;
        this.title = json.title;
        this.degreeFrom = json.deg_from;
        this.givenTo = json.given_to;
        this.university = json.university;
        this.titleName = json.title_name;
        this.expertName = json.expert_name;
    }
}