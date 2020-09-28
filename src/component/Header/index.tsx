import { observe } from "mobx";
import { inject, observer } from "mobx-react";
import React from 'react';

interface HeaderProps {
    authState?: any;
    profileState?: any;
}

@inject('authState')
@observer
class Header extends React.PureComponent<HeaderProps> {
    render() {
        return (
            <div className={'top'}>
            </div>
        );
    };
};

export default Header;

