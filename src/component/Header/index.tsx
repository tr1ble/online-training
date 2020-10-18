import ProfileWindow from "component/ProfileWindow";
import { action, observable } from "mobx";
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

    @observable isProfilevisible:boolean = false;

    render() {
        const { login, picture } = this.props.authState;
        const { profileState } = this.props;
        return (
            <div className={'header-container'}>
                <div className={'header-content'}>
                    <header>
                        <div className={'header-controls'}>
                        </div>
                        <div className={'header-controls'}
                        onClick={action(() => {
                            this.isProfilevisible = profileState.handleProfile(this.isProfilevisible);
                          })}>
                            <div className={'header-control'}>
                                {login} 
                            </div>
                            <div className={'header-control'}>
                                {(picture==null || picture==undefined) && (<img src='/images/user.png' alt='User profile image' className={'image-profile'}/>)}
                                {(picture!=null || picture!=undefined) && (<img src={picture} alt='User profile image' className={'image-profile'}/>)}
                            </div>
                        </div>
                    </header>
                </div>
                {this.isProfilevisible && (
                    <ProfileWindow/>)}
            </div>
        );
    };

};

export default Header;

