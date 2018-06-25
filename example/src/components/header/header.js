import React from 'react';
import PropTypes from 'prop-types';
import css from 'react-css-modules';
import styles from './header.css';

const Header = ({ children }) => (
  <div styleName='header'>
    { children }
  </div>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default css(styles)(Header);
