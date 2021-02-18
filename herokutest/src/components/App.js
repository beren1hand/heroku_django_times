import React from 'react';
import NavigationBar from './NavigationBar';
import HomeBody from './bodies/HomeBody';
import Footer from './Footer';
import WorkInProgress from './bodies/WorkInProgress';
import ExpertsBody from './bodies/ExpertsBody';
import Login from './bodies/Login';
import Container from 'react-bootstrap/Container'
import CreateExpert from './bodies/CreateExpert';
import IdeaBody from './bodies/IdeaBody';
import OpinionBody from './bodies/OpinionBody';
import ExpertBody from './bodies/ExpertBody';
import WebAppPath from '../utilities/WebAppPath';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default class App extends React.Component {
    static NO_USER_ID = '-1';
    static NO_USER_NAME = '';

    constructor(props) {
        super(props);

        this.handleUserChange = this.handleUserChange.bind(this);
        this.giveUserName = this.giveUserName.bind(this);

        this.state = {
            path: new WebAppPath(window.location.hash),
            userId: App.NO_USER_ID,
            userName: App.NO_USER_NAME
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({ path: new WebAppPath(window.location.hash) });
        });
    }

    handleUserChange(id, name) {
        var hash = WebAppPath.getHomeHash();
        window.history.pushState(null, '', hash);
        this.setState({
            userId: id,
            userName: name,
            path: new WebAppPath(hash)
        });
    }

    giveUserName() {
        return this.state.userName;
    }

    getBody() {
        var path = this.state.path;

        if (path.isHome()) {
            return <HomeBody />;
        } else if (path.isExperts()) {
            return <ExpertsBody />;
        } else if (path.isLogin()) {
            return <Login onUserChange={this.handleUserChange} />;
        } else if (path.isCreateAccount()) {
            return <CreateExpert onUserChange={this.handleUserChange} />;
        } else if (path.isIdea()) {
            return <IdeaBody id={path.id} />;
        } else if (path.isContact()) {
            return <WorkInProgress />;
        } else if (path.isAbout()) {
            return <WorkInProgress />;
        } else if (path.isOpinion()) {
            return <OpinionBody id={path.id} />;
        } else if (path.isExpert()) {
            return <ExpertBody id={path.id} />;
        } else {
            // TODO: We need to create a "Page Not Found" page
            return <WorkInProgress />;
        }
    }

    render() {
        return (
            <React.StrictMode>
                <NavigationBar getUserName={this.giveUserName} onUserChange={this.handleUserChange} />
                <Container fluid className="mb-5 mt-3">{this.getBody()}</Container>
                <Footer />
            </React.StrictMode>
        );
    }
}