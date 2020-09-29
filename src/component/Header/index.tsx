import ProfileWindow from "component/ProfileWindow";
import { action, observable, runInAction } from "mobx";
import { inject, observer } from "mobx-react";
import React from 'react';

import "./style.sass";

interface HeaderProps {
    authState?: any;
    profileState?: any;
}



@inject('authState')
@observer
class Header extends React.PureComponent<HeaderProps> {

    @observable isProfileVisible:boolean = false;

    render() {
        const { login, picture } = this.props.authState;
        return (
            <div className={'header-container'}>
                <div className={'header-content'}>
                    <header>
                        <div className={'header-controls'}>
                        </div>
                        <div className={'header-controls'}
                        onClick={() => {
                            if(this.isProfileVisible) {
                                this.hideProfile();
                            } else {
                                this.showProfile();
                            }
                          }}>
                            <div className={'header-control'}>
                                {login} 
                            </div>
                            <div className={'header-control'}>
                                {(picture==null) && (<img src='/images/user.png' alt='User profile image' className={'image-profile'}/>)}
                            </div>
                        </div>
                    </header>
                </div>
                {this.isProfileVisible && (
                    <ProfileWindow/>)}
            </div>
        );
    };

    
    @action showProfile = () => {
        runInAction(()=> {
            this.isProfileVisible = true;
        })
    };

    @action hideProfile = () => {
        runInAction(()=> {
            this.isProfileVisible = false;
        })
    };
};

export default Header;

