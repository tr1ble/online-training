import {
    createStyles,
    IconButton,
    makeStyles,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Theme,
    Toolbar,
    Tooltip,
    Typography,
    Paper,
    Table,
    TableContainer,
    TableBody,
    TablePagination,
    Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';
import RedCheckbox from 'component/forms/controls/RedCheckbox';
import history from 'global/history';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { useEffect } from 'react';
import CourseState from 'states/CourseState';
import { getComparator, Order, stableSort } from '../Sort/sort';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./style.sass";
import { AddCourseForm } from 'component';

class TableCourse {
    id: string | number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    trainer: string;
    image: any = null;

    constructor(id: string | number, title: string, description: string, startDate: string,endDate: string, trainer: string, image: any) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.trainer = trainer;
        this.image = image;
    }
}

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


interface HeadCell {
    disablePadding: boolean;
    id: keyof TableCourse;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'title', numeric: false, disablePadding: false, label: 'Название' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Описание' },
    { id: 'startDate', numeric: false, disablePadding: false, label: 'Начало' },
    { id: 'endDate', numeric: false, disablePadding: false, label: 'Конец' },
    { id: 'trainer', numeric: false, disablePadding: false, label: 'Тренер (id)' },
    { id: 'image', numeric: false, disablePadding: false, label: 'Логотип' },
];


interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableCourse) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
            '&$checked': {
                color: '#660000',
            },
            '& .Mui-checked': {
                fill: 'black',
            },
        },
        highlight: {
            color: theme.palette.primary.light,
            backgroundColor: '#FF0000',
        },
        title: {
            flex: '1 1 100%',
        },
        checkbox: {
            color: '#000000',
        },
    }),
);

function EnhancedTableHead(props: EnhancedTableProps) {
    const classesTheme = useToolbarStyles();
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof TableCourse) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <RedCheckbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                        className={classesTheme.checkbox}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'right'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
    numChanged: number;
    selectedCourses: string[];
    changedCourses: string[];
    allCourses: TableCourse[];
    courseState:  CourseState; 
    role: string;
}

