import { inject, observer } from 'mobx-react';
import React from 'react'

interface AuthPageProps {
    authState?: any;
}

@inject('authState')
@observer
class AuthPage extends React.PureComponent<AuthPageProps> {
    render() {
        return (
            <div>
                Login page
            </div>
        )
    }
}

export default AuthPage;
