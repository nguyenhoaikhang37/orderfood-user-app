import ButtonCart from 'components/ButtonCart';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { ACCESS_TOKEN } from 'constants/global';
import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router';

const HomeLayout = ({ Component, ...restProps }) => {
  const isLogin = Boolean(localStorage.getItem(ACCESS_TOKEN));

  if (!isLogin) {
    return <Redirect to="/auth/signin" />;
  }

  return (
    <Route
      {...restProps}
      render={(routeProps) => {
        return (
          <Fragment>
            <Header />
            <Component {...routeProps} />
            <Footer />
            <ButtonCart />
          </Fragment>
        );
      }}
    />
  );
};

export default HomeLayout;
