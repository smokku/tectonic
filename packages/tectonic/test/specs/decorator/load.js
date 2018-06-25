import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { assert } from 'chai';
import sinon from 'sinon';
import { renderAndFind } from '../../utils';

import load from '../../../src/decorator';
import Status from '../../../src/status/status';
import { User, Post } from '../../models';
import { createNewManager } from '../../manager';

describe('@load decorators .load prop', () => {
  it('loads new data when passed an object with GET queries', (done) => {
    // This is the data returned from the API and should be within the
    // components props.
    const data = {
      user: {
        id: 1,
        name: 'works',
        email: 'some@example.com',
      },
      post: {
        id: 1,
        title: 'loaded after decorator. boom-ting',
      },
    };

    const manager = createNewManager();
    manager.drivers.fromMock([
      {
        id: 'userSource',
        meta: {
          returns: data.user
        },
        params: ['id'],
        returns: User.item(),
      },
      {
        id: 'postSource',
        meta: {
          returns: data.post
        },
        params: ['userID', 'id'],
        returns: Post.item(),
      },
    ]);

    class A extends Component {
      static propTypes = {
        user: PropTypes.instanceOf(User),
      }

      loadPosts() {
        // TODO: Statuses when .load returns Status models
        this.props.load({
          somePost: Post.getItem({ userID: this.props.user.id, id: 1 }),
        });
      }

      render() {
        const { status } = this.props;
        if (status.somePost && status.somePost.isSuccess()) {
          done();
        }

        return (<p>Some stuff</p>);
      }
    }

    const WrappedComponent = load({
      user: User.getItem({ id: 1 })
    })(A);
    const item = renderAndFind(<WrappedComponent />, A, manager);

    window.setTimeout(() => {
      assert.deepEqual(item.props.status.user, new Status({ status: 'SUCCESS' }));
      assert.deepEqual(item.props.user.values(), data.user);
      assert.isUndefined(item.props.status.somePost);
      assert.isUndefined(item.props.somePost);
      item.loadPosts();

      window.setTimeout(() => {
        // User should still be the same
        assert.deepEqual(item.props.status.user, new Status({ status: 'SUCCESS' }));
        assert.deepEqual(item.props.user.values(), data.user);
        // Check posts got added
        assert.deepEqual(item.props.status.user, new Status({ status: 'SUCCESS' }));
        assert.deepEqual(item.props.somePost.values(), data.post);
      });

    }, 10);

  });


});
