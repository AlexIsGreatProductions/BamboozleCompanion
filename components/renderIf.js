/*  This is used to hide/show views.
Found from https://stackoverflow.com/questions/30266831/hide-show-components-in-react-native/38051258#38051258
 */

'use strict';
const isFunction = input => typeof input === 'function';
export default predicate => elemOrThunk =>
    predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null;