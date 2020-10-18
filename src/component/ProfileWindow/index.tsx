import { inject, observer } from 'mobx-react';
import React from 'react'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import history from "global/history";
import './style.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { action, observable, runInAction } from 'mobx';
import AvatarUploadWindow from 'component/AvatarUploadWindow';

interface ProfileWindowProps {
    authState?: any;
  }

@inject('authState')
@observer
class ProfileWindow extends React.PureComponent<ProfileWindowProps> {
    @observable isAvatarUploadVisible:boolean = false;
    render() {
      const { login, picture, logout } = this.props.authState;
        return(
          <div>
            <div className={'profile-popup'}>
              <div className={'profile-block'}>
                <div className={'profile-info'}>
                    {(picture==null) && (<img src='/images/user-white.png' alt='User profile image' className={'image-profile--big'}/>)}
                    {(picture!=null) && (<img src={picture} alt='User profile image' className={'image-profile--big'}/>)}
                    <div className={'profile-name'}>
                      <span>{login}</span>
                      <a className={'profile-image-change'} onClick={() => {
                            if(this.isAvatarUploadVisible) {
                                this.hideAvatarUpload();
                            } else {
                                this.showAvatarUpload();
                            }
                          }}>Изменить аватар</a>
                    </div>
                </div>
                <div className={'profile-entry'}>
                  <div className={'profile-settings'}>
                    <i className={'ico ico--profile'}>
                      <FontAwesomeIcon icon={faCog}/>    
                    </i>
                    <a onClick={()=> {
                      history.push("/settings")
                    }}>Настройки</a>
                  </div>
                </div>
              </div>
              <div className={'profile-block'}>
                <div className={'profile-entry'}>
                  <div className={'profile-logout'}>
                    <i className={'ico ico--profile'}>
                      <FontAwesomeIcon icon={faSignOutAlt}/>    
                    </i>
                    <a onClick={()=>  {
                      logout();
                      history.push("/");
                      window.location.reload();
                    }}>Выйти</a>
                  </div>
                </div>
              </div>
            </div>
            {this.isAvatarUploadVisible && (
                    <AvatarUploadWindow/>)}
            </div>);
    };
    @action showAvatarUpload = () => {
        runInAction(()=> {
            this.isAvatarUploadVisible = true;
        })
    };

    @action hideAvatarUpload = () => {
        runInAction(()=> {
            this.isAvatarUploadVisible = false;
        })
    };
};

export default ProfileWindow;