import React from 'react'
import { inject, observer } from 'mobx-react';
import "./style.sass";
import { observable, runInAction, action } from 'mobx';
import { CssTextValidator, Header, Menu } from 'component';
import { Grid } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';

interface SettingsPageProps {
    authState?: any;
}

@inject('authState')
@observer
class SettingsPage extends React.PureComponent<SettingsPageProps> {

    @observable isLoginVisible = false;
    @observable activeClass:string= 'menuRoot';

    @observable login:string = '';
    @observable password:string = '';
    @observable passwordRep:string = '';
    @observable email:string= '';

    @action handleScroll = async ()=> {
      if(window.pageYOffset==0) {
        this.activeClass='menuRoot';
      } else {
        this.activeClass='menuRoot menuRoot--inset';
      }
    }

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
        return (
            <div className={'pageContainer--main'} onScroll={this.handleScroll}>
              <Menu/>
              <div className={'main nav--opened'}>
                <Header/>
                <div className={'main-container'}>
                  <div className={'main-content'}>
                    <Grid 
                  container
                  justify='center'
                  className={'page-top form-container'}>
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
                                              <CssTextValidator
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
                                              <CssTextValidator
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
                                              <CssTextValidator
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
                                              <CssTextValidator
                                                  label='Электронная почта'
                                                  onChange={this.handleChange}
                                                  name='email'
                                                  value={this.email}
                                                  color='secondary'
                                                  validators={['required', 'isEmail']}
                                                  errorMessages={['Заполните это поле', 'Неверная электронная почта']}
                                              />
                                          </Grid>
                                  </Grid>
                      </ValidatorForm>
                  </Grid>
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

export default SettingsPage;
