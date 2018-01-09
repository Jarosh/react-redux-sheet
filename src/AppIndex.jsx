import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import ReactDataSheet from 'react-datasheet';
import { connect } from 'react-redux';
import ComSheetPreview from './ComSheetPreview.jsx';
import {
    fetchInitialSheetIfShould,
    doPurgeSheetPriorValues,
    doUndoSheetUpdate,
    doUpdateSheetCell,
    doInsertSheetCell
} from './actions'


class AppIndex extends React.Component {


    constructor (props) {
        super(props);

        Modal.defaultStyles.content.margin = '50px';
        
        this.onOpenSheet = this.onOpenSheet.bind(this);
        this.onSaveSheet = this.onSaveSheet.bind(this);
        this.onUndoSheet = this.onUndoSheet.bind(this);
        this.onChangeGrid = this.onChangeGrid.bind(this);
        this.onPasteIntoGrid = this.onPasteIntoGrid.bind(this);
    }
  
  
    componentDidMount() {
        if (this.props.isModalOpen) {
            this.loadSheetForEditing();
        }
    }
    
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.isModalOpen && this.props.isModalOpen !== nextProps.isModalOpen) {
            this.loadSheetForEditing();
        }
    }
    
    
    findCellPosition(grid, cell) {
        for (let yIndex = 0; yIndex < grid.length; yIndex++) {
            for (let xIndex = 0; xIndex < grid[yIndex].length; xIndex++) {
                if (cell === grid[yIndex][xIndex]) {
                    return { y: yIndex, x: xIndex };
                }
            }
        }
    }


    loadSheetForEditing() {
        this.props.dispatch(fetchInitialSheetIfShould());
        this.props.dispatch(doPurgeSheetPriorValues());
    }


    onOpenSheet() {
        this.props.history.push('/sheet');
    }
    
    
    onSaveSheet() {
        this.props.history.push('/');
    }
    
    
    onUndoSheet() {
        this.props.dispatch(doUndoSheetUpdate());
        this.props.history.push('/');
    }
    
    
    onChangeGrid(cell, row, col, value) {
        this.props.dispatch(doUpdateSheetCell(row, col, value));
    }
    
    
    onPasteIntoGrid(rows) {
        let pos;
        let min;
        let tmp = this.props.sheet.slice(0);
        rows.forEach( (row) => {
            if (pos) {
                pos.y++;
                pos.x = !isNaN(parseInt(min)) ? min : -1;
            }
            row.forEach( (col, ind) => {
                if (pos) {
                    pos.x++;
                }
                if (col.cell) {
                    pos = this.findCellPosition(tmp, col.cell);
                    min = (ind === 0) ? ( (pos ? pos.x : 0) - 1 ) : min;
                    //console.log(`@ ${ind} / ${min} / ${JSON.stringify(pos)} / ${JSON.stringify(col.cell)}`);
                }
                if (pos) {
                    //console.log(`${JSON.stringify(pos)} / ${col.data}`);
                    if (col.cell && col.cell.value !== col.data) {
                        this.props.dispatch(doUpdateSheetCell(pos.y, pos.x, col.data));
                    } else if (!col.cell) {
                        this.props.dispatch(doInsertSheetCell(pos.y, pos.x, col.data));
                    }
                }
            } );
        } );
    }
    

    render() {
        return (
            <div className={'com-'+this.constructor.name}>
                <button onClick={ this.onOpenSheet }>Show Table</button>
                <br/><br/>
                { !this.props.isModalOpen ? <ComSheetPreview grid={ this.props.sheet }></ComSheetPreview> : null }
                <Modal
                  isOpen={ !!this.props.isModalOpen }
                  ariaHideApp={ false }
                  contentLabel="Modal"
                >
                    <ReactDataSheet
                        data={ this.props.sheet }
                        valueRenderer={ (cell) => cell.value }
                        onChange={ this.onChangeGrid }
                        onPaste={ this.onPasteIntoGrid }
                    />
                    <br/>
                    <button onClick={ this.onSaveSheet }>Save Table</button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={ this.onUndoSheet }>Cancel / Discard</button>
                </Modal>
            </div>
        );
    }


}


export default connect(
    (state) => ({
        sheet: state.sheet
    })
)(AppIndex);
