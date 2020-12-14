import React from 'react'
import { inject, observer } from 'mobx-react';
import "./style.sass";
import { observable, runInAction, action } from 'mobx';
import { Header, Menu } from 'component';

interface MainPageProps {
  authState?: any;
  taskState?: any;
  courseState?: any;
  trainerState?: any;
  completedTaskState?: any;
  studentState?: any;
}

@inject('authState')
@inject('taskState')
@inject('courseState')
@inject('trainerState')
@inject('completedTaskState')
@inject('studentState')
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

    componentDidMount() {
      const { role } = this.props.authState;
      if(role==='ROLE_STUDENT') {
        const { login } = this.props.authState;
        const { initTasksByCourse } = this.props.taskState;
        const { initTrainers } = this.props.trainerState;
        const { initCompletedTasksByCurrentUser } = this.props.completedTaskState;
        const { initCurrentStudentByUser } = this.props.studentState;
        const { myCourse } = this.props.studentState;
        initCurrentStudentByUser(login);
        initTrainers();
        initCompletedTasksByCurrentUser();
        initTasksByCourse(myCourse.id);
      }
      if(role==='ROLE_TRAINER') {
        const { initCurrentTrainer } = this.props.trainerState;
        initCurrentTrainer();
        const { initTasksByCourse } = this.props.taskState;
        const { initCompletedTasksByCourse } = this.props.completedTaskState;
        const { initStudentsByCourse } = this.props.studentState;
        const {myCourse } = this.props.trainerState;
        initStudentsByCourse(myCourse.id);
        initCompletedTasksByCourse(myCourse.id);
        initTasksByCourse(myCourse.id);
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
