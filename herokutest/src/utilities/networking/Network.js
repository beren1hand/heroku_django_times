import axios from 'axios';
import Expert from './objects/Expert';
import Idea from './objects/Idea'
import Opinion from './objects/Opinion';
import University from './objects/University';
import Evidence from './objects/Evidence';
import Degree from './objects/Degree';

export default class Network {
    static BASE_API_URL = 'http://localhost:8000/api/';
    static EXPERTS_API_URL = this.BASE_API_URL + 'Experts/';
    static EXPERTISE_API_URL = this.BASE_API_URL + 'Expertise/';
    static DEGREE_TITLE_API_URL = this.BASE_API_URL + 'DegreeTitle/';
    static UNIVERSITY_API_URL = this.BASE_API_URL + 'University/';
    static DEGREE_API_URL = this.BASE_API_URL + 'Degree/';
    static IDEAS_API_URL = this.BASE_API_URL + 'Ideas/';
    static OPINION_API_URL = this.BASE_API_URL + 'Opinions/';
    static EVIDENCE_API_URL = this.BASE_API_URL + 'Evidence/';

    /**
     * @returns {Promise<Array<Idea>>} an array of Ideas
     */
    static getIdeas() {
        return new Promise((resolve, reject) => {
            axios.get(this.IDEAS_API_URL).then((response) => {
                var ideas = response.data.map(json => new Idea(json));
                resolve(ideas);
            }).catch((reason) => {
                reject(reason);
            });
        });
    }

    /**
     * @param {number} id the ID of the Idea in the API
     * @returns {Promise<Idea>} the Idea with the given ID
     */
    static getIdea(id) {
        return new Promise((resolve, reject) => {
            axios.get(this.IDEAS_API_URL + id + '/').then((response) => {
                resolve(new Idea(response.data));
            }).catch((reason) => {
                reject(reason);
            });
        });
    }

    /**
     * @returns {Promise<number>} the ID of the newly created Idea
     */
    static createIdea(title, proposedBy, evidence, pubDate, topics, description, opinions) {
        var data = {
            "title": title,
            "proposed_by": proposedBy,
            "evidence": evidence,
            "pub_date": pubDate,
            "topics": topics,
            "description": description,
            "opinions": opinions
        };

        return new Promise((resolve, reject) => {
            axios.post(this.IDEAS_API_URL, data).then((response) => {
                resolve(response.data.id);
            }).catch((reason) => {
                reject(reason);
            });
        });
    }

    /**
     * @returns {Promise<Array<Expert>>} an array of Experts
     */
    static getExperts() {
        return new Promise((resolve, reject) => {
            axios.get(this.EXPERTS_API_URL).then((response) => {
                var experts = [];

                for (var json of response.data) {
                    experts.push(new Expert(json));
                }

                resolve(experts);
            }).catch((reason) => {
                reject(reason);
            });
        });
    }

    static getDegreeTitles() {
        return new Promise((resolve, reject) => {
            axios.get(this.DEGREE_TITLE_API_URL).then((response) => {
                resolve(response.data);
            }).catch((reason) => {
                reject(reason);
            });
        });
    }

    /**
     * @returns {Promise<Array<University>>} an array of Experts
     */
    static getUniversities() {
        return new Promise((resolve, reject) => {
            axios.get(this.UNIVERSITY_API_URL).then((response) => {
                var universities = response.data.map(json => new University(json));

                resolve(universities);
            }).catch((reason) => {
                reject(reason);
            });
        });
    }

    /**
     * @returns {Promise<Array<Opinion>>} an array of Opinion
     */
    static getOpinions() {
        return new Promise((resolve, reject) => {
            axios.get(this.OPINION_API_URL).then((response) => {
                var opinions = response.data.map(json => new Opinion(json));

                resolve(opinions);
            }).catch((reason) => {
                reject(reason);
            });
        });
    }

    /**
     * @param id the ID of the Idea in the API
     * @returns {Promise<Opinion>} the Idea with the given ID
     */
    static getOpinion(id) {
        return new Promise((resolve, reject) => {
            axios.get(this.OPINION_API_URL + id + '/').then((response) => {
                resolve(new Opinion(response.data));
            }).catch((reason) => {
                reject(reason);
            });
        });
    }

    /**
     * @param id the ID of the Idea in the API
     * @returns {Promise<Degree>} the Idea with the given ID
     */
    static getDegree(id) {
        return new Promise((resolve, reject) => {
            axios.get(this.DEGREE_API_URL + id + '/').then((response) => {
                resolve(new Degree(response.data));
            }).catch((reason) => {
                reject(reason);
            });
        });
    }

    /**
     * @param id the ID of the Idea in the API
     * @returns {Promise<Expert>} the Idea with the given ID
     */
    static getExpert(id) {
        return new Promise((resolve, reject) => {
            axios.get(this.EXPERTS_API_URL + id + '/').then((response) => {
                resolve(new Expert(response.data));
            }).catch((reason) => {
                reject(reason);
            });
        });
    }

