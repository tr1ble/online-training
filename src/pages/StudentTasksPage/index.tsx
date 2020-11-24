import React from 'react';
import { inject, observer } from 'mobx-react';
import './style.sass';
import { observable, action } from 'mobx';
import { Header, Menu, TaskTable } from 'component';
import TasksState from 'states/TaskState';

interface TasksPageProps {
    authState?: any;
    taskState?: any;
    courseState?: any;
}

@inject('authState')
@inject('taskState')
@observer
class TasksPage extends React.PureComponent<TasksPageProps> {
    @observable isLoginVisible = false;
    @observable activeClass: string = 'menuRoot';
    @observable course: string = '';

    componentDidMount() {
        const { initTasks } = this.props.taskState;
        initTasks();
    }

    @action handleScroll = async () => {
        if (window.pageYOffset == 0) {
            this.activeClass = 'menuRoot';
        } else {
            this.activeClass = 'menuRoot menuRoot--inset';
        }
    };

    render() {
        let taskState: TasksState = this.props.taskState;
        const { tasks, updateTask, deleteTask, getCoursesByCurrentTrainer } = this.props.taskState;
        return (
            <div className={'pageContainer--main'} onScroll={this.handleScroll}>
                <Menu />
                <div className={'main nav--opened'}>
                    <Header />
                    <div className={'main-container'}>
                        <div className={'main-content'}>
                            <div className="trainer-table">
                                <TaskTable {...taskState} tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} getCoursesByCurrentTrainer={getCoursesByCurrentTrainer}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TasksPage;
