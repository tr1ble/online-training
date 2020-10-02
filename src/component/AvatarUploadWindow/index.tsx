import { inject, observer } from "mobx-react";
import React from 'react';
import ImageUploader from 'react-images-upload';

import "./style.sass";

interface AvatarUploadWindowProps {
    authState?: any;
}



@inject('authState')
@observer
class AvatarUploadWindow extends React.PureComponent<AvatarUploadWindowProps> {

    picture: any;

    onCrop = (picture:any) => {
        this.picture =picture;
    }

    onSubmit = () => {
        this.props.authState.uploadImage({image:this.picture});
    };

    render() {
        return (
            <div className={'avatar-container'}>
                <ImageUploader
                buttonClassName={'avatar-button'}
                singleImage={true}
                withIcon={true}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                onChange={this.onCrop}
                buttonText="Выбрать картинку"/>
                <button className='avatar-button' onClick={this.onSubmit}>
                    СОХРАНИТЬ
                </button>
            </div>
            
        );
    };


};

export default AvatarUploadWindow;

