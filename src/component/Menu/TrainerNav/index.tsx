import { inject, observer } from "mobx-react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'

import "./style.sass";
import history from "global/history";

interface TrainerNavProps {
    authState?: any;
}

@inject('authState')
@observer
class TrainerNav extends React.PureComponent<TrainerNavProps> {
    render() {
        return (
            <nav>
                <h4 className={'menu-title'}>УПРАВЛЕНИЕ</h4>
                <div className={'nav-container'}>
                    <div>
                        <nav>
                        <div className={'nav-item'}>
                            <a className={'menu-item nav-inner-item'} onClick={()=> history.push('/tasks')}>
                                <i className={'ico ico--bar'}>
                                    <FontAwesomeIcon icon={faAddressCard}/>    
                                </i>
                                ЗАДАНИЯ
                            </a>
                        </div>
                        <div className={'nav-item'}>
                            <a className={'menu-item nav-inner-item'} onClick={()=> history.push('/training')}>
                                <i className={'ico ico--bar'}>
                                    <FontAwesomeIcon icon={faAddressCard}/>    
                                </i>
                                ОБУЧЕНИЕ
                            </a>
                        </div>
                    </nav>
                        
                    </div>
                </div>
                <h4 className={'menu-title'}>ПРОСМОТР</h4>
                <div className={'nav-container'}>
                    <div>
                        <nav>
                        <div className={'nav-item'}>
                                <a className={'menu-item nav-inner-item'} onClick={()=> history.push('/trainers')}>
                                    <i className={'ico ico--bar'}>
                                        <FontAwesomeIcon icon={faAddressCard}/>    
                                    </i>
                                    ТРЕНЕРЫ
                                </a>
                            </div>
                            <div className={'nav-item'}>
                                <a className={'menu-item nav-inner-item'} onClick={()=> history.push('/courses')}>
                                    <i className={'ico ico--bar'}>
                                        <FontAwesomeIcon icon={faGraduationCap}/>    
                                    </i>
                                    КУРСЫ
                                </a>
                            </div>
                            <div className={'nav-item'}>
                                <a className={'menu-item nav-inner-item'} onClick={()=> history.push('/students')}>
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

export default TrainerNav;

