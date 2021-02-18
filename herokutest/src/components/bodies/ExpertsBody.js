import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Formatter from '../../utilities/Formatter';
import Network from '../../utilities/networking/Network';
// eslint-disable-next-line
import Expert from '../../utilities/networking/objects/Expert';
import ExpertCard from '../cards/ExpertCard';
import Loading from '../Loading';

export default class ExpertsBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            /** @type {Array<Expert>} */
            experts: []
        }
    }

    componentDidMount() {
        Network.getExperts().then((experts) => {
            this.setState({ experts: experts });
        });
    }

    renderExperts() {
        var expertList = this.state.experts.map(expert => <ExpertCard expert={expert} />);

        return (
            <Container fluid>
                { Formatter.getCardCompilation(expertList)}
            </Container >
        );
    }

    render() {
        if (this.state.experts.length > 0) {
            return (
                <Container fluid>
                    {this.renderExperts()}
                </Container>
            );
        } else {
            return <Loading />;
        }
    }
}