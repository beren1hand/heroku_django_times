import React from 'react';
import Conviction from '../utilities/Conviction';
import './LikertInput.css';

export default class LikertInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelection = this.handleSelection.bind(this);

        this.title = props.title || 'Default Likert Scale title';
        this.onConvictionChange = props.onConvictionChange || function () { };
    }

    handleSelection(e) {
        this.onConvictionChange(e.target.value);
    }

    render() {
        var options = Conviction.ALL_CONVICTIONS.map((/** @type {Conviction} */ conviction) => {
            return (
                <li key={conviction.value}>
                    <input type="radio" name="likert" value={conviction.value} onClick={this.handleSelection} />
                    <label>{conviction.string}</label>
                </li>
            );
        });

        return (
            <form>
                <label className="statement">{this.title}</label>
                <ul className='likert'>{options}</ul>
            </form>
        );
    }
}