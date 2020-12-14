import React from 'react';
import { inject, observer } from 'mobx-react';
import './style.sass';
import { observable, action } from 'mobx';
import { CssDarkTextValidator, Header, Menu } from 'component';
import { Progress, Timeline } from 'antd';
import moment from 'moment';
import { Button, Card, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
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
    @observable selectedTask: any = undefined;
    @observable comment:string = '';

    componentDidMount() {
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

    onSubmit = () => {
        const { completedTaskState } = this.props;
        completedTaskState.addCompletedTask({title:null, feedback: null, task: { id:this.selectedTask.id },file:null});
        history.push('/completedtask');
    };

    @action handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    let field: string = event.currentTarget.name;
    switch(field) {
        case "comment":
            this.comment =  event.currentTarget.value;
            break;
    }
}

    @action handleScroll = async () => {
        if (window.pageYOffset == 0) {
            this.activeClass = 'menuRoot';
        } else {
            this.activeClass = 'menuRoot menuRoot--inset';
        }
    };

    @action setSelected = async (task: any) => {
        this.selectedTask = task;
    };

    @action getCourseInfo = () => {
        const { myCourse } = this.props.studentState;
        const { trainers } = this.props.trainerState;
        const { completedTasks } = this.props.completedTaskState;
        const { tasks } = this.props.taskState;
        this.tasks = tasks;
        let average;
        if (completedTasks.length == 0) {
            average = 0;
        } else if (completedTasks.length === 1) {
            average = completedTasks[0].mark;
        } else {
            average =
                tasks.length === 0
                    ? 10
                    : completedTasks.reduce((a: any, b: any) => a.mark + b.mark) / completedTasks.length;
        }
        this.trainer = trainers.filter((e: any) => e.id == myCourse.trainer.id)[0];
        let percent = Math.round((completedTasks.length / tasks.length) * 100);
        if (tasks.length === 0) {
            percent = 100;
        }
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
                <div className="progress-bar">
                    <p>Прогресс: {percent}%</p>
                    <div className="progress-bar__inh">
                        <Progress
                            percent={percent}
                            size="small"
                            strokeColor="green"
                            trailColor="red"
                            showInfo={false}
                        />
                    </div>
                </div>
                <div>
                    <p>Средняя оценка: {average}/10</p>
                </div>
            </Card>
        );
    };

    @action getCoursePane = () => {
        const { completedTasks } = this.props.completedTaskState;
        this.completedTasks = completedTasks;
        return (
            <List style={{ height: '100%' }}>
                {this.tasks.map((value: any) =>
                    React.cloneElement(
                        <div
                            className="task-info"
                            onClick={(_e) => {
                                this.setSelected(value);
                            }}
                        >
                            <ListItem>
                                <ListItemAvatar>
                                    {this.completedTasks.find((e: any) => e.id === value.id) === undefined ||
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

    render() {
        let marked;
        let compTask;
        if (this.selectedTask != undefined) {
            compTask = this.completedTasks.find((e: any) => e.id === this.selectedTask.id);
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
                                {this.getCoursePane()}
                                <div className="task-pane">
                                    {this.selectedTask != undefined && (
                                        <div className="task-details">
                                            <div className="task-details task-details__main">
                                                <h4>{this.selectedTask.title}</h4>
                                                <p>{this.selectedTask.description}</p>
                                            </div>
                                            {!marked ? (
                                                <ValidatorForm
                                                    onSubmit={this.onSubmit}
                                                    className={'task-form'}
                                                    justify="center"
                                                >
                                                    <label className={'task-form'}>
                                                        <input
                                                            style={{ display: 'none' }}
                                                            id="file"
                                                            name="file"
                                                            type="file"
                                                            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                                                        text/plain, application/pdf, image/*"
                                                        />
                                                        <Button color="secondary" variant="contained" component="span">
                                                            Загрузить решение
                                                        </Button>{' '}
                                                        <CssDarkTextValidator
                                                            label='Комментарии'
                                                            onChange={this.handleChange}
                                                            name='comment'
                                                            value={this.comment}
                                                            color='secondary'
                                                            style={
                                                                {
                                                                    margin: '20px'
                                                                }
                                                            }
                                                        />
                                                        <button type="submit" className="main-button">
                                                            Отправить решение
                                                        </button>
                                                    </label>
                                                </ValidatorForm>
                                            ) : (
                                                <div>
                                                    <p>Оценка: {compTask.mark}</p>
                                                    <p>Комментарии: {compTask.feedback}</p>
                                                </div>
                                            )}
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
