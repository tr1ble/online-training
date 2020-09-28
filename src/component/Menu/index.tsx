import { inject, observer } from "mobx-react";
import React from 'react';
import AdminNav from "./AdminNav";

import "./style.sass";

interface MenuProps {
    authState?: any;
}

@inject('authState')
@observer
class Menu extends React.PureComponent<MenuProps> {

    componentDidMount() {
        this.props.authState.autoLogin();
    }

    render() {
        const { role } = this.props.authState;
        return (
            <aside className={'menu menu--nav'}>
                <div>
                    <div className={'menu-header'}>
                        <a className={'menu-logo'} href={'/'}>
                            <img src={'/images/logo.png'} alt={'Online training logo'}/>
                        </a>
                    </div>
                    {(role=='ROLE_ADMINISTRATOR') && (
                        <AdminNav/>
                    )}
                </div>
            </aside>
        );
    };
};

export default Menu;

