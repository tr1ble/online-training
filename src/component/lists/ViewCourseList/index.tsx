import {
    createStyles,
    makeStyles,
    Theme,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { useEffect } from 'react';
import CourseState from 'states/CourseState';
import "./style.sass";
import List from '@material-ui/core/List/List';
import { RegisterCourseForm } from 'component';


class Trainer {
    id: string;
    surname: string = '';
    firstname: string = '';
    secondname: string = '';
    constructor(id: string) {
        this.id = id;
    }
}


class Course {

    id: string | number | undefined;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    trainer: Trainer;
    image: File;

    constructor(id: string | number, title: string, description: string, startDate: Date, endDate: Date, trainer: Trainer, image: File) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.trainer = trainer;
        this.image = image;
    }
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            '&$checked': {
                color: '#FF0000',
            },
            '& .Mui-checked': {
                fill: 'black',
            },
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        checkbox: {
            color: '#000000',
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }),
);

const UserTable = inject('courseState')(
    observer((courseState: CourseState) => {
        const classes = useStyles();
        const [courses, setCourses] = React.useState<Course[]>([]);
        const [clicked, setClicked] = React.useState(false);
        const [selected, setSelected] = React.useState('');

        useEffect(() => {
            setCourses(courseState.courses);
        },
        [courseState.courses]);

        const handleRegisterClick = (id:any, e: any) => {
            console.log(e)
            setSelected(id+'');
            if(clicked) {
                setClicked(false);
            } else {
                setClicked(true);
            }
        };
        return (
            <div>
            <List className={classes.root}>
                {courses.map((value) =>
                    React.cloneElement(
                    <div className='course__register'>
                        <ListItem>
                            <ListItemAvatar>
                                {value.image ? <img src={value.image+''} alt='Course logo' className={'image-course'}></img> : <img src='/images/course.png' alt='Course default logo' className={'image-course'}/> }
                            </ListItemAvatar>
                            <ListItemText
                                primary={value.title}
                                secondary={value.description}
                            />
                        </ListItem>
                  </div>, {
                      key: value.id,
                  })

                )}
            </List>
            {clicked && (
            <div id="open-modal" className="modal-window">
                <div>
                    <a title="Закрыть" className="modal-close" onClick={(e) => handleRegisterClick('0', e)}>✖</a>
                    <RegisterCourseForm selected={selected}/>
                </div>
            </div>)}
            </div>
        );
    }),
);

export default UserTable;
