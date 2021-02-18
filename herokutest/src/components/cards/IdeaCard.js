import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import LikertSummary from '../../utilities/LikertSummary';
import ChartGenerator from '../../utilities/ChartGenerator';
import WebAppPath from '../../utilities/WebAppPath';
// eslint-disable-next-line
import Idea from '../../utilities/networking/objects/Idea';

export default class IdeaCard extends React.Component {
    static WIDTH = '35rem';

    constructor(props) {
        super(props);

        /** @type {Idea} */
        var idea = props.idea;

        this.title = idea.title;
        this.likertSummary = new LikertSummary(idea.opinions);
        this.subtitle = this.getSubtitle(this.likertSummary.percentage);
        this.text = idea.description;
        this.id = idea.id;
    }

    getSubtitle(percentage) {
        return (100 * percentage).toFixed(0) + '%';
    }

    render() {
        return (
            <Card className="text-center" style={{ width: IdeaCard.WIDTH }}>
                <Card.Body>
                    {ChartGenerator.createIdeaChart(this.likertSummary)}
                    <Card.Title>{this.title}</Card.Title>
                    <Card.Subtitle>{this.subtitle}</Card.Subtitle>
                    <Card.Text>{this.text}</Card.Text>
                    <Button href={WebAppPath.getIdeaHash(this.id)}>Find out more</Button>
                </Card.Body>
            </Card>
        );
    }
}