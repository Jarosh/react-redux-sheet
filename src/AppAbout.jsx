import React from 'react';
import ReactDOM from 'react-dom';


export default class AppAbout extends React.Component {


    render() {
        return (
            <div className={'com-'+this.constructor.name}>
                <p>
                    <b>react-redux-sheet</b> is an example application.
                </p>
                <p>
                    Besides
                    &nbsp;<a href="https://www.npmjs.com/package/react" target="_blank">react</a>,
                    &nbsp;<a href="https://www.npmjs.com/package/react-router" target="_blank">react-router</a>,
                    &nbsp;<a href="https://www.npmjs.com/package/react-redux" target="_blank">react-redux</a>
                    &nbsp;following libraries were used:
                </p>
                <ul>
                    <li>
                        <a href="https://github.com/reactjs/react-modal" target="_blank">react-modal</a>
                    </li>
                    <li>
                        <a href="https://github.com/nadbm/react-datasheet" target="_blank">react-datasheet</a>
                    </li>
                </ul>
            </div>
        );
    }


}
