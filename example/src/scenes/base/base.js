import React from 'react';
import PropTypes from 'prop-types';
import css from 'react-css-modules';
import { Link } from 'react-router';
import styles from './base.css';

const UnstyledBase = ({ children }) => (
  <div>
    <div styleName="header">
      <Link to='/' className='dashboard'>Dashboard</Link>
    </div>
    { children }
  </div>
);

UnstyledBase.propTypes = {
  children: PropTypes.node,
};

export default css(styles)(UnstyledBase);
export { UnstyledBase };
