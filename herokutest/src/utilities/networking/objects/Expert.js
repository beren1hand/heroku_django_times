import Degree from './Degree'
import Idea from './Idea';
import Opinion from './Opinion';

export default class Expert {
    constructor(json) {
        this.id = json.id;
        this.firstname = json.first_name;
        this.lastname = json.last_name;
        this.middleName = json.middle_name;
        this.email = json.email;
        this.biography = json.biography;
        /** @type {Array<Degree>} */
        this.credentials = json.credentials.map(json => new Degree(json));
        /** @type {Array<Opinion>} */
        this.opinions = json.opinions.map(json => new Opinion(json));
        /** @type {Array<Idea>} */
        this.proposedIdeas = json.proposed_ideas.map(json => new Idea(json));
    }
}