import { inject, observer } from 'mobx-react';
import React from 'react'

interface PageNotFoundProps {
    authState?: any;
}

@inject('authState')
@observer
class PageNotFound extends React.PureComponent<PageNotFoundProps> {
    render() {
        return (
            <div>
                PageNotFound
            </div>
        )
    }
}

export default PageNotFound;
