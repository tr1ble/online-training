import { Button, Form } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react'

import './style.sass';

interface LoginProps {
    authState?: any;
  }

@inject('authState')
@observer
class LoginForm extends React.PureComponent<LoginProps> {

    
    onSubmit = (values:any) => {
        const { authState } = this.props;
        authState.toLogin({...values});
    };
    
    render() {
        return(
            <div className={'login-popup'}>
                    <h2>Вход</h2>
                    <Form
                      name="login"
                      initialValues={{ remember: true }}
                      onFinish={this.onSubmit}
                    >
                        <div className={"user-box"}>
                          <input type="text" name="login" required={true}/>
                          <label>Имя пользователя</label>
                        </div>
          
                        <div className={"user-box"}>
                          <input type="password" name="password" required={true}/>
                          <label>Пароль</label>
                        </div>
          
                      <Form.Item>
                      <div className={"user-box-button"}>
                        <Button
                          className={'menu-auth-button menu-auth-button--sec'}
                          type="primary"
                          htmlType="submit"
                        >
                          Войти
                        </Button>
                        </div>
                      </Form.Item>
                    </Form>
            </div>
        );
    };
};

export default LoginForm;