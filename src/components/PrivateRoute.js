import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
    const loggedIn = useSelector(state=>state.auth.loggedIn)

    return (
      <Route {...rest} render={( {location} ) =>
          loggedIn ? (
            children
          ) : (
            <Redirect
                to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

export default PrivateRoute