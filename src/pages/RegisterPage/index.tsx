import React from 'react'
import { Button} from 'antd';
import { inject, observer } from 'mobx-react';

import "./style.sass";
import { observable, runInAction, action } from 'mobx';
import { LoginForm, RegisterForm } from 'component';

interface RegisterPageProps {
    authState?: any;
}

@inject('authState')
@observer
class RegisterPage extends React.PureComponent<RegisterPageProps> {

    @observable isLoginVisible = false;
    @observable activeClass:string= 'menuRoot';

    onSubmit = (values: any) => {
        const { authState } = this.props;
        console.log(values);
        authState.tryRegister({ ...values });
    };

    render() {
        return (
            <div className={'pageContainer'}>
                <div className={'home'}>
                    <div className={'top'}>
                        <nav className={this.activeClass} data-ud-nav>
                            <a className={'menu-logo'} href={'/'}>
                                <img src={'/images/logo.png'} alt={'Online training logo'}/>
                            </a>
                            <div className={'menu-auth'}> 
                                <div className={'menu-auth-message'}>Уже зарегистрированы ? </div>
                                <Button
                                    className={'menu-auth-button'}
                                    type="default"
                                    onClick={()=>{
                                        if(this.isLoginVisible) {
                                            this.hideLogin();
                                        } else {
                                            this.showLogin();
                                        }
                                    }}>
                                    ВОЙТИ
                                </Button>
                            </div>  
                        </nav>
                        {this.isLoginVisible && (
                        <LoginForm/>
                        )}
                    </div>
                   <RegisterForm/>
              </div>
            </div>
        )
    }



    @action showLogin = () => {
        runInAction(()=> {
            this.isLoginVisible = true;
        })
    };

    @action hideLogin = () => {
        runInAction(()=> {
            this.isLoginVisible = false;
        })
    };
}

export default RegisterPage;
