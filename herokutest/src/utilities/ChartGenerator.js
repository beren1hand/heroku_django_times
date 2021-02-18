import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import LikertSummary from './LikertSummary';

export default class ChartGenerator {
    static TOP_Y_AXIS_LABEL_FONT_SIZE = '26px';
    static TOP_Y_AXIS_LABEL_OFFSET = 12;
    static CHART_MARGIN_TOP = 18;

    /**
     * @param {LikertSummary} likerts
     * @returns {HighchartsReact}
     */
    static createIdeaChart(likerts) {
        likerts = likerts || new LikertSummary();

        var options = this.getIdeaChartOptions(likerts.greatestConviction);

        options.series = [{
            data: [likerts.stronglyDisagreeCount, likerts.disagreeCount, likerts.netrualCount, likerts.agreeCount, likerts.stronglyAgreeCount],
            showInLegend: false,
            name: 'Experts'
        }];
        options.plotOptions.areaspline.fillColor = likerts.getColor()

        return <HighchartsReact highcharts={Highcharts} options={options} />;
    }

    /**
     * @returns {Highcharts.Options}
     */
    static getIdeaChartOptions(greatestConviction) {
        return {
            chart: {
                type: 'areaspline',
                events: {
                    render: function () {
                        var ticks = this.yAxis[0].ticks;
                        for (var tick in ticks) {
                            if (ticks[tick].isLast) {
                                ticks[tick].label.translate(0, ChartGenerator.TOP_Y_AXIS_LABEL_OFFSET);
                                break;
                            }
                        }
                    }
                },
                marginTop: ChartGenerator.CHART_MARGIN_TOP
            },
            title: false,
            xAxis: {
                categories: [
                    'Strongly Disagree',
                    'Disagree',
                    'Netrual',
                    'Agree',
                    'Strongly Agree'
                ],
                min: 0.5,
                max: 3.5
            },
            yAxis: {
                title: {
                    enabled: false
                },
                max: greatestConviction,
                labels: {
                    formatter: function () {
                        if (this.isLast) {
                            return '<span style="font-size:' + ChartGenerator.TOP_Y_AXIS_LABEL_FONT_SIZE + '; font-weight:bold;">' + this.value + '</span>';
                        } else {
                            return this.value;
                        }
                    }
                },
                allowDecimals: false
            },
            plotOptions: {
                areaspline: {}
            },
            credits: {
                enabled: false
            }
        };
    }
}