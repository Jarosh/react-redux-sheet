import fetch from 'cross-fetch'


export const DO_SHEET_REQUEST_INITIAL   = 'DO_SHEET_REQUEST_INITIAL';
export const DO_SHEET_RECEIVE_INITIAL   = 'DO_SHEET_RECEIVE_INITIAL';
export const DO_SHEET_REPLACE           = 'DO_SHEET_REPLACE';
export const DO_SHEET_PURGE_PRIOR       = 'DO_SHEET_PURGE_PRIOR';
export const DO_SHEET_UNDO_UPDATE       = 'DO_SHEET_UNDO_UPDATE';
export const DO_SHEET_UPDATE_CELL       = 'DO_SHEET_UPDATE_CELL';
export const DO_SHEET_INSERT_CELL       = 'DO_SHEET_INSERT_CELL';


export function fetchInitialSheetIfShould() {
    return (dispatch, getState) => shouldFetchInitialSheet(getState()) ? dispatch(fetchInitialSheet()) : undefined;
}


export function doRequestInitialSheet() {
    return {
        type: DO_SHEET_REQUEST_INITIAL
    };
}


export function doReceiveInitialSheet(json) {
    return {
        type: DO_SHEET_RECEIVE_INITIAL,
        sheet: json
    };
}


export function doReplaceSheet(json) {
    return {
        type: DO_SHEET_REPLACE,
        sheet: json
    };
}


export function doPurgeSheetPriorValues() {
    return {
        type: DO_SHEET_PURGE_PRIOR
    };
}


export function doUndoSheetUpdate() {
    return {
        type: DO_SHEET_UNDO_UPDATE
    };
}


export function doUpdateSheetCell(row, col, value) {
    return {
        type: DO_SHEET_UPDATE_CELL,
        row,
        col,
        value
    };
}


export function doInsertSheetCell(row, col, value) {
    return {
        type: DO_SHEET_INSERT_CELL,
        row,
        col,
        value
    };
}


function shouldFetchInitialSheet(state) {
    return !state.sheet.length;
}


function fetchInitialSheet() {
    return dispatch => {
        dispatch(doRequestInitialSheet());
        return fetch(`mock.json`)
            .then(response => response.json())
            .then(json => dispatch(doReceiveInitialSheet(json)));
    };
}
