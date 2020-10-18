import { inject, observer } from 'mobx-react';
import React from 'react';

import './style.sass';
import './script.jsx'

interface PageNotFoundProps {
    authState?: any;
}

@inject('authState')
@observer
class PageNotFound extends React.PureComponent<PageNotFoundProps> {
    render() {
        return (
            <div className={"page-container"}>
                <div className={"page-not-found-body"}>
                    <div className={'text'}>
                        <h1>404</h1>
                        <h2>Ой</h2>
                        <h3>Извините, мы не модем найти то, что вы ищите, потому что тут слишком темно</h3>
                    </div>
                    <div className={'torch'}></div>
                </div>
            </div>
        );
    }
}

export default PageNotFound;
