import { Grid } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';

import './style.sass';
import { action, observable } from 'mobx';
import history from "global/history";
import CssDarkTextValidator from '../controls/CssDarkTextValidator';

interface RegisterStudentProps {
    studentState?: any;
    authState?: any;
    selected: string;
  }

@inject('studentState')
@inject('authState')
@observer
class RegisterStudentForm extends React.PureComponent<RegisterStudentProps> {

    @observable firstname:string = '';
    @observable surname:string = '';
    @observable secondname:string = '';

    componentDidMount() {
        ValidatorForm.addValidationRule('numbersNotAllowed', (value:string) => {
            if (!(/^([^0-9]*)$/.test(value))) {
                return false;
            }
            return true;
        });
    }
 
    componentWillUnmount() {
        ValidatorForm.removeValidationRule('numbersNotAllowed');
    }
 

    onSubmit = () => {
            const { studentState } = this.props;
            const { login } = this.props.authState;
            studentState.registerStudent({surname:this.surname,secondname:this.secondname,firstname:this.firstname,user: { login:login }, course: { id: this.props.selected }});
            history.push('/training');
    };

    @action handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        let field: string = event.currentTarget.name;
        switch(field) {
            case "firstname":
                this.firstname =  event.currentTarget.value;
                break;
            case 'surname':
                this.surname = event.currentTarget.value;
                break;
            case 'secondname':
                this.secondname = event.currentTarget.value;
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
                                                label='Фамилия'
                                                onChange={this.handleChange}
                                                name='surname'
                                                value={this.surname}
                                                color='secondary'
                                                validators={['required', 'numbersNotAllowed']}
                                                errorMessages={['Заполните это поле', 'Неверный формат']}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <CssDarkTextValidator
                                                label='Имя'
                                                onChange={this.handleChange}
                                                name='firstname'
                                                value={this.firstname}
                                                color='secondary'
                                                validators={['required', 'numbersNotAllowed']}
                                                errorMessages={['Заполните это поле', 'Неверный формат']}
                                            />
                                        </Grid>
                                        <Grid item >
                                            <CssDarkTextValidator
                                                label='Отчество (необязательно)'
                                                onChange={this.handleChange}
                                                name='secondname'
                                                value={this.secondname}
                                                color='secondary'
                                                validators={['numbersNotAllowed']}
                                                errorMessages={['Неверный формат']}
                                            />
                                        </Grid>
                                        <button
                                        type="submit"
                                        className=' main-button main-button--mid'>
                                            Записаться
                                        </button>

                                </Grid>
                    </ValidatorForm>
                </Grid>
        );
    };
};

export default RegisterStudentForm;