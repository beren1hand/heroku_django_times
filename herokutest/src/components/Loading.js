import ReactLoading from "react-loading";
import React from 'react';

export default class Loading extends React.Component {
    render() {
        return (
                <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white" 
                }}>
                    <ReactLoading type={"spinningBubbles"} color={"blue"} height={'10%'} width={'10%'} />
                </div>
        )
    }
}