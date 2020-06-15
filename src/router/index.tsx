import React, { Fragment } from 'react'
import Routes from './routes'
import renderRoutes from './renderRoutes'
import { HashRouter as Router  } from 'react-router-dom'

const authed = false;
class RouterContainer extends React.Component {
    render() {
        return (
            <Router>
                {renderRoutes(Routes, authed)}
            </Router>
        ) 
    }
}
export default RouterContainer;
