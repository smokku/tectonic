import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ui from 'redux-ui';
import css from 'react-css-modules';
import styles from './addTag.css';

@ui()
@css(styles)
export default class AddTag extends Component {

  static propTypes = {
    // UI inherited from page.js, so that clicking a scan resets
    // the UI.
    ui: PropTypes.shape({ isAddTagVisible: PropTypes.bool }),
    updateUI: PropTypes.func,
  }

  showForm = (evt) => {
    evt.preventDefault();
    this.props.updateUI({ isAddTagVisible: true });
  }

  render() {
    const { isAddTagVisible } = this.props.ui;

    if (!isAddTagVisible) {
      return <button styleName='addTag' onClick={ this.showForm }>+</button>;
    }

    return (
      <div styleName='wrapper'>
        <input type='text' styleName='tagName' />
      </div>
    );
  }
}
