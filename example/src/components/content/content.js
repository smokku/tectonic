import React from 'react';
import PropTypes from 'prop-types';
import css from 'react-css-modules';
import styles from './content.css';

const Content = ({ children }) => (
  <div styleName='content'>
    { children }
  </div>
);

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default css(styles)(Content);
