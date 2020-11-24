import React from 'react';
import { inject, observer } from 'mobx-react';
import './style.sass';
import { observable, action } from 'mobx';
import { Header, Menu, CourseTable } from 'component';
import CoursesState from 'states/CourseState';

interface CoursesPageProps {
    authState?: any;
    courseState?: any;
}

@inject('authState')
@inject('courseState')
@observer
class CoursesPage extends React.PureComponent<CoursesPageProps> {
    @observable isLoginVisible = false;
    @observable activeClass: string = 'menuRoot';

    componentDidMount() {
        const { initCourses } = this.props.courseState;
        initCourses();
    }

    @action handleScroll = async () => {
        if (window.pageYOffset == 0) {
            this.activeClass = 'menuRoot';
        } else {
            this.activeClass = 'menuRoot menuRoot--inset';
        }
    };

    render() {
        let courseState: CoursesState = this.props.courseState;
        const { courses, updateCourse, deleteCourse } = this.props.courseState;
        return (
            <div className={'pageContainer--main'} onScroll={this.handleScroll}>
                <Menu />
                <div className={'main nav--opened'}>
                    <Header />
                    <div className={'main-container'}>
                        <div className={'main-content'}>
                            <div className="trainer-table">
                                <CourseTable {...courseState} courses={courses} updateCourse={updateCourse} deleteCourse={deleteCourse}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CoursesPage;
