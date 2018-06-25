import React from 'react';
import PropTypes from 'prop-types';
import css from 'react-css-modules';
import styles from './month.css';

const Month = ({ month }) => <p styleName='month'>{ month }</p>;

Month.propTypes = {
  month: PropTypes.string,
};

export default css(styles)(Month);
