import React from 'react';
import PropTypes from 'prop-types';
import Scan from '../../../models/scan.js';
import Tag from '../../../components/tag/tag.js';
import AddTag from './addTag.js';

const TagList = ({ scan }) => (
  <div>
    { scan.tags.map(t => <Tag key={ t } tag={ t } deletable />) }
    <AddTag scan={ scan } />
  </div>
);

TagList.propTypes = {
  scan: PropTypes.instanceOf(Scan),
};

export default TagList;
