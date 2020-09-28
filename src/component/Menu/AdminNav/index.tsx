import { inject, observer } from "mobx-react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'

import "./style.sass";

interface AdminNavProps {
    authState?: any;
}

@inject('authState')
@observer
class AdminNav extends React.PureComponent<AdminNavProps> {
    render() {
        return (
            <nav>
                <h4 className={'menu-title'}>УПРАВЛЕНИЕ</h4>
                <div className={'nav-container'}>
                    <div>
                        <nav>
                            <div className={'nav-item'}>
                                <a className={'menu-item nav-inner-item'}>
                                    <i className={'ico ico--bar'}>
                                        <FontAwesomeIcon icon={faAddressCard}/>    
                                    </i>
                                    ТРЕНЕРЫ
                                </a>
                            </div>
                            <div className={'nav-item'}>
                            </div>
                        </nav>
                    </div>
                </div>
            </nav>
        );
    };
};

export default AdminNav;

