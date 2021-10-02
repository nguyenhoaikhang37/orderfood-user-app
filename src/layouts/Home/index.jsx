import Header from 'components/Header';
import React, { Fragment } from 'react';
import { Route } from 'react-router';

const HomeLayout = ({ Component, ...restProps }) => {
  return (
    <Route
      {...restProps}
      render={(routeProps) => {
        return (
          <Fragment>
            <Header />
            <Component {...routeProps} />
          </Fragment>
        );
      }}
    />
  );
};

export default HomeLayout;
