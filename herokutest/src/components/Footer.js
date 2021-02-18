import React from 'react';
import Card from 'react-bootstrap/Card';

export default class Footer extends React.Component {
    render() {
        return (
            <Card bg="dark" text="white" className="text-center fixed-bottom rounded-0">
                <Card.Body className="p-2">
                    Brought to you by Dr. Steven Brown and some coders
                </Card.Body>
            </Card>
        );
    }
}