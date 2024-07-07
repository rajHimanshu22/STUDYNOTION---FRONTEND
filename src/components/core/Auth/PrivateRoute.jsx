import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {token} = useSelector((state) => state.auth); // phle token le aao 

    if(token !== null) // login hai tb
        return children
    else
        return <Navigate to="/login" /> // login nhi hai tb

}

export default PrivateRoute