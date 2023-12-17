import { connect } from "react-redux";
import { update, getPagedEmployeeList } from "../../../redux/actions/employee.action";

import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SearchIcon from '@mui/icons-material/Search';

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import { TablePagination } from '@mui/material';
import MuiTable from 'mui-virtualized-table';
import { ascend, descend, prop, sortWith } from "ramda";
import React, { useEffect, useState } from "react";
import { AutoSizer } from "react-virtualized";
import Button from 'react-bootstrap/Button';

import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);


function DataHeader(
    checked,
    checkAll,
    handleCheckOne,
    handleCheckAll,
    editable,
    handleEditable,
    handleSave) {

    //const [personals, setPersonal] = useState([]);
    const [personal, setOnePersonal] = useState(
        {
            firstname: '',
            employment_number: '',
            lastname: '',
            emailAddress: '',
            dateOfBirth: Date().toLocaleString(),
            dateOfJoining: Date().toLocaleString(),
            isAdmin: '1',
            password: '',
            isActive: 1,
        });

    // const filteredPersonal = (rowId) => personals.filter(obj => {
    //     return obj.id === rowId;
    // });

    const clearState = () => {
        setOnePersonal({
            firstname: '',
            employment_number: '',
            lastname: '',
            emailAddress: '',
            dateOfBirth: "2023-08-22T03:54:27.224Z",
            dateOfJoining: "2023-08-22T03:54:27.224Z",
            isAdmin: '1',
            password: '',
            isActive: 1,
        });
    };

    const setDefaultPersonal = (row) => {
        setOnePersonal({
            id: row.id,
            firstname: row.firstname,
            employment_number: row.employment_number,
            lastname: row.lastname,
            emailAddress: row.emailAddress,
            dateOfBirth: row.dateOfBirth,
            dateOfJoining: row.dateOfJoining,
            isAdmin: row.isAdmin,
            password: row.password,
            isActive: row.isActive === 1,
        });
    };

    const updateField = (columnName, value) => {
        setOnePersonal({
            ...personal,
            [columnName]: value
        });
    }

    // const updateState = (row, columnName, value) => {
    //     console.log(row._id + row.firstName + columnName + value);

    //     const personUpdate =
    //     {
    //         id: row._id,
    //         firstname: columnName == "firstName" ? value : row.firstName,
    //         employment_number: columnName == "employment_number" ? value : row.employmentNumber,
    //         lastname: columnName == "lastName" ? value : row.Lastname,
    //         emailAddress: columnName == "emailAddress" ? value : row.EmailAddress,
    //         dateOfBirth: row.DateOfBirth,
    //         dateOfJoining: row.DateOfJoining,
    //         isAdmin: '1',
    //         password: row.Password,
    //         isActive: columnName == "isActive" ? value : row.IsActive == 1,
    //     }

    //     const index = personals.findIndex((item) => item.id === personUpdate.id);

    //     if (index !== -1) {
    //         console.log(personUpdate);
    //         console.log('update');
    //         // Nếu tìm thấy phần tử có cùng ID trong mảng
    //         // Thực hiện cập nhật
    //         const clonePersonal = [...personals]; // tạo ra 1 mảng mới để update, không update trực tiếp vào state => clonePersonal và personal giống y nhau
    //         clonePersonal[index] = personUpdate; // lấy index trong mảng personal ví dụ: index tìm được là 0 clonePersonal[0] lấy được object {
    //         //   id: 0,
    //         //   employment_number: "",
    //         //   firstname: "",
    //         //   lastname: "",
    //         //   emailAddress: "",
    //         //   dateOfBirth: "2023-08-22T08:49:38.026Z",
    //         //   dateOfJoining: "2023-08-24T08:49:38.026Z",
    //         //   isAdmin: "",
    //         //   password: "",
    //         //   isActive: 0,
    //         // } xong gán nó bằng newItem, là object mới anh nhập từ input gì đó.
    //         setPersonal(clonePersonal); // update lại state
    //     } else {
    //         console.log(personUpdate);
    //         console.log('new');
    //         // Nếu không tìm thấy phần tử có cùng ID trong mảng
    //         // Thực hiện thêm mới
    //         setPersonal((prevItems) => [...prevItems, personUpdate]);
    //         // hàm này tìm không thấy id giống, nên set mới state luôn, nhớ là phải ...prevItems là lấy tất cả data cũ, và add thêm data mới, này giống hàm concat
    //     }

    //     console.log(personals);
    // };

    const columns = [
        {
            name: "checked",
            width: 100,
            header: (
                <Checkbox
                    checked={checkAll}
                    onChange={() => handleCheckAll()}
                    inputProps={{ "aria-label": "primary checkbox" }}
                />
            ),
            onHeaderClick: false,
            cell: (row) => {
                const isChecked = checked.includes(row.id);
                return (
                    <Checkbox
                        checked={isChecked || checkAll}
                        onChange={() => handleCheckOne(row.id, checkAll, isChecked)}
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                );
            }
        },
        {
            name: "Command",
            width: 250,
            // header: (

            // ),
            cell: d => {
                const isEditable = editable.includes(d.id);
                return !isEditable ? (
                    <Button variant="text"
                        onClick={() => {
                            setDefaultPersonal(d);
                            handleEditable(d.id)
                        }} >
                        <EditIcon />
                    </Button>
                ) : (
                    <><Button variant="text"
                        onClick={() => {
                            handleSave(d.id, personal);
                            clearState();
                        }
                        }><SaveAsIcon />
                    </Button>  |
                        <Button variant="text"><CloseIcon onClick={() => handleEditable(d.id)} /></Button> </>)
            }
        },
        // {
        //     "name": "_id",
        //     "header": "_id"
        // },
        {
            "name": "employment_number",
            "header": "employment_number"
        }
        ,
        {
            "name": "firstname",
            width: 150,
            "header": "Firstname",
            cell: d => {
                const isEditable = editable.includes(d.id);
                return isEditable ? (
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
                        noValidate
                        autoComplete="off">
                        <TextField id="outlined-basic" onChange=
                            {(e) => updateField('firstname', e.target.value)}
                            value={personal.firstname}
                            variant="standard" />
                    </Box>
                ) : (<>{d.firstname}</>)
            }
        },
        {
            "name": "lastname",
            width: 150,
            "header": "Lastname",
            cell: d => {
                const isEditable = editable.includes(d.id);
                return isEditable ? (
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic"
                            onChange=
                            {(e) => updateField('lastname', e.target.value)}
                            defaultValue={d.lastname}
                            value={personal.lastname}
                            variant="standard" />
                    </Box>
                ) : (<>{d.lastname}</>)
            }
        },
        {
            "name": "emailAddress",
            width: 150,
            "header": "EmailAddress",
            cell: d => {
                const isEditable = editable.includes(d.id);
                return isEditable ? (
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
                        noValidate
                        autoComplete="off">
                        <TextField id="outlined-basic"
                            onChange=
                            {(e) => updateField('emailAddress', e.target.value)}
                            defaultValue={d.emailAddress}
                            value={personal.emailAddress}
                            variant="standard" />
                    </Box>
                ) : (<>{d.emailAddress}</>)
            }
        },
        {
            "name": "dateOfJoining",
            "header": "DateOfJoining",
            cell: d => {
                const isEditable = editable.includes(d.id);
                return isEditable ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker defaultValue={dayjs.utc(d.dateOfJoining)}
                            onChange=
                            {(newValue) => updateField('dateOfJoining', newValue)}
                            value={dayjs.utc(personal.dateOfJoining)} />
                    </LocalizationProvider>
                ) : (<>{d.dateOfJoining}</>)
            }
        },
        {
            "name": "dateOfBirth",
            "header": "DateOfBirth",
            cell: d => {
                const isEditable = editable.includes(d.id);
                return isEditable ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker defaultValue={dayjs(d.dateOfBirth)}
                            value={dayjs.utc(personal.dateOfBirth)}
                            onChange=
                            {(newValue) => updateField('dateOfBirth', newValue)} />
                    </LocalizationProvider>
                ) : (<>{d.dateOfBirth}</>)
            }
        }
        ,
        {
            "name": "isActive",
            "header": "isActive",
            cell: d => {
                const isEditable = editable.includes(d.id);
                return isEditable ? (
                    <Switch
                        checked={personal.isActive}
                        onChange=
                        {(e) => updateField('isActive', e.target.checked)}
                    />

                ) : (<> <Switch
                    checked={d.isActive === 1}
                    disabled
                    inputProps={{ 'aria-label': 'controlled' }}
                /></>)
            }
        }
    ];

    return columns;
};

