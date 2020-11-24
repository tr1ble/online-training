import React from 'react';
import { inject, observer } from 'mobx-react';
import './style.sass';
import { observable, action } from 'mobx';
import { Header, Menu, StudentTable } from 'component';
import StudentState from 'states/StudentState';

interface StudentsPageProps {
    authState?: any;
    studentState?: any;
}

@inject('authState')
@inject('studentState')
@observer
class StudentsPage extends React.PureComponent<StudentsPageProps> {
    @observable isLoginVisible = false;
    @observable activeClass: string = 'menuRoot';

    componentDidMount() {
        const { initStudents } = this.props.studentState;
        initStudents();
    }

    @action handleScroll = async () => {
        if (window.pageYOffset == 0) {
            this.activeClass = 'menuRoot';
        } else {
            this.activeClass = 'menuRoot menuRoot--inset';
        }
    };

    render() {
        let studentState: StudentState = this.props.studentState;
        const { students, updateStudent, deleteStudent, getStudentsByCourse} = this.props.studentState;
        return (
            <div className={'pageContainer--main'} onScroll={this.handleScroll}>
                <Menu />
                <div className={'main nav--opened'}>
                    <Header />
                    <div className={'main-container'}>
                        <div className={'main-content'}>
                            <div className="student-table">
                                <StudentTable {...studentState} students={students} updateStudent={updateStudent} deleteStudent={deleteStudent} getStudentsByCourse={getStudentsByCourse}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentsPage;
