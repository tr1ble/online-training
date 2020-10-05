import { inject, observer } from "mobx-react";
import React from 'react';
import ImageUploader from 'react-images-upload';

import "./style.sass";

interface AvatarUploadWindowProps {
    authState?: any;
    profileState?: any;
}



@inject('authState')
@inject('profileState')
@observer
class AvatarUploadWindow extends React.PureComponent<AvatarUploadWindowProps> {

    picture: any;

    onCrop = (files:File[]) => {
        this.picture = files[0];
    }

    onSubmit = () => {
        this.props.authState.uploadImage({image:this.picture});
        const { profileState } = this.props;
        profileState.hideProfile();
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

