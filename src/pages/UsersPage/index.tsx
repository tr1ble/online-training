import React from 'react';
import { inject, observer } from 'mobx-react';
import './style.sass';
import { observable, runInAction, action } from 'mobx';
import { Header, Menu, UserTable } from 'component';

interface UsersPageProps {
    authState?: any;
    userState?: any;
}


@inject('authState')
@observer
class UsersPage extends React.PureComponent<UsersPageProps> {
    
    @observable isLoginVisible = false;
    @observable activeClass: string = 'menuRoot';


    @action handleScroll = async () => {
        if (window.pageYOffset == 0) {
            this.activeClass = 'menuRoot';
        } else {
            this.activeClass = 'menuRoot menuRoot--inset';
        }
    };

    componentDidMount() {
        const { initAdminPage } = this.props.userState;
        initAdminPage();
    }



    render() {
        return (
            <div className={'pageContainer--main'} onScroll={this.handleScroll}>
                <Menu />
                <div className={'main nav--opened'}>
                    <Header />
                    <div className={'main-container'}>
                        <div className={'main-content'}>
                          <UserTable/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    @action showLogin = () => {
        runInAction(() => {
            this.isLoginVisible = true;
        });
    };

    @action hideLogin = () => {
        runInAction(() => {
            this.isLoginVisible = false;
        });
    };
}

export default UsersPage;
