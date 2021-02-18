import React from 'react';
import Table from 'react-bootstrap/Table';
import Network from '../../utilities/networking/Network';
// eslint-disable-next-line
import Expert from '../../utilities/networking/objects/Expert';
import Loading from '../Loading';
import IdeaCard from '../cards/IdeaCard';
import Container from 'react-bootstrap/esm/Container';
import OpinionCard from '../cards/OpinionCard';
import Formatter from '../../utilities/Formatter';

export default class ExpertBody extends React.Component {
    constructor(props) {
        super(props);

        this.id = props.id;

        this.state = {
            /** @type {Expert} */
            expert: null
        };
    }

    componentDidMount() {
        Network.getExpert(this.id).then((/** @type {Expert} */ expert) => {
            this.setState({ expert: expert });
        }).catch((reason) => {
            // TODO: We need to add an Error UI
            console.log(reason);
        });
    }

    getDefaultBio() {
        return 'No bio provided.';
    }

    getDefaultEmail() {
        return 'No email provided.';
    }

    getEmailText(email) {
        if (email === "") {
            var defaultEmail = this.getDefaultEmail();
            return (
                <tr>
                    <td>Email: </td>
                    <td style={{ opacity: 0.5 }}> {defaultEmail}</td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>Email: </td>
                    <td><a href={'mailto:' + email}> {email}</a></td>
                </tr>
            )
        }
    }

    renderIdeas() {
        var expertIdeas = this.state.expert.proposedIdeas.map(idea => <IdeaCard idea={idea} />);

        return (
            <Container fluid>
                {Formatter.getCardCompilation(expertIdeas)}
            </Container>
        )
    }

    renderOpinions() {
        //TODO: Needs a different display of opinions
        var expertOpinions = this.state.expert.opinions.map(opinion => <OpinionCard opinion={opinion} />);

        return (
            <Container>
                {Formatter.getCardCompilation(expertOpinions)}
            </Container>
        )
    }

    render() {
        if (this.state.expert !== null) {
            //TODO: Make credentials component
            //TODO: Make sure all degrees are shown
            var uni = this.state.expert.credentials[0].university;

            return (
                <Container>
                    <Table bordered variant="dark">
                        <tbody>
                            <tr>
                                <td width={1}>Dr. </td>
                                <td>{this.state.expert.firstname + ' ' + this.state.expert.lastname}</td>
                            </tr>
                            {this.getEmailText(this.state.expert.email)}
                            <tr>
                                <td>Credentials: </td>
                                <td>{uni}</td>
                            </tr>
                            <tr>
                                <td>Biography: </td>
                                <td>{this.state.expert.biography || this.getDefaultBio()}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <h3>Proposed Ideas: </h3>
                    {this.renderIdeas()}
                    <h3>Opinions: </h3>
                    {this.renderOpinions()}
                </Container>
            );
        } else {
            return <Loading />;
        }
    }
}