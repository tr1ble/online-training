import { FormControlLabel,Checkbox} from '@material-ui/core';
import { CssTextValidator } from 'component';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';

import './style.sass';

interface LoginProps {
    authState?: any;
  }

@inject('authState')
@observer
class LoginForm extends React.PureComponent<LoginProps> {

  @observable login:string = '';
  @observable password:string = '';
  @observable remember:boolean = false;
  
    onSubmit = () => {
        const { authState } = this.props;
        authState.toLogin({login:this.login, password:this.password,remember:this.remember});
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
          case 'remember':
              this.remember = true;
              break;
      }
  }
    
    render() {
      const
          {
              isAlertVisible,
              message,
              alertType
        } = this.props.authState;
        let type:string = alertType;
        return(
            <div className={'login-popup'}>
                    <h2>Вход</h2>
                    <ValidatorForm
                      name="login"
                      onSubmit={this.onSubmit}>
                      <div className={"user-box"}>
                        <CssTextValidator
                          label='Имя пользователя'
                          name='login'
                          color='secondary'
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className={"user-box"}>
                        <CssTextValidator
                          label='Пароль'
                          name='password'
                          color='secondary'
                          onChange={this.handleChange}
                        />
                      </div>
                      {isAlertVisible && type=="login" && (
                        <div className={'error-message-login'}>{message}</div>
                      )}
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={'remember'}
                            color={'secondary'}
                            checked={this.remember}
                            value={this.remember}
                            onChange={this.handleChange}/>
                        }
                        label={'Запомнить'}
                        color={'primary'}/>
                      <div className={"user-box-button"}>
                        <button
                          className={'menu-auth-button menu-auth-button--sec'}
                          type="submit"
                        >
                          Войти
                        </button>
                      </div>
                  </ValidatorForm>
            </div>
        );
    };
};

export default LoginForm;