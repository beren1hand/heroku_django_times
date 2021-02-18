export default class WebAppPath {
    static DELIMITER = '/';
    static PREFIX = '#';
    static NONE = '';
    static HOME = 'home';
    static EXPERTS = 'experts';
    static LOGIN = 'login';
    static CREATE_ACCOUNT = 'createAccount';
    static IDEA = 'idea';
    static CONTACT = 'contact';
    static ABOUT = 'about';
    static OPINION = 'opinion';
    static EXPERT = 'expert';

    static getHomeHash() {
        return WebAppPath.PREFIX + WebAppPath.HOME;
    }

    static getExpertsHash() {
        return WebAppPath.PREFIX + WebAppPath.EXPERTS;
    }

    static getLoginHash() {
        return WebAppPath.PREFIX + WebAppPath.LOGIN;
    }

    static getAboutHash() {
        return WebAppPath.PREFIX + WebAppPath.ABOUT;
    }

    static getContactHash() {
        return WebAppPath.PREFIX + WebAppPath.CONTACT;
    }

    static getCreateAccountHash() {
        return WebAppPath.PREFIX + WebAppPath.CREATE_ACCOUNT;
    }

    static getExpertHash(id) {
        return WebAppPath.PREFIX + WebAppPath.EXPERT + WebAppPath.DELIMITER + id;
    }

    static getIdeaHash(id) {
        return WebAppPath.PREFIX + WebAppPath.IDEA + WebAppPath.DELIMITER + id;
    }

    static getOpinionHash(id) {
        return WebAppPath.PREFIX + WebAppPath.OPINION + WebAppPath.DELIMITER + id;
    }

    constructor(hash) {
        hash = hash.replace(WebAppPath.PREFIX, '');
        var parts = hash.split(WebAppPath.DELIMITER);

        this.name = parts[0];
        this.id = parts.length > 1 ? parts[1] : -1;
    }

    isHome() {
        return this.name === WebAppPath.HOME || this.name === WebAppPath.NONE;
    }

    isExperts() {
        return this.name === WebAppPath.EXPERTS;
    }

    isLogin() {
        return this.name === WebAppPath.LOGIN;
    }

    isCreateAccount() {
        return this.name === WebAppPath.CREATE_ACCOUNT;
    }

    isIdea() {
        return this.name === WebAppPath.IDEA;
    }

    isOpinion() {
        return this.name === WebAppPath.OPINION;
    }

    isExpert() {
        return this.name === WebAppPath.EXPERT;
    }

    isAbout() {
        return this.name === WebAppPath.ABOUT;
    }

    isContact() {
        return this.name === WebAppPath.CONTACT;
    }
}