const EnhancedTableToolbar = inject('courseState')(observer((props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const { numSelected, numChanged, courseState, role } = props;
    const [clicked, setClicked] = React.useState(false);
    const handleSaveClick = () => {
        const { allCourses, changedCourses } = props;
        const { updateCourse } = courseState;
        changedCourses.forEach((t) => {
            let course= allCourses.find((tr) => tr.id === t);
            if(course!=undefined && courseState!=undefined) {
                let trainerId:string[] = course.trainer.split("(")[1].split(")");
                let trainer:Trainer = new Trainer(trainerId[0]);
                updateCourse(new Course(course.id, course.title, course.description, new Date(course.startDate), new Date(course.endDate), trainer, course.image)); 
            } 
        });
        history.push('/courses');
    };

    const handleDeleteClick = () => {
        const { selectedCourses } = props;
        const { deleteCourse } = courseState;
        selectedCourses.forEach((t) => {
                deleteCourse(t); 
        });
        history.push('/courses');
    };

    const handleAddClick = () => {
        if(clicked) {
            setClicked(false);
        } else {
            setClicked(true);
        }
    };

    return (
        <div>
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                {numSelected > 0 ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {numSelected} выбрано
                    </Typography>
                ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        Курсы
                        <span>                  </span>
                        <i className={'ico ico--action'} onClick={handleAddClick}>
                            {role=='ROLE_ADMINISTRATOR' && (<FontAwesomeIcon icon={faPlus}/>)}
                        </i>
                    </Typography>

                )}
                {numChanged > 0 ? (
                    <Typography className={'save-button'} id="tableSaveButton" component="div">
                        <Button color="primary" onClick={handleSaveClick}>
                            Сохранить
                        </Button>
                    </Typography>
                ) : (
                    <Typography className={'save-button__unactive'} component="div">
                        <Button color="primary">Сохранить</Button>
                    </Typography>
                )}
                {numSelected > 0 ? (
                    <Tooltip title="Удалить">
                        <IconButton aria-label="delete" onClick={handleDeleteClick}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Фильтрация">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
            {clicked && role=='ROLE_ADMINISTRATOR' && (
            <div id="open-modal" className="modal-window">
                <div>
                    <a title="Закрыть" className="modal-close" onClick={handleAddClick}>✖</a>
                    <AddCourseForm/>
                </div>
            </div>)}

        </div>
    );
}));

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
        const [courses, setCourses] = React.useState<TableCourse[]>([]);
        const [order, setOrder] = React.useState<Order>('asc');
        const [orderBy, setOrderBy] = React.useState<keyof TableCourse>('id');
        const [selected, setSelected] = React.useState<string[]>([]);
        const [changed, setChanged] = React.useState<string[]>([]);
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);

        useEffect(() => {
            const newCourses: TableCourse[] = [];
            courseState.courses.forEach((c) => {
                let startDate: Date = new Date(c.startDate);
                let endDate: Date = new Date(c.endDate);
                const course: TableCourse = new TableCourse(c.id+'', c.title, c.description, startDate.getDay() + '.' + startDate.getMonth() + '.' + startDate.getFullYear(), endDate.getDay() + '.' + endDate.getMonth() + '.' + endDate.getFullYear(), c.trainer.surname + ' ' + c.trainer.firstname + ' ' + c.trainer.secondname + ' (' + c.trainer.id + ')', c.image + '');
                newCourses.push(course)
            });
            setCourses(newCourses);
        },
        [courseState.courses]);

        const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TableCourse) => {
            console.log(event);
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        };

        const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                const newSelecteds = courses.map((n: any) => n.id);
                setSelected(newSelecteds);
                return;
            } else {
                setSelected([]);
            }
        };

        const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
            console.log(event);
            const selectedIndex = selected.indexOf(name);
            let newSelected: string[] = [];
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, name);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
            }

            setSelected(newSelected);
        };

        const handleChangePage = (event: unknown, newPage: number) => {
            console.log(event);
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        const handleCellChange = action((event: any, field: string) => {
            const id = event.target.id;
            const changedIndex = changed.indexOf(id);
            let newChanged: string[] = [];
            if (changedIndex === -1) {
                newChanged = newChanged.concat(changed, id);
            }
            setChanged(newChanged);

            let courseChanged: TableCourse[] = [];
            let course = courses.find((t) => t.id === id);
            courses.filter(function (ele) {
                return ele.id != id;
            });
            if (course != undefined) {
                switch (field) {
                    case 'title':
                        course['title'] = event.target.value;
                        break;
                }
                courseChanged = courseChanged.concat(course);
            }
            setCourses(courses.concat(courseChanged));
        });

        const isSelected = (name: string) => selected.indexOf(name) !== -1;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, courses.length - page * rowsPerPage);

        const role = localStorage.getItem('role') + '';
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        selectedCourses={selected}
                        numChanged={changed.length}
                        allCourses={courses}
                        changedCourses={changed}
                        courseState={courseState}
                        role={role}
                    />
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size="medium"
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={courses.length}
                            />
                            <TableBody>
                                {stableSort(courses, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id + '');
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.id + '')}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <RedCheckbox
                                                        className={classes.checkbox}
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                    align="right"
                                                >
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="right" contentEditable={true} onChange={(event) => handleCellChange(event, 'title')}>{row.title}</TableCell>
                                                <TableCell align="right" contentEditable={true} onChange={(event) => handleCellChange(event, 'description')}>{row.description}</TableCell>
                                                <TableCell align="right" contentEditable={true}>{row.startDate}</TableCell>
                                                <TableCell align="right" contentEditable={true}>{row.endDate}</TableCell>
                                                <TableCell align="right">{row.trainer}</TableCell>
                                                <TableCell align="right">
                                                        {(row.image=='null' || row.image==undefined) && (<img src='/images/course.png' alt='Course default logo' className={'image-profile--big'}/>)}
                                                        {(row.image!='null' && row.image!=undefined) && (<img src={row.image+''} alt='Course logo' className={'image-profile--big'}/>)}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        backIconButtonText="Назад"
                        nextIconButtonText="Вперёд"
                        labelRowsPerPage="Количество"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={courses.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        );
    }),
);

export default UserTable;
