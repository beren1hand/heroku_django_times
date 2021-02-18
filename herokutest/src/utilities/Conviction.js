export default class Conviction {
    static STRONGLY_DISAGREE = new Conviction('Strongly Disagree', 0);
    static DISAGREE = new Conviction('Disagree', 1);
    static NETRUAL = new Conviction('Netrual', 2);
    static AGREE = new Conviction('Agree', 3);
    static STRONGLY_AGREE = new Conviction('Strongly Agree', 4);

    static ALL_CONVICTIONS = [
        Conviction.STRONGLY_DISAGREE,
        Conviction.DISAGREE,
        Conviction.NETRUAL,
        Conviction.AGREE,
        Conviction.STRONGLY_AGREE
    ];

    static fromValue(value) {
        for (var conviction of Conviction.ALL_CONVICTIONS) {
            if (conviction.value === value) {
                return conviction;
            }
        }

        // An unknown value will be considered a netual opinion
        return Conviction.NETRUAL;
    }

    static fromString(string) {
        for (var conviction of Conviction.ALL_CONVICTIONS) {
            if (conviction.string === string) {
                return conviction;
            }
        }

        // An unknown string will be considered a netual opinion
        return Conviction.NETRUAL;
    }

    constructor(string, value) {
        this.string = string;
        this.value = value;
    }
}