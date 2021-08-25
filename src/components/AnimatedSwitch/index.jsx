/*
 * @Descripttion:
 * @version:
 * @Author: wanglong
 * @Date: 2021-08-25 10:41:27
 * @LastEditors: wanglong
 * @LastEditTime: 2021-08-25 10:45:35
 * @* : 博虹出品，抄袭必究😄
 */
import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch } from "react-router-dom";
import "./index.scss";

const AnimatedSwitch = (props) => {
  const { children } = props;
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames={props.type || "fade"} timeout={props.duration || 300}>
            <Switch location={location}>{children}</Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
};

export default AnimatedSwitch;
