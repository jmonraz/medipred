import React from "react";

// components
import OverlayBox from "../../components/OverlayBox";
import { render } from "@testing-library/react";

const ReportsScreen = () => {

    const renderComponent = () => {
        return (
            <>
                <p className="text-centered">Under construction...</p>
            </>
        );
    };
    return (
        <>
            <OverlayBox>
                {renderComponent()}
            </OverlayBox>
        </>
    );
};

export default ReportsScreen;