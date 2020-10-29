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
    NativeSelect,
    Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';
import RedCheckbox from 'component/forms/controls/RedCheckbox';
import history from 'global/history';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { ChangeEvent } from 'react';
import { useEffect } from 'react';
import UserState from 'states/UserState';
import { getComparator, Order, stableSort } from '../Sort/sort';

interface User {
    login: string | number;
    password: string | number;
    role: string | number;
    email: string;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof User;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    { id: 'login', numeric: false, disablePadding: true, label: 'Логин' },
    { id: 'password', numeric: false, disablePadding: false, label: 'Пароль' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Электронная почта' },
    { id: 'role', numeric: false, disablePadding: false, label: 'Роль' },
];


interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof User) => void;
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
    const createSortHandler = (property: keyof User) => (event: React.MouseEvent<unknown>) => {
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
    selectedUsers: string[];
    changedUsers: string[];
    allUsers: User[];
    userState:  UserState; 
}

const EnhancedTableToolbar = inject('userState')(observer((props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const { numSelected, userState, changedUsers } = props;
    const handleSaveClick = () => {
        const { allUsers, changedUsers } = props;
        const { updateUser } = userState;
        changedUsers.forEach((u) => {
            let user = allUsers.find((us) => us.login === u);
            if(user!=undefined && userState!=undefined) {
                        updateUser(user); 
            } 
        });
        history.push('/users');
    };

    const handleDeleteClick = () => {
        const { selectedUsers } = props;
        const { deleteUser } = userState;
        selectedUsers.forEach((u) => {
                deleteUser(u); 
        });
        history.push('/users');
    };

    return (
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
                    Пользователи
                </Typography>
            )}
            {changedUsers.length > 0 ? (
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

const UserTable = inject('userState')(
    observer((userState: UserState) => {
        const classes = useStyles();
        const [users, setUsers] = React.useState<User[]>([]);
        const [order, setOrder] = React.useState<Order>('asc');
        const [orderBy, setOrderBy] = React.useState<keyof User>('login');
        const [selected, setSelected] = React.useState<string[]>([]);
        const [changed, setChanged] = React.useState<string[]>([]);
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);

        useEffect(() => {
            setUsers(userState.users);
        });

        const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof User) => {
            console.log(event);
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        };

        const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                const newSelecteds = users.map((n: any) => n.login);
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

        const handleCellChange = action((event: ChangeEvent<HTMLSelectElement>) => {
            const login = event.target.id;
            const changedIndex = changed.indexOf(login);
            let newChanged: string[] = [];
            if (changedIndex === -1) {
                newChanged = newChanged.concat(changed, login);
            }
            setChanged(newChanged);

            let userChanged: User[] = [];
            let user = users.find((u) => u.login === login);
            users.filter(function (ele) {
                return ele.login != login;
            });
            if (user != undefined) {
                user['role'] = event.target.value;
                userChanged = userChanged.concat(user);
            }
            setUsers(users.concat(userChanged));
        });

        const isSelected = (name: string) => selected.indexOf(name) !== -1;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        selectedUsers={selected}
                        allUsers={users}
                        changedUsers={changed}
                        userState={userState}
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
                                rowCount={users.length}
                            />
                            <TableBody>
                                {stableSort(users, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.login + '');
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.login + '')}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.login}
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
                                                    {row.login}
                                                </TableCell>
                                                <TableCell align="right">{row.password}</TableCell>
                                                <TableCell align="right">{row.email}</TableCell>
                                                <TableCell align="right">
                                                    <NativeSelect
                                                        defaultValue={row.role}
                                                        id={row.login + ''}
                                                        inputProps={{
                                                            name: 'role',
                                                        }}
                                                        onChange={handleCellChange}
                                                    >
                                                        <option value={'ROLE_ADMINISTRATOR'}>Администратор</option>
                                                        <option value={'ROLE_TRAINER'}>Тренер</option>
                                                        <option value={'ROLE_STUDENT'}>Студент</option>
                                                        <option value={'ROLE_DEFAULT'}>Обычный пользователь</option>
                                                    </NativeSelect>
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
                        count={users.length}
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
