import { Button, Grid, TextField } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';

import './style.sass';
import { action, observable } from 'mobx';
import history from "global/history";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CssDarkTextValidator from '../controls/CssDarkTextValidator';

interface User {
    login: string;
    password: string | number;
    role: string | number;
    email: string;
}

class Trainer {
    id: string | number;
    firstname: string;
    secondname: string;
    surname: string;
    busy: boolean;
    user: User;

    constructor(id: string | number,surname: string, firstname: string, secondname: string,busy: boolean,user: User) {
        this.id = id;
        this.firstname = firstname;
        this.secondname = secondname;
        this.surname = surname;
        this.busy=busy;
        this.user = user;
    }
}

interface AddCourseProps {
    courseState?: any;
    trainerState?: any;
    userState?: any;
  }

@inject('courseState')
@inject('trainerState')
@inject('userState')
@observer
class AddCourseForm extends React.PureComponent<AddCourseProps> {

    @observable title:string = '';
    @observable description:string = '';
    @observable startDate:Date=new Date();
    @observable endDate:Date=new Date();
    @observable trainer:string= '';
    @observable trainers:Trainer[] = [];
    @observable image:string = '';

    componentDidMount() {
        const { trainers } = this.props.trainerState;
        action(()=> { this.trainers = trainers; });
    }
 

    onSubmit = () => {
            const { courseState } = this.props;
            courseState.addCourse({title:this.title,description:this.description,trainer: { id:this.trainer },image:null});
            history.push('/courses');
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
                                        <Grid item >
                                            Начало:
                                            <TextField
                                                label=''
                                                type='date'
                                                name='startDate'
                                                value={this.startDate}
                                                color='secondary'
                                                style={{ marginLeft: '8px' }}
                                            />
                                        </Grid>
                                        <Grid item >
                                            Конец:
                                            <TextField
                                                label=''
                                                type='date'
                                                name='endDate'
                                                value={this.endDate}
                                                color='secondary'
                                                style={{ marginLeft: '8px' }}
                                            />
                                        </Grid>
                                        <Grid item >
                                            <label>                                           
                                                <input
                                                    style={{ display: "none" }}
                                                    id="file"
                                                    name="file"
                                                    type="file"
                                                    accept="image/jpeg,image/png"
                                                />
                                                <Button color="secondary" variant="contained" component="span">
                                                    Загрузить логотип
                                                </Button>{" "}
                                            </label>
                                        </Grid>
                                        <Grid item>
                                        <Autocomplete
                                            aria-required='true'
                                            autoComplete={true}
                                            onChange={(event, value) => {
                                                console.log(event);
                                                if(value!=undefined) {
                                                    this.trainer = value.id+'';
                                                } 
                                            }}
                                            id="combo-box-demo"
                                            options={this.trainers}
                                            getOptionLabel={(option:any) => option.surname + ' ' + option.firstname}
                                            style={{ width: 300 }}
                                            renderInput={(params:any) => <TextField {...params} label="Тренер" variant="outlined" />}/>
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

export default AddCourseForm;