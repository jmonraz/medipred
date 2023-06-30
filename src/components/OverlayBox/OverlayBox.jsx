import React from "react";
import "./OverlayBox.css";
import GraphBox from "../GraphBox";

const OverlayBox = () => {
    return (
        <div className="overlay-box">
            <div className="flex-box">
                <GraphBox>GRAPH 1</GraphBox>
                <GraphBox>GRAPH 2</GraphBox>
            </div>
            <div className="flex-box">
                {/*code here for table*/}
                <GraphBox>GRAPH 3</GraphBox>
            </div>
        </div>
    )
}

export default OverlayBox;