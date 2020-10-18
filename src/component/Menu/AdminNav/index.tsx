import { inject, observer } from "mobx-react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'

import "./style.sass";
import history from "global/history";

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
                                <a className={'menu-item nav-inner-item'} href='/trainers'>
                                    <i className={'ico ico--bar'}>
                                        <FontAwesomeIcon icon={faAddressCard}/>    
                                    </i>
                                    ТРЕНЕРЫ
                                </a>
                            </div>
                            <div className={'nav-item'}>
                                <a className={'menu-item nav-inner-item'} href='/courses'>
                                    <i className={'ico ico--bar'}>
                                        <FontAwesomeIcon icon={faGraduationCap}/>    
                                    </i>
                                    КУРСЫ
                                </a>
                            </div>
                            <div className={'nav-item'}>
                                <a className={'menu-item nav-inner-item'} onClick={()=> history.push('/users')}>
                                    <i className={'ico ico--bar'}>
                                        <FontAwesomeIcon icon={faAddressCard}/>    
                                    </i>
                                    ПОЛЬЗОВАТЕЛИ
                                </a>
                            </div>
                            <div className={'nav-item'}>
                                <a className={'menu-item nav-inner-item'} href='/students'>
                                    <i className={'ico ico--bar'}>
                                        <FontAwesomeIcon icon={faChalkboardTeacher}/>    
                                    </i>
                                    СТУДЕНТЫ
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            </nav>
        );
    };
};

export default AdminNav;

