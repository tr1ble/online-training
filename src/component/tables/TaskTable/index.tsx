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
import TaskState from 'states/TaskState';
import { getComparator, Order, stableSort } from '../Sort/sort';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./style.sass";
import { AddTaskForm } from 'component';

class TableTask {
    id: string | number;
    title: string;
    description: string;

    constructor(id: string | number, title: string, description: string) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

}

class Course {
    id: string;
    title: string;
    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }
}

class Task {
    id: string | number | undefined;
    title: string;
    description: string;
    course: Course;

    constructor(id: string, title: string, description: string, course: Course) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.course = course;
    }
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof TableTask;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'title', numeric: false, disablePadding: false, label: 'Название' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Описание' },
];


interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableTask) => void;
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
    const createSortHandler = (property: keyof TableTask) => (event: React.MouseEvent<unknown>) => {
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
    selectedTasks: string[];
    changedTasks: string[];
    allTasks: TableTask[];
    taskState:  TaskState; 
    role: string;
    course: Course;
}

const EnhancedTableToolbar = inject('taskState')(observer((props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const { numSelected, numChanged, taskState, role, course } = props;
    const [clicked, setClicked] = React.useState(false);
    const handleSaveClick = () => {
        const { allTasks, changedTasks } = props;
        const { updateTask } = taskState;
        changedTasks.forEach((t) => {
            let task= allTasks.find((tr) => tr.id === t);
            if(task!=undefined && taskState!=undefined) {
                updateTask(new Task(task.id+'', task.title, task.description, course)); 
            } 
        });
        history.push('/tasks');
    };

    const handleDeleteClick = () => {
        const { selectedTasks } = props;
        const { deleteTask } = taskState;
        selectedTasks.forEach((t) => {
                deleteTask(t); 
        });
        history.push('/tasks');
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
                        {course.title}
                        <span>                  </span>
                        <i className={'ico ico--action'} onClick={handleAddClick}>
                            {role=='ROLE_TRAINER' && (<FontAwesomeIcon icon={faPlus}/>)}
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
            {clicked && role=='ROLE_TRAINER' && (
            <div id="open-modal" className="modal-window">
                <div>
                    <a title="Закрыть" className="modal-close" onClick={handleAddClick}>✖</a>
                    <AddTaskForm/>
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

const UserTable = inject('taskState')(
    observer((taskState: TaskState) => {
        const classes = useStyles();
        const [tasks, setTasks] = React.useState<TableTask[]>([]);
        const [order, setOrder] = React.useState<Order>('asc');
        const [orderBy, setOrderBy] = React.useState<keyof TableTask>('id');
        const [selected, setSelected] = React.useState<string[]>([]);
        const [changed, setChanged] = React.useState<string[]>([]);
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);
        const [course, setCourse] = React.useState<Course>(new Course('-1', ''));


        useEffect(() => {
            const newTasks: TableTask[] = [];
            taskState.tasks.forEach((c) => {
                const task: TableTask = new TableTask(c.id+'', c.title, c.description);
                newTasks.push(task)
            });
            setTasks(newTasks);
        },
        [taskState.tasks]);

        const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TableTask) => {
            console.log(event);
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        };

        taskState.getCoursesByCurrentTrainer().then(function(result) {
            setCourse(result[0]);
        });

        const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                const newSelecteds = tasks.map((n: any) => n.id);
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

            let taskChanged: TableTask[] = [];
            let task = tasks.find((t) => t.id === id);
            tasks.filter(function (ele) {
                return ele.id != id;
            });
            if (task != undefined) {
                switch (field) {
                    case 'title':
                        task['title'] = event.target.value;
                        break;
                    case 'description':
                        task['description'] = event.target.value;
                        break;
                }
                taskChanged = taskChanged.concat(task);
            }
            setTasks(tasks.concat(taskChanged));
        });

        const isSelected = (name: string) => selected.indexOf(name) !== -1;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, tasks.length - page * rowsPerPage);



        const role = localStorage.getItem('role') + '';
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        selectedTasks={selected}
                        numChanged={changed.length}
                        allTasks={tasks}
                        changedTasks={changed}
                        taskState={taskState}
                        role={role}
                        course={course}
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
                                rowCount={tasks.length}
                            />
                            <TableBody>
                                {stableSort(tasks, getComparator(order, orderBy))
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
                        count={tasks.length}
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
