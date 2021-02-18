import Opinion from './Opinion';
import Evidence from './Evidence';
import Topic from './Topic';

export default class Idea {
    constructor(json) {
        this.id = json.id;
        this.title = json.title;
        this.proposedBy = json.proposed_by;
        /** @type {Array<Evidence>} */
        this.evidence = json.evidence.map(json => new Evidence(json));
        this.publishDate = json.pub_date;
        /** @type {Array<Topic>} */
        this.topics = json.topics.map(json => new Topic(json));
        this.description = json.description;
        /** @type {Array<Opinion>} */
        this.opinions = json.opinions.map(json => new Opinion(json));
        this.expertName = json.expert_name;
    }
}