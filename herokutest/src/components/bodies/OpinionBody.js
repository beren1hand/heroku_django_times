import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Network from '../../utilities/networking/Network';
// eslint-disable-next-line
import Opinion from '../../utilities/networking/objects/Opinion';
import Loading from '../Loading';
import Conviction from '../../utilities/Conviction';
import EvidenceCard from '../cards/EvidenceCard';
import Container from 'react-bootstrap/esm/Container';
import Formatter from '../../utilities/Formatter';

export default class OpinionBody extends React.Component {
    constructor(props) {
        super(props);

        this.id = props.id;

        this.state = {
            /** @type {Opinion} */
            opinion: null
        };
    }

    componentDidMount() {
        Network.getOpinion(this.id).then((/** @type {Opinion} */ opinion) => {
            this.setState({
                opinion: opinion
            })
        }).catch((reason) => {
            // TODO: We need to add an Error UI
            console.log(reason);
        });
    }

    renderEvidence() {
        var ideaEvidence = this.state.opinion.evidence.map(evidence => <EvidenceCard evidence={evidence} />);

        return (
            <Container fluid>
                {Formatter.getCardCompilation(ideaEvidence)}
            </Container>
        )
    }

    render() {
        if (this.state.opinion !== null) {
            return (
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center">
                    <Jumbotron>
                        <p>Opinion by: {this.state.opinion.expertName}</p>
                        <p>Idea: {this.state.opinion.ideaName}</p>
                        <p>Conviction: {Conviction.fromValue(this.state.opinion.conviction).string}</p>
                        <p>Statement: {this.state.opinion.statement}</p>
                        <p>Supporting evidence: </p>
                        {this.renderEvidence()}
                    </Jumbotron>
                </div>
            );
        } else {
            return <Loading />;
        }
    }
}