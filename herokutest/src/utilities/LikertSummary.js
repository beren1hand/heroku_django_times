import Highcharts from 'highcharts';

export default class LikertSummary {
    static WEIGHT = {
        STRONGLY_DISAGREE: 0,
        DISAGREE: 1,
        NETRUAL: 2,
        AGREE: 3,
        STRONGLY_AGREE: 4,
        MAX: 4
    };

    static DISAGREE_COLOR = new Highcharts.Color('#ff0000'); // Red
    static NETRUAL_COLOR = new Highcharts.Color('#ffff00'); // Yellow
    static AGREE_COLOR = new Highcharts.Color('#00ff00'); // Green

    constructor(opinions) {
        opinions = opinions || [];

        this.stronglyDisagreeCount = 0;
        this.disagreeCount = 0;
        this.netrualCount = 0;
        this.agreeCount = 0;
        this.stronglyAgreeCount = 0;

        for (var opinion of opinions) {
            var conviction = opinion.conviction;
            this.stronglyDisagreeCount += conviction === 0 ? 1 : 0;
            this.disagreeCount += conviction === 1 ? 1 : 0;
            this.netrualCount += conviction === 2 ? 1 : 0;
            this.agreeCount += conviction === 3 ? 1 : 0;
            this.stronglyAgreeCount += conviction === 4 ? 1 : 0;
        }

        this.greatestConviction = Math.max(this.stronglyDisagreeCount, this.disagreeCount, this.netrualCount, this.agreeCount, this.stronglyAgreeCount);

        var likertsCount = this.stronglyDisagreeCount + this.disagreeCount + this.netrualCount + this.agreeCount + this.stronglyAgreeCount;
        var weightedLikerts =
            (LikertSummary.WEIGHT.STRONGLY_DISAGREE * this.stronglyDisagreeCount) +
            (LikertSummary.WEIGHT.DISAGREE * this.disagreeCount) +
            (LikertSummary.WEIGHT.NETRUAL * this.netrualCount) +
            (LikertSummary.WEIGHT.AGREE * this.agreeCount) +
            (LikertSummary.WEIGHT.STRONGLY_AGREE * this.stronglyAgreeCount);

        this.percentage = weightedLikerts / (LikertSummary.WEIGHT.MAX * likertsCount);
    }

    getColor() {
        var opacity = 0.75;
        var colorString = '';

        if (this.percentage < 0.5) { // Between Red and Yellow
            let adjustedPercentage = this.percentage * 2;
            colorString = LikertSummary.DISAGREE_COLOR.tweenTo(LikertSummary.NETRUAL_COLOR, adjustedPercentage);
        } else { // Between Yellow and Green
            let adjustedPercentage = this.percentage - 0.5;
            adjustedPercentage *= 2;
            colorString = LikertSummary.NETRUAL_COLOR.tweenTo(LikertSummary.AGREE_COLOR, adjustedPercentage);
        }

        return new Highcharts.Color(colorString).setOpacity(opacity).get();
    }
}