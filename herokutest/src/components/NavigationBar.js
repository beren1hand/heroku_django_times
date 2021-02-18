import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import PhdpoolLogo from '../images/phdpoolLogo.svg';
import Button from 'react-bootstrap/esm/Button';
import App from './App';
import WebAppPath from '../utilities/WebAppPath';

export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.onUserChange(App.NO_USER_ID, App.NO_USER_NAME);
    }

    renderUserOrLogin() {
        var userName = this.props.getUserName();

        if (userName) {
            return (
                <>
                    <Navbar.Text>{userName}</Navbar.Text>
                    <Button className="ml-2" variant="secondary" onClick={this.handleLogout}>Logout</Button>
                </>
            );
        } else {
            return (
                <Navbar.Text><a href={WebAppPath.getLoginHash()}>Login</a></Navbar.Text>
            );
        }
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href={WebAppPath.getHomeHash()}>
                    <img
                        src={PhdpoolLogo}
                        alt="PhD Pool Logo"
                        width="125"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href={WebAppPath.getHomeHash()}>Home</Nav.Link>
                        <Nav.Link href={WebAppPath.getExpertsHash()}>Experts</Nav.Link>
                        <Nav.Link href={WebAppPath.getCreateAccountHash()}>Create Account</Nav.Link>
                    </Nav>
                    {this.renderUserOrLogin()}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}