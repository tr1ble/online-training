import ProfileWindow from "component/ProfileWindow";
import { inject, observer } from "mobx-react";
import React from 'react';

import "./style.sass";

interface HeaderProps {
    authState?: any;
    profileState?: any;
}



@inject('authState')
@inject('profileState')
@observer
class Header extends React.PureComponent<HeaderProps> {

    render() {
        const { login, picture } = this.props.authState;
        const { profileState } = this.props;
        const { isProfileVisible } = this.props.profileState;
        return (
            <div className={'header-container'}>
                <div className={'header-content'}>
                    <header>
                        <div className={'header-controls'}>
                        </div>
                        <div className={'header-controls'}
                        onClick={() => {
                            profileState.handleProfile();
                          }}>
                            <div className={'header-control'}>
                                {login} 
                            </div>
                            <div className={'header-control'}>
                                {(picture==null) && (<img src='/images/user.png' alt='User profile image' className={'image-profile'}/>)}
                                {(picture!=null) && (<img src={picture} alt='User profile image' className={'image-profile'}/>)}
                            </div>
                        </div>
                    </header>
                </div>
                {isProfileVisible && (
                    <ProfileWindow/>)}
            </div>
        );
    };

};

export default Header;

