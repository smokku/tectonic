import React from 'react';
import PropTypes from 'prop-types';
import css from 'react-css-modules';
import styles from './hex.css';

const Hex = ({ children }) => (
  <div styleName='hex'>
    <i styleName='icon' />
    <span>{ children }</span>
  </div>
);

Hex.propTypes = {
  children: PropTypes.node.isRequired,
};

export default css(styles)(Hex);
