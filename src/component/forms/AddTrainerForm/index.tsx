import { Grid, TextField } from '@material-ui/core';
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

interface AddTrainerProps {
    trainerState?: any;
    userState?: any;
  }

@inject('trainerState')
@inject('userState')
@observer
class AddTrainerForm extends React.PureComponent<AddTrainerProps> {

    @observable firstname:string = '';
    @observable surname:string = '';
    @observable secondname:string = '';
    @observable user:string= '';
    @observable users:User[] = [];

    componentDidMount() {
        const { getUsersByRole } = this.props.userState;
        getUsersByRole('ROLE_DEFAULT').then(action((result:any) => this.users = result));
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
            const { trainerState } = this.props;
            trainerState.addTrainer({surname:this.surname,secondname:this.secondname,firstname:this.firstname,user: { login:this.user },busy:false});
            history.push('/trainers');
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
                                        <Grid item>
                                        <Autocomplete
                                            aria-required='true'
                                            autoComplete={true}
                                            onChange={(event, value) => {
                                                console.log(event);
                                                if(value!=undefined) {
                                                    this.user = value.login;
                                                } 
                                            }}
                                            id="combo-box-demo"
                                            options={this.users}
                                            getOptionLabel={(option:any) => option.login}
                                            style={{ width: 300 }}
                                            renderInput={(params:any) => <TextField {...params} label="Имя пользователя" variant="outlined" />}/>
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

export default AddTrainerForm;