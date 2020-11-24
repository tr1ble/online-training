import { Grid } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';

import './style.sass';
import { action, observable } from 'mobx';
import history from "global/history";
import CssDarkTextValidator from '../controls/CssDarkTextValidator';


class Course {
    id: string;
    constructor(id: string) {
        this.id = id;
    }
}



interface AddTaskProps {
    taskState?: any;
    courseState?: any;
    userState?: any;
  }

@inject('taskState')
@inject('courseState')
@inject('userState')
@observer
class AddTaskForm extends React.PureComponent<AddTaskProps> {

    @observable title:string = '';
    @observable description:string = '';
    @observable course: string = '';

    componentDidMount() {
        const { courseState } = this.props;
        let courses: Course[] = courseState.getCoursesByCurrentTrainer();
        action(() => {
            this.course = courses[0].id;
        })
    }

    onSubmit = () => {
            const { taskState } = this.props;

            taskState.addTask({title:this.title,description:this.description, course: { id:this.course }});
            history.push('/tasks');
    };

    @action handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        let field: string = event.currentTarget.name;
        switch(field) {
            case "title":
                this.title =  event.currentTarget.value;
                break;
            case 'description':
                this.description = event.currentTarget.value;
                break;
        }
    }

    render() {
        return(
            <Grid container justify="center" className={'page-top form-container__window'}>
                    <ValidatorForm
                        onSubmit={this.onSubmit}
                        className={'registration-form'}
                        justify='center'>
                                <Grid container
                                    className={'input-container'}
                                    direction='column'
                                    alignItems='center'
                                    justify='center'
                                    spacing={5}>
                                        <Grid item className={'register-input'}>
                                            <CssDarkTextValidator
                                                label='Название'
                                                onChange={this.handleChange}
                                                name='title'
                                                value={this.title}
                                                color='secondary'
                                                validators={['required']}
                                                errorMessages={['Заполните это поле']}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <CssDarkTextValidator
                                                label='Описание'
                                                onChange={this.handleChange}
                                                name='description'
                                                value={this.description}
                                                color='secondary'
                                                validators={['required']}
                                                errorMessages={['Заполните это поле']}
                                            />
                                        </Grid>
                                        <button
                                        type="submit"
                                        className='main-button'>
                                            Добавить
                                        </button>

                                </Grid>
                    </ValidatorForm>
                </Grid>
        );
    };
};

export default AddTaskForm;