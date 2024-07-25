import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

import { UserAuthContext } from '../context/UserContext';

export default function RequireAuth({ children }) {
  const context = useContext(UserAuthContext);

  if (context.tokenStatus) {
    return <Navigate to={'/sign-in'} />;
  }

  return children;
}
