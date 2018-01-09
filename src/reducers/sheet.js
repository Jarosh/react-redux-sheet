import {
    DO_SHEET_REQUEST_INITIAL,
    DO_SHEET_RECEIVE_INITIAL,
    DO_SHEET_REPLACE,
    DO_SHEET_PURGE_PRIOR,
    DO_SHEET_UNDO_UPDATE,
    DO_SHEET_UPDATE_CELL,
    DO_SHEET_INSERT_CELL
} from '../actions/sheet';


export default (state = [], action) => {
    switch (action.type) {
        
        case DO_SHEET_REQUEST_INITIAL:
            // @TODO set "loading" flag at some point later on
            return state;
            
        case DO_SHEET_RECEIVE_INITIAL:
            return [
                ...state,
                ...action.sheet
            ];
            
        case DO_SHEET_REPLACE:
            return action.sheet;
            
        case DO_SHEET_PURGE_PRIOR:
            return state.map( (row) => row.map( (col) => ({ value: col.value }) ) );
            
        case DO_SHEET_UNDO_UPDATE:
            return state.map( (row) => row
                .map( (col) => ({ value: (col.prior !== undefined) ? col.prior : col.value }) )
                .filter( (cell) => cell.value !== null && cell.value !== undefined )
            );
        
        case DO_SHEET_UPDATE_CELL:
            return state.map( (row, yIndex) => row.map( (col, xIndex) => {
                return (action.value !== col.value && action.row === yIndex && action.col === xIndex)
                    ? {
                        value: action.value,
                        prior: (col.prior !== undefined) ? col.prior : col.value
                    }
                    : {
                        value: col.value,
                        prior: col.prior
                    };
            } ) );
    
        case DO_SHEET_INSERT_CELL:
            let sheet = state.slice(0);
            if (sheet.length - 1 < action.row) {
                sheet.push([]);
            }
            if (sheet[action.row].length < action.col) {
                sheet[action.row] = [
                    ...action.row,
                    ...Array(action.col - sheet[action.row].length + 1).fill({ value: '', prior: null })
                ];
            }
            sheet[action.row][action.col] = { value: action.value, prior: null };
            return normalizeSheetDimensions(sheet);
            
        default:
            return state;
    }
};


function normalizeSheetDimensions(sheet) {
    let len = sheet.reduce( (a, b) => {
        return (b.length > a.length)
            ? b
            : a;
    } ).length;
    let r = sheet.map( (row) => {
        return (row.length < len)
            ? row.concat(Array(len - row.length).fill({ value: '', prior: null }))
            : row;
    } );
    return r;
}
