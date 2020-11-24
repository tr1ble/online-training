import React from 'react';
import { inject, observer } from 'mobx-react';
import './style.sass';
import { observable, action } from 'mobx';
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
        const { trainers, updateTrainer, deleteTrainer, getCoursesByTrainer} = this.props.trainerState;
        return (
            <div className={'pageContainer--main'} onScroll={this.handleScroll}>
                <Menu />
                <div className={'main nav--opened'}>
                    <Header />
                    <div className={'main-container'}>
                        <div className={'main-content'}>
                            <div className="trainer-table">
                                <TrainerTable {...trainerState} trainers={trainers} updateTrainer={updateTrainer} deleteTrainer={deleteTrainer} getCoursesByTrainer={getCoursesByTrainer}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TrainersPage;
