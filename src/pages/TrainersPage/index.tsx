import React from 'react';
import { inject, observer } from 'mobx-react';
import './style.sass';
import { observable, runInAction, action } from 'mobx';
import { Header, Menu, TrainerTable } from 'component';
import TrainerState from 'states/TrainerState';

interface TrainersPageProps {
    authState?: any;
    trainerState?: any;
}

@inject('authState')
@inject('trainerState')
@observer
class TrainersPage extends React.PureComponent<TrainersPageProps> {
    @observable isLoginVisible = false;
    @observable activeClass: string = 'menuRoot';

    componentDidMount() {
        const { initTrainers } = this.props.trainerState;
        initTrainers();
    }

    @action handleScroll = async () => {
        if (window.pageYOffset == 0) {
            this.activeClass = 'menuRoot';
        } else {
            this.activeClass = 'menuRoot menuRoot--inset';
        }
    };

    render() {
        let trainerState: TrainerState = this.props.trainerState;
        const { trainers, updateTrainer, deleteTrainer } = this.props.trainerState;
        return (
            <div className={'pageContainer--main'} onScroll={this.handleScroll}>
                <Menu />
                <div className={'main nav--opened'}>
                    <Header />
                    <div className={'main-container'}>
                        <div className={'main-content'}>
                            <div className="user-table">
                                <TrainerTable {...trainerState} trainers={trainers} updateTrainer={updateTrainer} deleteTrainer={deleteTrainer}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    @action showLogin = () => {
        runInAction(() => {
            this.isLoginVisible = true;
        });
    };

    @action hideLogin = () => {
        runInAction(() => {
            this.isLoginVisible = false;
        });
    };
}

export default TrainersPage;
