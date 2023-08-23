import { SET_STATE_FROM_YJS_ACTION } from 'redux-yjs-bindings';
import { Reducer, Store } from 'redux';
import * as _ from 'lodash';

/** While not supported by the original implementation, this `enhanceReducer` allows binding of multiple slices
 * https://github.com/lscheibel/redux-yjs-bindings/issues/9
 **/
export const enhanceReducer =
  <S>(currentReducer: Reducer<S>, name: string): Reducer<S> =>
  (state, action) => {
    if (action?.type === SET_STATE_FROM_YJS_ACTION) {
      const validKeys = Object.keys(state||{});  // This implementation expects that initialState already contains all validKeys
      const validPayload: typeof action.payload = _.pickBy(action.payload||{}, (_value, key) => _.includes(validKeys, key));
      //const validPayload = action.payload||{}  // TODO check if the filter is required
      const result = {...state, ...validPayload}
      //console.warn(action.type, name, {state, action, result, validPayload})
      console.assert(Object.keys(validPayload).every( k => Object.keys(state||{}).includes(k) ), {pl: validPayload, state})
      return result
    } else {
      const result = currentReducer(state, action);
      return result
    }
  };
