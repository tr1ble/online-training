import React from 'react';
import { inject, observer } from 'mobx-react';
import './style.sass';
import { observable, action } from 'mobx';
import { CssDarkTextValidator, Header, Menu } from 'component';
import { Timeline } from 'antd';
import moment from 'moment';
import { Card, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import history from "global/history";

interface TasksPageProps {
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
class TasksPage extends React.PureComponent<TasksPageProps> {
    @observable isLoginVisible = false;
    @observable activeClass: string = 'menuRoot';
    @observable trainer: any = '';
    @observable tasks: any = '';
    @observable completedTasks: any = '';
    @observable students: any = '';
    @observable selectedTask: any = undefined;
    @observable selectedStudent: any = undefined;
    @observable feedback:string = '';
    @observable mark :string = '';

    @action componentDidMount() {
        const { initTasksByCourse } = this.props.taskState;
        const { initCurrentTrainer } = this.props.trainerState;
        initCurrentTrainer();
        const { initCompletedTasksByCourse } = this.props.completedTaskState;
        const { initStudentsByCourse } = this.props.studentState;
        const {myCourse, currentTrainer } = this.props.trainerState;
        this.trainer = currentTrainer;
        initStudentsByCourse(myCourse.id);
        initCompletedTasksByCourse(myCourse.id);
        initTasksByCourse(myCourse.id);
    }

    @action handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        let field: string = event.currentTarget.name;
        switch(field) {
            case "feedback":
                this.feedback =  event.currentTarget.value;
                break;
            case "mark":
                this.mark =  event.currentTarget.value;
                break
        }
    }

    @action handleScroll = async () => {
        if (window.pageYOffset == 0) {
            this.activeClass = 'menuRoot';
        } else {
            this.activeClass = 'menuRoot menuRoot--inset';
        }
    };

    onSubmit = () => {
        const { completedTaskState } = this.props;
        completedTaskState.addCompletedTask({mark:this.mark , feedback: this.feedback, task: { id:this.selectedTask.id }, file:null});
        history.push('/completedtask');
    };


    @action setSelectedTask = async (task: any) => {
        this.selectedTask = task;
    };

    @action setSelectedStudent = async (student: any) => {
        this.selectedStudent = student;
    };

    @action getCourseInfo = () => {
        const { students } = this.props.studentState;
        const { myCourse } = this.props.trainerState;
        const { tasks } = this.props.taskState;
        this.tasks = tasks;
        return (
            <Card className={'course-info'}>
                <div>
                    <p>
                        <b>Курс</b>: {myCourse.title}
                    </p>
                    <Timeline>
                        <Timeline.Item color="green">
                            Начало курса:
                            {' ' + moment(myCourse.startDate).format('DD.MM.YYYY')}
                        </Timeline.Item>
                        <Timeline.Item color="red">
                            <p>Окончание курса: {' ' + moment(myCourse.endDate).format('DD.MM.YYYY')}</p>
                        </Timeline.Item>
                    </Timeline>
                </div>
                <div>
                    <p>Тренер</p>
                <Card className="trainer" title="Тренер">
                    <p>Фамилия: {this.trainer.surname}</p>
                    <p>Имя: {this.trainer.firstname}</p>
                    <p>Отчество: {this.trainer.secname ? this.trainer.secname : '-'}</p>
                    <button className="main-button main-button--small">Профиль</button>
                </Card>
                </div>
                <div>
                    <p>Количество участников: {students.length}</p>
                </div>
            </Card>
        );
    };

    @action getTasksPane = () => {
        const { completedTasks } = this.props.completedTaskState;
        this.completedTasks = completedTasks;
        console.log(this.completedTasks)
        return (
            <List  style={{ height: '100%' }}>
                {this.tasks.map((value: any) =>
                    React.cloneElement(
                        <div className="task-info" onClick={(_e) => {
                            this.setSelectedTask(value)}}>
                            <ListItem>
                                <ListItemAvatar>
                                    {this.completedTasks.find((e: any) => e.id === value.id && e.student.id === this.selectedStudent.id) === undefined ||
                                    this.completedTasks.length === 0 ? (
                                        <img
                                            src="/images/red-cross.png"
                                            alt="Not done yet"
                                            className={'image-profile'}
                                        />
                                    ) : (
                                        <img src="/images/green-check.png" alt="Done" className={'image-profile'} />
                                    )}
                                </ListItemAvatar>
                                <ListItemText
                                    primary={value.title}
                                    secondary={
                                        value.description.length < 30
                                            ? value.description
                                            : value.description.substr(0, 27) + '...'
                                    }
                                />
                            </ListItem>
                        </div>,
                        {
                            key: value.id,
                        },
                    ),
                )}
            </List>
        );
    };

    @action getStudentsPane = () => {
        const { students } = this.props.studentState;
        this.students = students;
        return (
            <List  style={{ height: '100%' }}>
                {this.students.map((value: any) =>
                    React.cloneElement(
                        <div className="student-info" onClick={(_e) => {
                            this.setSelectedStudent(value)}}>
                            <ListItem>
                                <ListItemText
                                    primary={value.surname}
                                    secondary={value.firstname + ' ' + (value.secondname ? value.secondname : '')}
                                />
                            </ListItem>
                        </div>,
                        {
                            key: value.id,
                        },
                    ),
                )}
            </List>
        );
    };




    render() {
        let marked;
        let compTask: any;
        const { download } = this.props.completedTaskState;
        if(this.selectedTask!=undefined) {
            compTask =  this.completedTasks.find((e: any) => e.id === this.selectedTask.id && e.student.id === this.selectedStudent.id);
            marked = compTask !== undefined;
        }
        return (
            <div className={'pageContainer--main'} onScroll={this.handleScroll}>
                <Menu />
                <div className={'main nav--opened'}>
                    <Header />
                    <div className={'main-container'}>
                        <div className={'main-content'}>
                            {this.getCourseInfo()}
                            <div className="task-container">
                                {this.getStudentsPane()}
                                {this.selectedStudent!=undefined && this.getTasksPane()}
                                <div className='task-pane'>
                                    {(this.selectedTask != undefined) && (
                                        <div className="task-details">
                                            <div className='task-details task-details__main'>
                                                <h4>{this.selectedTask.title}</h4>
                                                <p>{this.selectedTask.description}</p>
                                            </div>
                                            {!marked ?
                                                <ValidatorForm
                                                onSubmit={this.onSubmit}
                                                className={'task-form'}
                                                justify="center"
                                            >
                                                <label className={'task-form'}>
                                                    <CssDarkTextValidator
                                                        label='Оценка'
                                                        onChange={this.handleChange}
                                                        name='mark'
                                                        value={this.mark}
                                                        color='secondary'
                                                        style={
                                                            {
                                                                margin: '20px'
                                                            }
                                                        }
                                                    />
                                                    <CssDarkTextValidator
                                                        label='Пояснение'
                                                        onChange={this.handleChange}
                                                        name='feedback'
                                                        value={this.feedback}
                                                        color='secondary'
                                                        style={
                                                            {
                                                                margin: '20px'
                                                            }
                                                        }
                                                    />
                                                    <button type="submit" className="main-button">
                                                        Оценить
                                                    </button>
                                                </label>
                                            </ValidatorForm>
                                                :
                                                <div className='task-form'>
                                                    {compTask.file!=undefined &&
                                                     <a className='file' onClick={(_e)=> {
                                                        download(compTask.id);
                                                        }}>
                                                            <img src='/images/file.png' width='50px'/>
                                                            {compTask.file.fileName}
                                                    </a>}
                                                    <p>Оценка: {compTask.mark}</p>
                                                    <p>Комментарии: {compTask.feedback}</p>
                                                </div>
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TasksPage;
