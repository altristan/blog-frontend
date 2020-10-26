import React from 'react';
import {withRouter} from "react-router";

function NotFound(): JSX.Element {
    console.log('page not found');
    return(
        <h1 className="fixed-top-margin">
            Page Not Found
        </h1>
    )
}

export default withRouter(NotFound)