    /**
     * @param id the ID of the Idea in the API
     * @returns {Promise<Evidence>} the Idea with the given ID
     */
    static getEvidence(id) {
        return new Promise((resolve, reject) => {
            axios.get(this.EVIDENCE_API_URL + id + '/').then((response) => {
                resolve(new Evidence(response.data));
            }).catch((reason) => {
                reject(reason);
            });
        });
    }

    static getExpertises() {
        return new Promise((resolve, reject) => {
            axios.get(this.EXPERTISE_API_URL).then((response) => {
                resolve(response.data);
            }).catch((reason) => {
                reject(reason);
            });
        });
    }

    /**
     * @param {{
     * expertiseName: string, expertiseId: number
     * }} properties 
     * 
     * @returns {Promise<number>} the ID of the Expertise
     */
    static createExpertise(properties) {
        return new Promise((resolve, reject) => {
            if (properties.expertiseId === null) {
                var expertiseData = {
                    name: properties.expertiseName
                };

                axios.post(this.EXPERTISE_API_URL, expertiseData).then((expertiseResponse) => {
                    resolve(expertiseResponse.data.id);
                }).catch((reason) => {
                    reject(reason);
                });
            } else {
                resolve(properties.expertiseId);
            }
        });
    }

    /**
     * @param {{
     * degreeTitle: string, degreeTitleId: number,
     * expertiseName: string, expertiseId: number
     * }} properties 
     * 
     * @returns {Promise<number>} the ID of the DegreeTitle
     */
    static createDegreeTitle(properties) {
        return new Promise((resolve, reject) => {
            if (properties.degreeTitleId === null) {
                this.createExpertise(properties).then((expertiseId) => {
                    var degreeTitleData = {
                        title: properties.degreeTitle,
                        expertise: expertiseId
                    };

                    axios.post(this.DEGREE_TITLE_API_URL, degreeTitleData).then((degreeTitleResponse) => {
                        resolve(degreeTitleResponse.data.id);
                    }).catch((reason) => {
                        reject(reason);
                    });
                }).catch((reason) => {
                    reject(reason);
                });
            } else {
                resolve(properties.degreeTitle);
            }
        });
    }

    /**
     * @param {{
     * universityName: string, universityLocation: string, universityId: number
     * }} properties 
     * 
     * @returns {Promise<number>} the ID of the University
     */
    static createUniversity(properties) {
        return new Promise((resolve, reject) => {
            if (properties.universityId === null) {
                var universityData = {
                    name: properties.universityName,
                    location: properties.universityLocation
                };

                axios.post(this.UNIVERSITY_API_URL, universityData).then((universityResponse) => {
                    resolve(universityResponse.data.id);
                }).catch((reason) => {
                    reject(reason);
                });
            } else {
                resolve(properties.universityId);
            }
        });
    }

    /**
     * @param {{
     * degreeTitle: string, degreeTitleId: number,
     * expertiseName: string, expertiseId: number,
     * universityName: string, universityLocation: string, universityId: number
     * }} properties 
     * @param {number} expertId
     * 
     * @returns {Promise<number>} the ID of the Degree
     */
    static createDegree(properties, expertId) {
        return new Promise((resolve, reject) => {
            Promise.all([this.createDegreeTitle(properties), this.createUniversity(properties)]).then((values) => {
                var degreeData = {
                    title: values[0],
                    deg_from: values[1],
                    given_to: expertId
                };

                axios.post(this.DEGREE_API_URL, degreeData).then((degreeResponse) => {
                    resolve(degreeResponse.data.id);
                }).catch((reason) => {
                    reject(reason);
                });
            }).catch((reason) => {
                reject(reason);
            });
        });
    }

    /**
     * @param {{
     * firstName: string, middleName: string, lastName: string,
     * email: string, biography: string,
     * degreeTitle: string, degreeTitleId: number,
     * expertiseName: string, expertiseId: number,
     * universityName: string, universityLocation: string, universityId: number
     * }} properties 
     * 
     * @returns {Promise<number>} the ID of the newly created Expert
     */
    static createExpert(properties) {
        var expertData = {
            first_name: properties.firstName,
            last_name: properties.lastName,
            middle_name: properties.middleName,
            email: properties.email,
            biography: properties.biography
        };

        return new Promise((resolve, reject) => {
            axios.post(this.EXPERTS_API_URL, expertData).then((expertResponse) => {
                var expertId = expertResponse.data.id;
                this.createDegree(properties, expertId).then((_) => {
                    resolve(expertId);
                }).catch((reason) => {
                    reject(reason);
                });
            }).catch((reason) => {
                reject(reason);
            });
        });
    }
}