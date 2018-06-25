import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Page from '../../models/page';

const DashboardPage = ({ page }) => (
  <Link to={ `/sites/${page.site.domain}/pages/${page.id}` }>
    <img alt='scan' src={ page.lastScan.imageUrl() } width="250" />
    <p>{ page.name }</p>
  </Link>
);

DashboardPage.propTypes = {
  page: PropTypes.instanceOf(Page),
};

export default DashboardPage;
