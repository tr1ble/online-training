import React from 'react'
import { Button} from 'antd';
import { inject, observer } from 'mobx-react';
import history from "global/history";

import "./style.sass";
import { observable, runInAction, action } from 'mobx';
import { LoginForm } from 'component';

interface AuthPageProps {
    authState?: any;
}

@inject('authState')
@observer
class AuthPage extends React.PureComponent<AuthPageProps> {

    @observable isLoginVisible = false;
    @observable activeClass:string= 'menuRoot';

    componentDidMount() {
        this.props.authState.autoLogin();
        window.addEventListener('scroll', this.handleScroll);
    }

    @action handleScroll = async ()=> {
      if(window.pageYOffset==0) {
        this.activeClass='menuRoot';
      } else {
        this.activeClass='menuRoot menuRoot--inset';
      }
    }

    render() {
        return (
            <div className={'pageContainer'} onScroll={this.handleScroll}>
              <div className={'top'}>
                  <nav className={this.activeClass} data-ud-nav>
                    <a className={'menu-logo-home'} href={'/'}>
                        <img src={'/images/logo.png'} alt={'Online training logo'}/>
                    </a>
                    <menu className={'menu-nav'}>
                        <li className={'menu-nav-item'}>О НАС</li>
                        <li className={'menu-nav-item'}>КОНТАКТЫ</li>
                    </menu>
                    <div className={'menu-auth'}>
                      
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
                        <Button
                            className={'menu-auth-button menu-auth-button--sec'}
                            type="link"
                            onClick={() => {
                                this.setState({
                                  isAlertVisible:false,
                                  message:"",
                                  type:""});
                                history.push("/register");
                              }}>
                            ЗАРЕГИСТРИРОВАТЬСЯ
                        </Button>
                    </div>  
                  </nav>
                {this.isLoginVisible && (
                  <LoginForm/>
                 )}
              </div>
              <main className={"content"}>
                <div className={"home-top page-top"}>
                  <div className={"page-intro"}>
                    <div className={"page-intro-top"}>
                      <h1 className={"page-intro-title"}>Обучайся различным технологиям <b>с профессионалами</b></h1>
                    </div>
                    <picture>
                      <img src={'/images/page-intro.png'} alt={'Online training logo'} className={"page-intro-image"}/>
                    </picture>
                  </div>
                  <div className={"page-top-overlay"} style={{width: '0px', height: '0px'}}></div>
                </div>

              </main>
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

export default AuthPage;
