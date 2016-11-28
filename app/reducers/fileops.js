// @flow
import { SELECT_DATA_DIRECTORY, LOAD_FILES_REQUEST, LOADED_FILES_RESPONSE, LOAD_FILES_FAILED, SAVE_FILES_REQUEST, SAVED_FILES_RESPONSE, SAVED_FILES_FAIL, SEARCH_REQUEST, OPEN_FILEEDIT, EDIT_FIELD_CHANGE } from '../actions/fileops';


export function search(state: string = '', action: Object) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return action.request;
    default:
      return state;
  }
}


export function dir(state: string = '', action: Object) {
  switch (action.type) {
    case SELECT_DATA_DIRECTORY:
      return action.dir;
    default:
      return state;
  }
}


export function open(state: string = '', action: Object) {
  switch (action.type) {
    case OPEN_FILEEDIT:
      return action.open;
    default:
      return state;
  }
}


export function save(state: Object = {
  isSaving: false,
  unsavedEdits: false,
  files: []
}, action: Object) {
  switch (action.type) {
    case SAVE_FILES_REQUEST:
      return Object.assign({}, state, {
        isSaving: true,
        unsavedEdits: false
      });
    case SAVED_FILES_RESPONSE:
      return Object.assign({}, state, {
        isSaving: false,
        unsavedEdits: false,
        files: action.files,
        lastSaved: action.receivedAt
      });
    case SAVED_FILES_FAIL:
      return Object.assign({}, state, {
        isSaving: false,
        unsavedEdits: true
      });
    default:
      return state;
  }
}


export function edit(state: string = '', action: Object) {
  switch (action.type) {
    case EDIT_FIELD_CHANGE:
      return action.edit;
    default:
      return state;
  }
}


export function data(state: Object = {
  isFetching: false,
  files: []
}, action: Object) {
  switch (action.type) {
    case LOAD_FILES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case LOADED_FILES_RESPONSE:
      return Object.assign({}, state, {
        isFetching: false,
        files: action.files,
        lastUpdated: action.receivedAt
      });
    case LOAD_FILES_FAILED:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
