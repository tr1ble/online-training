import { Grid } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';

import './style.sass';
import CssLightTextValidator from '../controls/CssLightTextValidator';
import { action, observable } from 'mobx';


interface RegisterProps {
    authState?: any;
  }

@inject('authState')
@observer
class RegisterForm extends React.PureComponent<RegisterProps> {

    @observable login:string = '';
    @observable password:string = '';
    @observable passwordRep:string = '';
    @observable email:string= '';

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value:string) => {
            if (value !== this.password) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('isLoginEnglish', (value:string) => {
            if (!/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/.test(value)) {
                return false;
            }
            return true;
        });
    }
 
    componentWillUnmount() {
        ValidatorForm.removeValidationRule('isPasswordMatch');
        ValidatorForm.removeValidationRule('isLoginEnglish');
    }
 

    onSubmit = () => {
            const { authState } = this.props;
            authState.tryRegister({login:this.login,password:this.password,email:this.email});
    };

    @action handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        let field: string = event.currentTarget.name;
        switch(field) {
            case "login":
                this.login =  event.currentTarget.value;
                break;
            case 'password':
                this.password = event.currentTarget.value;
                break;
            case 'passwordRep':
                this.passwordRep = event.currentTarget.value;
                break;
            case 'email':
                this.email =  event.currentTarget.value;
                break;
        }
    }

    render() {
        const {
            isAlertVisible,
            message,
            alertType
          } = this.props.authState;
          let type:string = alertType;
        return(
                <Grid 
                container
                justify='center'
                className={'page-top--register form-container'}>
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
                                            <CssLightTextValidator
                                                label='Имя пользователя'
                                                onChange={this.handleChange}
                                                name='login'
                                                value={this.login}
                                                color='secondary'
                                                validators={['required', 'isLoginEnglish']}
                                                errorMessages={['Заполните это поле', 'Неверный логин']}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <CssLightTextValidator
                                                label='Пароль'
                                                onChange={this.handleChange}
                                                name='password'
                                                value={this.password}
                                                color='secondary'
                                                validators={['required']}
                                                type='password'
                                                errorMessages={['Заполните это поле']}
                                            />
                                        </Grid>
                                        <Grid item >
                                            <CssLightTextValidator
                                                label='Повторите пароль'
                                                onChange={this.handleChange}
                                                name='passwordRep'
                                                value={this.passwordRep}
                                                color='secondary'
                                                validators={['required', 'isPasswordMatch']}
                                                type='password'
                                                errorMessages={['Заполните это поле', 'Пароли не совпадают']}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <CssLightTextValidator
                                                label='Электронная почта'
                                                onChange={this.handleChange}
                                                name='email'
                                                value={this.email}
                                                color='secondary'
                                                validators={['required', 'isEmail']}
                                                errorMessages={['Заполните это поле', 'Неверная электронная почта']}
                                            />
                                        </Grid>
                                        {isAlertVisible && type=="register" && (
                                            <div className={'error-message-register'}>{message}</div>
                                        )}
                                        <button
                                        type="submit"
                                        className='reg-button'>
                                            Зарегистрироваться
                                        </button>

                                </Grid>
                    </ValidatorForm>
                </Grid>
        );
    };
};

export default RegisterForm;