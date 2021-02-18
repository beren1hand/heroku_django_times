import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';
import WebAppPath from '../../utilities/WebAppPath';
// eslint-disable-next-line
import Opinion from '../../utilities/networking/objects/Opinion';
import Conviction from '../../utilities/Conviction';
import Formatter from '../../utilities/Formatter';
import Container from 'react-bootstrap/esm/Container';
import EvidenceCard from './EvidenceCard';

export default class OpinionCard extends React.Component {
    static WIDTH = '25rem';

    constructor(props) {
        super(props);

        /** @type {Opinion} */
        var opinion = props.opinion;

        this.id = opinion.id;
        this.onIdea = opinion.onIdea;
        this.heldByExpert = opinion.heldByExpert;
        this.conviction = opinion.conviction;
        this.evidence = opinion.evidence;
        this.statement = opinion.statement;
        this.expertName = opinion.expertName;
    }

    renderEvidence() {
        var opinionEvidence = this.evidence.map(evidence => <EvidenceCard evidence={evidence} />);

        return (
            <Container fluid>
                {Formatter.getCardCompilation(opinionEvidence)}
            </Container>
        )
    }

    render() {
        return (
            <Card style={{ width: OpinionCard.WIDTH }}>
                <Card.Header className="font-weight-bold">Opinion by Dr. {this.expertName}</Card.Header>
                <ListGroup>
                    <ListGroupItem>Conviction: {Conviction.fromValue(this.conviction).string}</ListGroupItem>
                    <ListGroupItem>Evidence: {this.renderEvidence()}</ListGroupItem>
                </ListGroup>
                <Card.Body>{this.statement}</Card.Body>
                <Button href={WebAppPath.getOpinionHash(this.id)}>See Opinion</Button>
            </Card>
        );
    }
}