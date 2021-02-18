import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
// eslint-disable-next-line
import Evidence from '../../utilities/networking/objects/Evidence';

export default class EvidenceCard extends React.Component {
    static WIDTH = '25rem';

    constructor(props) {
        super(props);

        /** @type {Evidence} */
        var evidence = props.evidence;

        this.id = evidence.id;
        this.title = evidence.title;
        this.link = evidence.link;
        this.description = evidence.description;
        this.supportsIdeas = evidence.supportsIdeas;
        this.opinionsJustified = evidence.opinionsJustified;
    }

    render() {
        return (
            <Card style={{ width: EvidenceCard.WIDTH }}>
                <ListGroup>
                    <ListGroupItem><a href={this.link}>{this.title}</a></ListGroupItem>
                </ListGroup>
                <Card.Body>{this.description}</Card.Body>
            </Card>
        );
    }
}