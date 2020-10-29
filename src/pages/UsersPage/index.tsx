import React from 'react';
import { inject, observer } from 'mobx-react';
import './style.sass';
import { observable, action } from 'mobx';
import { Header, Menu, UserTable } from 'component';
import UserState from 'states/UserState';

interface UsersPageProps {
    authState?: any;
    userState?: any;
}

@inject('authState')
@inject('userState')
@observer
class UsersPage extends React.PureComponent<UsersPageProps> {
    @observable isLoginVisible = false;
    @observable activeClass: string = 'menuRoot';

    componentDidMount() {
        const { initUsers } = this.props.userState;
        initUsers();
    }

    @action handleScroll = async () => {
        if (window.pageYOffset == 0) {
            this.activeClass = 'menuRoot';
        } else {
            this.activeClass = 'menuRoot menuRoot--inset';
        }
    };

    render() {
        let userState: UserState = this.props.userState;
        const { users, updateUser, deleteUser } = this.props.userState;
        return (
            <div className={'pageContainer--main'} onScroll={this.handleScroll}>
                <Menu />
                <div className={'main nav--opened'}>
                    <Header />
                    <div className={'main-container'}>
                        <div className={'main-content'}>
                            <div className="user-table">
                                <UserTable {...userState} users={users} updateUser={updateUser} deleteUser={deleteUser}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default UsersPage;
