import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default class WorkInProgress extends React.Component {
    render() {
        return (
            <Jumbotron className="text-center">
                <h1>Work in Progress</h1>
                <p>
                    This page is a work in progress. Please come back later.
                </p>
            </Jumbotron>
        );
    }
}