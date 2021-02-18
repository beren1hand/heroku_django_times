import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
// eslint-disable-next-line
import Degree from '../../utilities/networking/objects/Degree';

export default class DegreeCard extends React.Component {
    static WIDTH = '25rem';

    constructor(props) {
        super(props);

        /** @type {Degree} */
        var degree = props.degree;

        this.id = degree.id;
        this.title = degree.titleName;
        this.university = degree.university;
        this.expert = degree.expertName;
    }

    render() {
        return (
            <Card style={{ width: DegreeCard.WIDTH }}>
                <ListGroup>
                    <ListGroupItem>{this.title}</ListGroupItem>
                    <ListGroupItem>University: {this.university}</ListGroupItem>
                </ListGroup>
            </Card>
        );
    }
}