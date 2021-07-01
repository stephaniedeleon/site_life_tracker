import React, { useContext } from "react";
import AuthContext from "contexts/auth";
import { Login } from "components";

export default function ProtectedRoute({ element }) {

    const { user, authenticated } = useContext(AuthContext);

    if(!authenticated && !user?.username) return <Login message="You must be logged in to access this page."/>

    return <>{element}</>
}