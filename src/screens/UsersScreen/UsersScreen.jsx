import React from "react";

// components
import OverlayBox from "../../components/OverlayBox";

const UsersScreen = () => {

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

export default UsersScreen;