import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import NotFound from "../notFound/ContentNotFound";

const ProtectedRoute = ({ component: Component, session, ...rest }) => (
  <Route
    {...rest}
    render={props =>
        rest.permisos && rest.permisos.filter(i => i === session.user.permisos).length > 0 ? (
            <Component {...props} />
        ) : (
            <NotFound statusCode="401"/>
        )
    }
  />
);

const mapStateToProps = (state) => {

    const { session } = state;

    return {
        session
    }
}

export default connect(mapStateToProps)(ProtectedRoute);
