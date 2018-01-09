import React from 'react';
import ReactDOM from 'react-dom';


export default class ComSheetPreview extends React.Component {


    renderRow(row, ind) {
        return (
            <tr key={ ind }>
                { row.map( (col, ind) => this.renderCol(col, ind) ) }
            </tr>
        );
    }
    
    
    renderCol(col, ind) {
        let styleChanged = {
            fontWeight: 'bold',
            backgroundColor: 'orange'
        };
        return (
            <td key={ ind } style={ (col.prior !== undefined) ? styleChanged : null }>{ col.value }</td>
        );
    }
    
    
    render() {
        return (
            <table className={'table table-bordered ' + 'com-'+this.constructor.name}>
                <tbody>
                    { this.props.grid.map( (row, ind) => this.renderRow(row, ind) ) }
                </tbody>
            </table>
        );
    }


}