function VirtualizedTableBasic(props) {

    const dataSource = props.datasource;
    const updateFunc = props.update;
    const refreshDataFunc = props.refreshData;

    const [orderBy, setOrderBy] = useState("name");
    const [orderDirection, setOrderDirection] = useState("asc");
    const [checkAll, setCheckAll] = useState(false);
    const [checked, setChecked] = useState([]);
    const sortDir = orderDirection === "asc" ? ascend : descend;
    const processedData = sortWith([sortDir(prop(orderBy))], dataSource);

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [isEditable, setIsEditable] = useState(false);
    const [editable, setEditable] = useState([]);

    const handleCheckAll = () => {
        setCheckAll((prev) => !prev);
    };

    const handleEditable = (id) => {
        setIsEditable(!isEditable);

        setEditable((prev) => {

            if (isEditable) {
                return prev.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });

    }

    const handleSave = (id, row) => {
        console.log(row);
        if (row) {
            row.isActive = row.isActive ? 1 : 0;
            updateFunc(id, row)
                .then((reponse) => {
                    console.log(reponse);
                    refreshDataFunc();
                    console.log({ message: "The tutorial was updated successfully!" });
                })
                .catch((e) => {
                    console.log(e);
                });
        }

        setIsEditable(!isEditable);
        setEditable((prev) => {

            if (isEditable) {
                return prev.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    }

    const handleCheckOne = (id, checkAll, isChecked) => {
        if (checkAll) {
            const allOtherIds = dataSource
                .map((item) => item.id)
                .filter((item) => item !== id);

            setCheckAll(false);
            setChecked(allOtherIds);
        } else {
            setChecked((prev) => {

                if (isChecked) {
                    return prev.filter((item) => item !== id);
                } else {
                    return [...prev, id];
                }
            });
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns = DataHeader(
        checked,
        checkAll,
        handleCheckOne,
        handleCheckAll,
        editable,
        handleEditable,
        handleSave
    );

    useEffect(() => {
        if (checkAll) {
            setChecked([]);
        }
    }, [checkAll]);

    return (
        <>
            {/* <UpdateEmloyeeForm /> */}
            <Paper style={{ height: 600, width: "100%" }}>
                <AutoSizer>
                    {({ width, height }) => (
                        < MuiTable data={processedData} style={{ height: 600, width: "100%" }}
                            columns={columns}
                            // fitHeightToRows={true}
                            height={height}
                            orderBy={orderBy}
                            fixedRowCount={1}
                            // fixedColumnCount={1}
                            orderDirection={orderDirection}
                            includeHeaders={true}
                            width={width}
                            resizable={true}
                            rowHeight={64}
                            onHeaderClick={(e) => {
                                if (orderBy === e.name) {
                                    if (orderDirection === "asc") {
                                        setOrderDirection("desc");
                                    } else {
                                        setOrderDirection("asc");
                                    }
                                }
                                setOrderBy(e.name);
                            }}
                        />
                    )}
                </AutoSizer>

            </Paper>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={processedData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

class ListEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isfresh: false,
            seachPerson:
            {
                firstname: null,
                employmentnumber: null,
                lastname: null,
                dateOfBirthFrom: null,
                dateOfBirthTo: null,
                dateOfJoiningFrom: null,
                dateOfJoiningTo: null,
                isActive: null,
                Page: 1,
                PageSize: 10
            },
            counter: 0,
            alignment: null
        };
        // Binding this keyword 
        this.refreshData = this.refreshData.bind(this)
    }

    updateSearch(columnName, value) {
        this.setState(prevState => ({
            seachPerson: {                   // object that we want to update
                ...prevState.seachPerson,    // keep all other key-value pairs
                [columnName]: value
            }
        }))
    }


    refreshData() {
        console.log(this.state.seachPerson);
        console.log('refreshData');
        this.setState({
            isfresh: true
        });

        this.props.getPagedEmployeeList(this.state.seachPerson);
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.data === null) {
            console.log('this.state.data.length');
            this.setState({
                data: this.props.apiResult.data,
                isfresh: false
            });
        }

        console.log(prevProps.isfresh);
        console.log(prevState.isfresh);
        console.log(this.props.isfresh);
        console.log(this.state.isfresh);

        if ((prevProps.isfresh !== undefined && prevProps.isfresh) !== prevState.isfresh) {
            console.log('this.props.apiResult.data');
            console.log(this.props.apiResult.data);
            this.setState({
                data: this.props.apiResult.data,
                isfresh: false
            });
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.props.getPagedEmployeeList(this.state.seachPerson);
    }

    searchHandler() {
        this.setState(prevState => {
            return {
                counter: prevState.counter + 1
            };
        });
    }

    render() {

        console.log('render');
        return (
            <>
                <Stack gap={3}>
                    <div className="p-2">
                        <h1 className="liner">Employee</h1>
                    </div>
                    <div className="p-2">
                        <Form>
                            <Row className="mb-1">
                                <Form.Group as={Row} className="mb-1" controlId="formHorizontalEmail">
                                    <Form.Label column sm={1}>
                                        First name
                                    </Form.Label>
                                    <Col sm={2}>
                                        <Form.Control type="text" value={this.state.seachPerson.firstname}
                                            onChange=
                                            {(e) => this.updateSearch('firstname', e.target.value)}
                                            placeholder="First name" />
                                    </Col>
                                    <Form.Label column sm={2}>
                                        Date of Birth From
                                    </Form.Label>
                                    <Col sm={2}>
                                        <Form.Control type="date" value={this.state.seachPerson.dateOfBirthFrom}
                                            onChange=
                                            {(e) => this.updateSearch('dateOfBirthFrom', e.target.value)}
                                            placeholder="Enter Date of Birth From" />
                                    </Col>
                                    <Form.Label column sm={2}>
                                        Date of Birth To
                                    </Form.Label>
                                    <Col sm={2}>
                                        <Form.Control type="date" value={this.state.seachPerson.dateOfBirthTo}
                                            onChange=
                                            {(e) => this.updateSearch('dateOfBirthTo', e.target.value)}
                                            placeholder="Enter Date of Birth To" />
                                    </Col>
                                </Form.Group>
                            </Row>
                            <Row className="mb-1">
                                <Form.Group as={Row} className="mb-1" controlId="formHorizontalEmail">
                                    <Form.Label column sm={1}>
                                        Last name
                                    </Form.Label>
                                    <Col sm={2}>
                                        <Form.Control type="text" value={this.state.seachPerson.lastname}
                                            onChange=
                                            {(e) => this.updateSearch('lastname', e.target.value)}
                                            placeholder="Enter Last name" />
                                    </Col>
                                    <Form.Label column sm={2}>
                                        Date of Join From
                                    </Form.Label>
                                    <Col sm={2}>
                                        <Form.Control type="date" value={this.state.seachPerson.dateOfJoiningFrom}
                                            onChange=
                                            {(e) => this.updateSearch('dateOfJoiningFrom', e.target.value)}
                                            placeholder="Enter Date of Join From" />
                                    </Col>
                                    <Form.Label column sm={2}>
                                        Date of Join To
                                    </Form.Label>
                                    <Col sm={2}>
                                        <Form.Control type="date" value={this.state.seachPerson.dateOfJoiningTo}
                                            onChange=
                                            {(e) => this.updateSearch('dateOfJoiningTo', e.target.value)}
                                            placeholder="Enter Date of Join To" />
                                    </Col>
                                </Form.Group>
                            </Row>
                            <Row className="mb-1">
                                <Form.Group as={Row} className="mb-1" controlId="formHorizontalEmail">
                                    <Form.Label column sm={1}>
                                        Active
                                    </Form.Label>
                                    <Col sm={2}>
                                        <ToggleButtonGroup
                                            value={this.state.seachPerson.isActive}
                                            exclusive
                                            onChange={(event, newAlignment) => {
                                                this.setState(prevState => ({
                                                    seachPerson: {                   // object that we want to update
                                                        ...prevState.seachPerson,    // keep all other key-value pairs
                                                        isActive: newAlignment
                                                    }
                                                }))
                                            }}
                                            aria-label="text alignment">
                                            <ToggleButton value={null} aria-label="left aligned">
                                                All
                                            </ToggleButton>
                                            <ToggleButton value={0} aria-label="centered">
                                               No Active
                                            </ToggleButton>
                                            <ToggleButton value={1} aria-label="right aligned">
                                              Active
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </Col>
                                    <Col sm={7}>
                                        <Button type="submit" onClick=
                                            {(e) => {
                                                e.preventDefault();
                                                this.refreshData();
                                            }}
                                            className="mb-2">
                                            <SearchIcon /> Search
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </Row>
                        </Form>
                    </div>
                    <div className="p-2">
                        {
                            this.state.data && <VirtualizedTableBasic
                                datasource={this.state.data}
                                update={this.props.update}
                                refreshData={this.refreshData} />
                        }
                    </div>
                </Stack>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps');
    return {
        apiResult: state.apiReducer,
        isfresh: state.apiReducer.isfresh
    };
};

const mapDispatchToProps = {
    update, getPagedEmployeeList
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListEmployee);