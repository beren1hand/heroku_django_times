import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import IdeaCard from '../cards/IdeaCard';
import Formatter from '../../utilities/Formatter';
// eslint-disable-next-line
import Idea from '../../utilities/networking/objects/Idea';
import Network from '../../utilities/networking/Network';
import Loading from '../Loading';
import WebAppPath from '../../utilities/WebAppPath';

export default class HomeBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            /** @type {Array<Idea>} */
            ideas: []
        }
    }

    componentDidMount() {
        Network.getIdeas().then((ideas) => {
            this.setState({ ideas: ideas });
        });
    }

    renderInfo() {
        return (
            <Container>
                <Jumbotron>
                    <h1>What's the consensus?</h1>
                    <p>
                        We've compiled the views and research of multiple experts to bring you a consensus on some of our
                        biggest questions.
                    </p>
                    <Button href={WebAppPath.getExpertsHash()}>Who are the experts</Button>
                </Jumbotron>
            </Container>
        );
    }

    renderIdeas() {
        var ideaList = this.state.ideas.map(idea => <IdeaCard idea={idea} />);

        return (
            <Container fluid>
                {Formatter.getCardCompilation(ideaList)}
            </Container>
        );
    }

    render() {
        if (this.state.ideas.length > 0) {
            return (
                <Container fluid>
                    {this.renderInfo()}
                    {this.renderIdeas()}
                </Container>
            );
        } else {
            return <Loading />;
        }

    }
}