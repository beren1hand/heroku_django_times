import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
// eslint-disable-next-line
import Topic from '../../utilities/networking/objects/Topic';

export default class TopicCard extends React.Component {
    static WIDTH = '25rem';

    constructor(props) {
        super(props);

        /** @type {Topic} */
        var topic = props.topic;

        this.id = topic.id;
        this.name = topic.name;
        this.description = topic.description;
        this.expertises = topic.expertises;
    }

    render() {
        return (
            <Card style={{ width: TopicCard.WIDTH }}>
                <ListGroup>
                    <ListGroupItem>{this.name}</ListGroupItem>
                </ListGroup>
                <Card.Body>{this.description}</Card.Body>
            </Card>
        );
    }
}