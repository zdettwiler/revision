import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from './Auth'


export const PrivateRoute = ({ component: Component, auth: fakeAuth, ...rest }) => (
  <Route {...rest} render={props =>
      Auth.isAuthenticated()
        ? (<Component {...props} />)
        : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
)
