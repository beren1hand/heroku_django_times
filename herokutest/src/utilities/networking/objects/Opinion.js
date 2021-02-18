import Evidence from './Evidence'

export default class Opinion {
    constructor(json) {
        this.id = json.id;
        this.onIdea = json.on_idea;
        this.heldByExpert = json.held_by_expert;
        this.conviction = json.conviction;
        /** @type {Array<Evidence>} */
        this.evidence = json.opinion_evidence.map(json => new Evidence(json));
        this.statement = json.statement;
        this.expertName = json.expert_name;
        this.ideaName = json.idea_name;
    }
}