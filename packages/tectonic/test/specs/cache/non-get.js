'use strict';

import { assert } from 'chai';
import sinon from 'sinon';

import Cache from '../../../src/cache';
import Query from '../../../src/query';
import SourceDefinition from '../../../src/sources/definition';
import Provider from '../../../src/sources/provider';
import {
  CREATE,
  UPDATE,
  DELETE,
  RETURNS_ITEM,
  RETURNS_LIST,
  RETURNS_ALL_FIELDS,
} from '../../../src/consts';
// test stuff
import { User, Post } from '../../models';
import { createStore } from '../../manager';

describe('cache for non-GET requests', () => {
  const store = createStore()
  const cache = new Cache(store);
  const spy = sinon.spy(cache, 'cachedQueryIds');

  let query = new Query({
    queryType: CREATE,
    model: User,
    body: {
      id: 1
    }
  });

  it('should never call cachedQueryIds for non-get requests and always returns false', () => {
    // cachedQueryIds is called to determine which data to pull from the cache
    // for any given query. For non-GET queries this should never even be
    // called.
    [CREATE, UPDATE, DELETE].forEach(type => {
      // Set the query type.
      query.queryType = type;
      // Get query data
      const [data, ok] = cache.getQueryData(query, store.getState().tectonic);
      // Ensure cachedQueryIds was never called.
      assert.isFalse(spy.called);
      spy.resetHistory();
      // Assert that the tuple returned [undefined, false]
      assert.isFalse(ok);
      assert.isUndefined(data);
    });
  });

  describe('DELETE requests', () => {
    const sd = new SourceDefinition({
      queryType: DELETE,
      params: ['id'],
      meta: {}
    });

    it('throws an error if deletes occur with no model ID', () => {
      const query = new Query({
        queryType: DELETE,
        model: User,
        params: { id: 1 }
      });
      assert.throws(
        () => cache.storeQuery(query, sd, undefined),
        "unknown model ID during DELETE in query",
      );
    });

    it('sets data as "deleted" in .data', () => {
      const store = createStore()
      const cache = new Cache(store);
      const spy = sinon.spy(cache, 'cachedQueryIds');
      const query = new Query({
        queryType: DELETE,
        model: User,
        modelId: 1,
        params: { id: 1 }
      });

      let state = store.getState().tectonic.toJS();
      assert.isUndefined(state.data.user);

      cache.storeQuery(query, sd, undefined);
      state = store.getState().tectonic.toJS();
      assert.isTrue(state.data.user["1"].deleted);
    });

    it('updates query status to SUCCESS', () => {
      const store = createStore()
      const cache = new Cache(store);
      const spy = sinon.spy(cache, 'cachedQueryIds');
      const query = new Query({
        queryType: DELETE,
        model: User,
        modelId: 1,
        params: { id: 1 }
      });
      cache.storeQuery(query, sd, undefined);

      let state = store.getState().tectonic.toJS();
      assert.deepEqual(state.status[query.toString()], { status: 'SUCCESS' });
    });
  });

});
