import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Network from '../../utilities/networking/Network';

export default class CreateExpert extends React.Component {
    constructor(props) {
        super(props);

        this.handleCreateNewExpertButton = this.handleCreateNewExpertButton.bind(this);
        this.handleCreateNewDegreeButton = this.handleCreateNewDegreeButton.bind(this);
        this.handleCreateNewUniversityButton = this.handleCreateNewUniversityButton.bind(this);
        this.handleCreateNewExpertiseButton = this.handleCreateNewExpertiseButton.bind(this);

        this.state = {
            degreeTitles: [],
            createNewDegree: false,
            universities: [],
            createNewUniversity: false,
            expertises: [],
            createNewExpertise: false
        };
    }

    componentDidMount() {
        Network.getDegreeTitles().then((degreeTitles) => {
            this.setState({ degreeTitles: degreeTitles });
        });

        Network.getUniversities().then((universities) => {
            this.setState({ universities: universities });
        });

        Network.getExpertises().then((expertises) => {
            this.setState({ expertises: expertises });
        });
    }

    handleCreateNewExpertButton(e) {
        e.preventDefault();

        var firstName = e.target.elements.firstName.value;
        var lastName = e.target.elements.lastName.value;

        Network.createExpert({
            firstName: firstName,
            middleName: e.target.elements.middleName.value,
            lastName: lastName,
            email: e.target.elements.email.value,
            biography: e.target.elements.biography.value,
            degreeTitle: this.state.createNewDegree ? e.target.elements.degreeTitle.value : null,
            expertiseName: this.state.createNewExpertise ? e.target.elements.expertiseName.value : null,
            expertiseId: this.state.createNewDegree ? (this.state.createNewExpertise ? null : e.target.elements.expertiseId.value) : e.target.elements.degreeTitleIdAndExpertiseId.value.split(',')[1],
            degreeTitleId: this.state.createNewDegree ? null : e.target.elements.degreeTitleIdAndExpertiseId.value.split(',')[0],
            universityName: this.state.createNewUniversity ? e.target.elements.universityName.value : null,
            universityLocation: this.state.createNewUniversity ? e.target.elements.universityLocation.value : null,
            universityId: this.state.createNewUniversity ? null : e.target.elements.universityId.value
        }).then((id) => {
            this.props.onUserChange(id, firstName + ' ' + lastName);
        });
    }

    handleCreateNewDegreeButton() {
        this.setState({ createNewDegree: true });
    }

    handleCreateNewExpertiseButton() {
        this.setState({ createNewExpertise: true });
    }

    renderDegreeInput() {
        var leftCol, rightCol;

        if (this.state.createNewDegree) {
            leftCol = (
                <Form.Group controlId="degreeTitle">
                    <Form.Label>What is your degree in?</Form.Label>
                    <Form.Control required placeholder="Degree Title" />
                </Form.Group>
            );

            if (this.state.createNewExpertise) {
                rightCol = (
                    <Form.Group controlId="expertiseName">
                        <Form.Label>What is your expertise in?</Form.Label>
                        <Form.Control required placeholder="Expertise" />
                    </Form.Group>
                );
            } else {
                let options = [];
                for (var expertise of this.state.expertises) {
                    options.push(
                        <option key={expertise.id} value={expertise.id}>{expertise.name}</option>
                    );
                }

                rightCol = (
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="expertiseId">
                                <Form.Label>Select your Expertise</Form.Label>
                                <Form.Control as="select">
                                    {options}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Label>or you can</Form.Label>
                            <Button className="w-100" onClick={this.handleCreateNewExpertiseButton}>Add a New Expertise</Button>
                        </Col>
                    </Form.Row>
                );
            }
        } else {
            let options = [];
            for (var degreeTitle of this.state.degreeTitles) {
                options.push(
                    <option key={degreeTitle.id} value={degreeTitle.id + ',' + degreeTitle.expertise}>{degreeTitle.title}</option>
                );
            }

            leftCol = (
                <Form.Group controlId="degreeTitleIdAndExpertiseId">
                    <Form.Label>Select your Degree Title</Form.Label>
                    <Form.Control as="select">
                        {options}
                    </Form.Control>
                </Form.Group>
            );

            rightCol = (
                <>
                    <Form.Label>or you can</Form.Label>
                    <Button className="w-100" onClick={this.handleCreateNewDegreeButton}>Add a New Degree</Button>
                </>
            );
        }

        return (
            <Form.Row>
                <Col xs={8}>{leftCol}</Col>
                <Col>{rightCol}</Col>
            </Form.Row>
        );
    }

    handleCreateNewUniversityButton() {
        this.setState({ createNewUniversity: true });
    }

    renderUniversityInput() {
        var leftCol, rightCol;

        if (this.state.createNewUniversity) {
            leftCol = (
                <Form.Group controlId="universityName">
                    <Form.Label>What is the name of your University?</Form.Label>
                    <Form.Control required placeholder="University Name" />
                </Form.Group>
            );

            rightCol = (
                <Form.Group controlId="universityLocation">
                    <Form.Label>What is the location of your University?</Form.Label>
                    <Form.Control required placeholder="University Location" />
                </Form.Group>
            );
        } else {
            var options = [];
            for (var university of this.state.universities) {
                options.push(
                    <option key={university.id} value={university.id}>{university.name + ' of ' + university.location}</option>
                );
            }

            leftCol = (
                <Form.Group controlId="universityId">
                    <Form.Label>Select your University</Form.Label>
                    <Form.Control as="select">
                        {options}
                    </Form.Control>
                </Form.Group>
            );

            rightCol = (
                <>
                    <Form.Label>or you can</Form.Label>
                    <Button className="w-100" onClick={this.handleCreateNewUniversityButton}>Add a New University</Button>
                </>
            );
        }

        return (
            <Form.Row>
                <Col xs={8}>{leftCol}</Col>
                <Col>{rightCol}</Col>
            </Form.Row>
        );
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleCreateNewExpertButton}>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="firstName"><Form.Control required placeholder="First name" /></Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="middleName"><Form.Control placeholder="Middle name" /></Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="lastName"><Form.Control required placeholder="Last name" /></Form.Group>
                        </Col>
                    </Form.Row>
                    {this.renderDegreeInput()}
                    {this.renderUniversityInput()}
                    <Form.Group controlId="email"><Form.Control placeholder="Email" type="email" /></Form.Group>
                    <Form.Group controlId="biography"><Form.Control as="textarea" placeholder="Biography" /></Form.Group>
                    <Button type="submit">Create</Button>
                </Form >
            </Container>
        );
    }
}