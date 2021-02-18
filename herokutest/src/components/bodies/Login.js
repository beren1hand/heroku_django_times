import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Network from '../../utilities/networking/Network';
// eslint-disable-next-line
import Expert from '../../utilities/networking/objects/Expert';
import Loading from '../Loading';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.handleUserChange = this.handleUserChange.bind(this);

        this.state = {
            /** @type {Array<Expert>} */
            experts: []
        };
    }

    componentDidMount() {
        Network.getExperts().then((experts) => {
            this.setState({ experts: experts });
        });
    }

    handleUserChange(e) {
        e.preventDefault();

        var values = e.target.elements.expertSelected.value.split(':');
        var id = values[0];
        var name = values[1];

        this.props.onUserChange(id, name);
    }

    renderExpertSelector() {
        var expertOptions = [];

        for (var expert of this.state.experts) {
            var firstAndLast = expert.firstname + ' ' + expert.lastname;
            var superKey = expert.id + ':' + firstAndLast;

            expertOptions.push(
                <option key={expert.id} value={superKey}>{firstAndLast}</option>
            );
        }

        return (
            <Form onSubmit={this.handleUserChange}>
                <Form.Group controlId="expertSelected">
                    <Form.Label>Who are you?</Form.Label>
                    <Form.Control as="select">{expertOptions}</Form.Control>
                </Form.Group>
                <Button type="submit">Login</Button>
            </Form>
        );
    }

    render() {
        if (this.state.experts.length > 0) {
            return this.renderExpertSelector();
        } else {
            return <Loading />;
        }
    }
}