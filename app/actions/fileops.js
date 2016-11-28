// @flow
export const SELECT_DATA_DIRECTORY = 'SELECT_DATA_DIRECTORY';
export const LOAD_FILES_REQUEST = 'LOAD_FILES_REQUEST';
export const LOADED_FILES_RESPONSE = 'LOADED_FILES_RESPONSE';
export const LOAD_FILES_FAILED = 'LOAD_FILES_FAILED';

export const SAVE_FILES_REQUEST = 'SAVE_FILES_REQUEST';
export const SAVED_FILES_RESPONSE = 'SAVED_FILES_RESPONSE';
export const SAVED_FILES_FAIL = 'SAVED_FILES_FAIL';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const OPEN_FILEEDIT = 'OPEN_FILEEDIT';

export const EDIT_FIELD_CHANGE = 'EDIT_FIELD_CHANGE';


export function selectDir(dir: string ='') {
  return {
    type: SELECT_DATA_DIRECTORY,
    dir
  };
}

export function requestFiles(dir: string ='') {
  return {
    type: LOAD_FILES_REQUEST,
    dir
  };
}


export function receiveFiles(dir: string = '', json: Object) {
  return {
    type: LOADED_FILES_RESPONSE,
    dir,
    files: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}


// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchFiles(dir: string) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch: Function) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestFiles(dir));
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`http://www.reddit.com/r/${dir}.json`)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveFiles(dir, json))
      );

      // In a real world app, you also want to
      // catch any error in the network call.
  };
}
