import React from 'react';
import { Navigate, Route} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const PrivateRoute = ({children,...rest}) => {
  
  const {isAuthenticated} = useAuth0();
    if (!isAuthenticated) {
    return <Navigate to='/' />;
  }
  return children;

};
export default PrivateRoute;
