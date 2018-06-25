import React from 'react';
import PropTypes from 'prop-types';
import css from 'react-css-modules';
import styles from './header.css';

const LeftHeader = ({ children }) => (
  <div styleName='left'>
    { children }
  </div>
);

LeftHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default css(styles)(LeftHeader);
