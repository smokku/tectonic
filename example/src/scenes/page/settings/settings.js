import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  reduxForm,
  getFormValues,
} from 'redux-form';
import { connect } from 'react-redux';
import load from 'tectonic';
import css from 'react-css-modules';
import Page from '../../../models/page.js';
import Select from './select.js';
import styles from './settings.css';

@load()
@connect(state => ({ fields: getFormValues('pageSettings')(state) }))
@reduxForm({
  form: 'pageSettings',
  fields: ['url', 'name', 'threshold'],
})
@css(styles)
export default class PageSettings extends PureComponent {
  static propTypes = {
    page: PropTypes.instanceOf(Page),
    // tectonic
    updateModel: PropTypes.func,
    // redux-form
    fields: PropTypes.shape({
      // url: PropTypes.string,
      // name: PropTypes.string,
      threshold: PropTypes.string,
    }),
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
  }

  onSubmit = () => {
    const opts = {
      model: this.props.page,
      params: {
        id: this.props.page.id,
      },
    };
    this.props.updateModel(opts, () => {});
  }

  chooseThreshold = (mode) => () => {
    this.props.change('threshold', mode);
  }

  render() {
    return (
      <div styleName='wrapper'>
        <h2>Page settings</h2>

        <form onSubmit={ this.props.handleSubmit(this.onSubmit) }>
          <div styleName='form'>
            <div styleName='inputs'>
              <label htmlFor='url'>URL
                <Field name='url' component='input' type='text' />
              </label>

              <label htmlFor='url'>
                <span>Page name (optional)</span>
                <Field name='name' component='input' type='text' />
              </label>
            </div>

            <div styleName='threshold'>
              <label htmlFor='threshold'>Page change threshold <span>(also affects notifications)</span></label>

              <Select
                mode='all'
                isSelected={ this.props.fields.threshold === 'all' }
                onClick={ this.chooseThreshold('all') }
              >
                <div>
                  <p>Show all changes</p>
                  <span>Monitor when any part of the monitored area updates</span>
                </div>
              </Select>
              <Select
                mode='small'
                isSelected={ this.props.fields.threshold === 'small' }
                onClick={ this.chooseThreshold('small') }
              >
                <div>
                  <p>Show small changes</p>
                  <span>Monitor smaller updates and ignore minor changes like dates</span>
                </div>
              </Select>
              <Select
                mode='large'
                isSelected={ this.props.fields.threshold === 'large' }
                onClick={ this.chooseThreshold('large') }
              >
                <div>
                  <p>Show large changes</p>
                  <span>
                    Monitor only substantial updates and ignore
                    larger unimportant elements
                  </span>
                </div>
              </Select>
            </div>
          </div>

          <hr />

          <button type='delete'>Delete this page</button>
          <button type='submit'>Save</button>
        </form>
      </div>
    );
  }
}
