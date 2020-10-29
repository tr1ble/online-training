import React from 'react'
import { inject, observer } from 'mobx-react';
import "./style.sass";
import { observable, runInAction, action } from 'mobx';
import { Header, Menu } from 'component';

interface MainPageProps {
    authState?: any;
}

@inject('authState')
@observer
class MainPage extends React.PureComponent<MainPageProps> {

    @observable isLoginVisible = false;
    @observable activeClass:string= 'menuRoot';

    @action handleScroll = async ()=> {
      if(window.pageYOffset==0) {
        this.activeClass='menuRoot';
      } else {
        this.activeClass='menuRoot menuRoot--inset';
      }
    }

    render() {
        return (
            <div className={'pageContainer--main'} onScroll={this.handleScroll}>
              <Menu/>
              <div className={'main nav--opened'}>
                <Header/>
                <div className={'main-container'}>
                  <div className={'main-content'}>           
                  </div>
                </div>
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

export default MainPage;
