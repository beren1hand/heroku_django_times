import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import ChartGenerator from '../../utilities/ChartGenerator';
import LikertSummary from '../../utilities/LikertSummary';
import Network from '../../utilities/networking/Network';
// eslint-disable-next-line
import Idea from '../../utilities/networking/objects/Idea';
import Loading from '../Loading';
import OpinionCard from '../cards/OpinionCard';
import Formatter from '../../utilities/Formatter';
import EvidenceCard from '../cards/EvidenceCard';
import TopicCard from '../cards/TopicCard';
import Table from 'react-bootstrap/Table';

export default class IdeaBody extends React.Component {
    constructor(props) {
        super(props);

        this.id = props.id;

        this.state = {
            /** @type {Idea} */
            idea: null
        };
    }

    getDefaultTopic() {
        return 'This is a placeholder topic for this idea.';
    }

    getDefaultEvidence() {
        return 'This is a placeholder evidence for this idea.';
    }

    getDefaultOpinion() {
        return 'This is a placeholder opinion for this idea.';
    }

    componentDidMount() {
        Network.getIdea(this.id).then((/** @type {Idea} */ idea) => {
            this.setState({
                idea: idea
            });
        }).catch((reason) => {
            // TODO: We need to add an Error UI
            console.log(reason);
        });
    }

    renderEvidence() {
        var ideaEvidence = this.state.idea.evidence.map(evidence => <EvidenceCard evidence={evidence} />);

        return (
            <Container fluid>
                {Formatter.getCardCompilation(ideaEvidence)}
            </Container>
        )
    }

    renderOpinions() {
        var ideaOpinions = this.state.idea.opinions.map(opinion => <OpinionCard opinion={opinion} />);

        return (
            <Container fluid>
                {Formatter.getCardCompilation(ideaOpinions)}
            </Container>
        )
    }

    renderTopics() {
        var ideaTopics = this.state.idea.topics.map(topic => <TopicCard topic={topic} />);

        return (
            <Container fluid>
                {Formatter.getCardCompilation(ideaTopics)}
            </Container>
        )
    }

    handleConvictionChange(conviction) {
        console.log('This Expert has updated their opinion to:', conviction);
    }

    render() {
        if (this.state.idea !== null) {
            return (
                <Container>
                    <Table>
                        <tr>
                            <td>
                                <h1>{this.state.idea.title}</h1>
                                <p>Proposed by: Dr. {this.state.idea.expertName}</p>
                                <p>Topics: </p>
                                {this.renderTopics()}
                                <p>Published on: {this.state.idea.publishDate}</p>
                                <p>Supporting evidence: </p>
                                {this.renderEvidence()}
                            </td>
                            {ChartGenerator.createIdeaChart(new LikertSummary(this.state.idea.opinions))}
                            <p><b>Idea Description: </b>{this.state.idea.description}</p>
                        </tr>
                    </Table>
                    <p><b>Opinions: </b></p>
                    <Container fluid>
                        {this.renderOpinions()}
                    </Container>
                </Container>
            );
        } else {
            return <Loading />;
        }
    }
}