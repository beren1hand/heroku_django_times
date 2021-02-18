import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
// eslint-disable-next-line
import Expert from '../../utilities/networking/objects/Expert';
import WebAppPath from '../../utilities/WebAppPath';
import DegreeCard from './DegreeCard';
import Container from 'react-bootstrap/Container';
import Formatter from '../../utilities/Formatter';

export default class ExpertCard extends React.Component {
    static WIDTH = '25rem';

    constructor(props) {
        super(props);

        /** @type {Expert} */
        var expert = props.expert;

        this.id = expert.id;
        this.name = expert.firstname + ' ' + expert.lastname;
        this.university = expert.credentials[0].university;
        this.bio = expert.biography || this.getDefaultBio();
        this.credentials = expert.credentials.map(degree => <DegreeCard degree={degree} />);
    }

    getDefaultBio() {
        return 'This is a placeholder bio for this expert.';
    }

    renderDegrees() {
        return (
            <Container fluid>
                {Formatter.getCardCompilation(this.credentials)}
            </Container>
        );
    }

    render() {
        return (
            <Card style={{ width: ExpertCard.WIDTH }}>
                <Card.Body><Card.Link href={WebAppPath.getExpertHash(this.id)} className="font-weight-bold">Dr. {this.name}</Card.Link></Card.Body>
                <ListGroup>
                    <ListGroupItem>
                        {this.renderDegrees()}
                    </ListGroupItem>
                </ListGroup>
                <Card.Body>{this.bio}</Card.Body>
            </Card>
        );
    }
}