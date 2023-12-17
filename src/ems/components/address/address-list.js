import React, { useMemo, useEffect, useCallback, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
//nested data is ok, see accessorKeys in ColumnDef below
import employeeService from "../../../dataservice/employee.service"
import { useDispatch, useSelector } from 'react-redux'
import { RETRIEVE_DATA } from "../../../redux/actions/type"
import { Delete, Edit } from '@mui/icons-material';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';

import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ContrySelectList from '../../../components/common/contries-select-list';
import PostCodeSelectList from '../../../components/common/postcode-select-list';
import countries from "i18n-iso-countries";

// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";



export default function AddressList() {
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();
    const apiReducer = useSelector(state => state.apiReducer);
    const [isEditable, setIsEditable] = useState(false);
    const [editable, setEditable] = useState([]);
    const [address, setAddress] = useState(
        {
            AddressLine1: '',
            AddressLine2: '',
            City: '',
            Country: '',
            Employee_Id: '',
            Postcode: '',
            _id: '',
        });

    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [sorting, setSorting] = useState([]);

    const searchAddress =
    {
        columnFilters: JSON.stringify(columnFilters ?? []),
        filters: JSON.stringify(columnFilters ?? []),
        sorting: JSON.stringify(JSON.stringify(sorting ?? []))
    };

    // Have to register the languages you want to use
    countries.registerLocale(enLocale);
    countries.registerLocale(itLocale);

    const fetchAll = async () => {
        try {
            const res = await employeeService.getAll('Address');
            console.log(res);
            dispatch({
                type: RETRIEVE_DATA,
                payload: res.data.dataSource,
            });
        } catch (error) {
            console.log(error)
        }
    }

    // const handleSaveRow = async ({ exitEditingMode, row, values }) => {

    //     //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
    //     tableData[row.index] = values;
    //     //send/receive api updates here
    //     setTableData([...tableData]);
    //     exitEditingMode(); //required to exit editing mode

    //     console.log(values);
    // };

    // const handleCancelRowEdits = () => {
    //     setValidationErrors({});
    // };

    const updateField = (columnName, value) => {
        console.log(value);
        setAddress({
            ...address,
            [columnName]: value
        });
    }

    const setDefaultAddress = (row) => {
        setAddress({
            AddressLine1: row.AddressLine1,
            AddressLine2: row.AddressLine2,
            City: row.City,
            Country: row.Country,
            Employee_Id: row.Employee_Id,
            Postcode: row.Postcode,
        });
    };

    const clearState = () => {
        setAddress({
            AddressLine1: '',
            AddressLine2: '',
            City: '',
            Country: '',
            Postcode: '',
        });
    };

    const handleSave = (id, row) => {
        console.log(row);
        if (row) {
            // row.isActive = row.isActive ? 1 : 0;
            // updateFunc(id, row)
            //     .then((reponse) => {
            //         console.log(reponse);
            //         refreshDataFunc();
            //         console.log({ message: "The tutorial was updated successfully!" });
            //     })
            //     .catch((e) => {
            //         console.log(e);
            //     });
        }

        handleEditable(id);
    }

    // const handleDeleteRow = useCallback(
    //     (row) => {
    //         if (
    //             console.log('error')
    //         ) {
    //             return;
    //         }
    //         tableData.splice(row.index, 1);
    //         setTableData([...tableData]);
    //     },
    //     [tableData],
    // );


    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid =
                        cell.column.id === 'email'
                            ? validateEmail(event.target.value)
                            : cell.column.id === 'age'
                                ? validateAge(+event.target.value)
                                : validateRequired(event.target.value);
                    if (!isValid) {
                        //set validation error for cell if invalid
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: `${cell.column.columnDef.header} is required`,
                        });
                    } else {
                        //remove validation error for cell if valid
                        delete validationErrors[cell.id];
                        setValidationErrors({
                            ...validationErrors,
                        });
                    }
                },
            };
        },
        [validationErrors],
    );

    const columns =
        // useMemo (() =>
        [
            {
                accessorKey: 'AddressLine1',
                header: 'AddressLine1',
                size: 150,
                Cell: ({ cell, row }) => {
                    const inputEditable = editable.includes(row.original._id);
                    return inputEditable ? (
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}
                            noValidate
                            autoComplete="off">
                            <TextField id="outlined-basic"
                                onChange={(e) => updateField('AddressLine1', e.target.value)}
                                value={address.AddressLine1}
                                variant="standard" />
                        </Box>
                    ) : (<>{row.original.AddressLine1}</>)
                },
            },
            {
                accessorKey: 'AddressLine2',
                header: 'AddressLine2',
                size: 150,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
                Cell: ({ cell, row }) => {
                    const inputEditable = editable.includes(row.original._id);
                    return inputEditable ? (
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}
                            noValidate
                            autoComplete="off">
                            <TextField id="outlined-basic"
                                onChange={(e) => updateField('AddressLine2', e.target.value)}
                                value={address.AddressLine2}
                                variant="standard" />
                        </Box>
                    ) : (<>{row.original.AddressLine2}</>)
                },
            },
            {
                accessorKey: 'City',
                header: 'City',
                size: 150,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
                Cell: ({ cell, row }) => {
                    const inputEditable = editable.includes(row.original._id);
                    return inputEditable ? (
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}
                            noValidate
                            autoComplete="off">
                            <TextField id="outlined-basic"
                                onChange={(e) => updateField('City', e.target.value)}
                                value={address.City}
                                variant="standard" />
                        </Box>
                    ) : (<>{row.original.City}</>)
                }
            },
            {
                accessorKey: 'Country',
                header: 'Country',
                size: 150,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
                Cell: ({ cell, row }) => {
                    const inputEditable = editable.includes(row.original._id);
                    return inputEditable ? (
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}
                            noValidate
                            autoComplete="off">
                            <ContrySelectList
                                selectedCountry={address.Country}
                                selectCountryHandler={handlerCountrySelectList}
                            />
                        </Box>
                    ) : (<>{countries.getName(row.original.Country, "en")}</>)
                }
            },
            {
                accessorKey: 'Postcode',
                header: 'Postcode',
                size: 150,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
                Cell: ({ cell, row }) => {
                    const inputEditable = editable.includes(row.original._id);
                    return inputEditable ? (
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}
                            noValidate
                            autoComplete="off">
                            {/* <TextField id="outlined-basic"
                                type="number"
                                onChange={(e) => updateField('Postcode', e.target.value)}
                                value={address.Postcode}
                                variant="standard" /> */}
                            <PostCodeSelectList
                                selectedPostCode={address.PostCode}
                                selectPostCodeHandler={handlerPostCodeSelectList}
                            />
                        </Box>
                    ) : (<>{row.original.Postcode}</>)
                }
            }
        ]
    //     ,
    //     [getCommonEditTextFieldProps],
    // );

    useEffect(() => {
        fetchAll();
    }, [
        columnFilters,
        globalFilter,
        pagination.pageIndex,
        pagination.pageSize,
    ]);

    const validateRequired = (value) => !!value.length;
    const validateEmail = (email) =>
        !!email.length &&
        email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    const validateAge = (age) => age >= 18 && age <= 50;


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

    // const handleEditingRowChange = (row, table) => {
    //     console.log('handleEditingRowChange');
    // };

    const handlerCountrySelectList = (value) => {
        updateField('Country', value);
    };

    const handlerPostCodeSelectList = (value) => {
        updateField('PostCode', value);
    };

    return (
        <div >
            <Stack gap={3}>
                <div className="p-2">
                    <h1 className="liner">Address</h1>
                </div>
                <div className="p-2">
                    <Form>
                        <Row className="mb-1">
                            <Form.Group as={Row} className="mb-1" controlId="formHorizontalEmail">
                                <Form.Label column sm={1}>
                                    AddressLine1
                                </Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="text"
                                        placeholder="Enter AddressLine1" />
                                </Col>
                                <Form.Label column sm={2}>
                                    Date of Birth From
                                </Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="date"
                                        placeholder="Enter Date of Birth From" />
                                </Col>
                                <Form.Label column sm={2}>
                                    Date of Birth To
                                </Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="date"
                                        placeholder="Enter Date of Birth To" />
                                </Col>
                            </Form.Group>
                        </Row>
                        <Row className="mb-1">
                            <Form.Group as={Row} className="mb-1" controlId="formHorizontalEmail">
                                <Form.Label column sm={1}>
                                    AddressLine2
                                </Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="text"
                                        placeholder="Enter AddressLine1" />
                                </Col>
                                <Form.Label column sm={2}>
                                    Date of Join From
                                </Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="date"
                                        placeholder="Enter Date of Join From" />
                                </Col>
                                <Form.Label column sm={2}>
                                    Date of Join To
                                </Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="date"
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
                                        exclusive

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
                                            console.log(columnFilters);
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
                    <MaterialReactTable
                        columns={columns}
                        data={apiReducer.data}
                        // editingMode="row"
                        enableColumnOrdering
                        enableEditing
                        manualFiltering
                        manualPagination
                        manualSorting
                        //onEditingRowSave={handleSaveRow}
                        //onEditingRowChange={handleEditingRowChange}
                        onColumnFiltersChange={setColumnFilters}
                        onGlobalFilterChange={setGlobalFilter}
                        onPaginationChange={setPagination}
                        renderRowActions={({ exitEditingMode, row, table }) => {
                            const inputEditable = editable.includes(row.original._id);

                            return !inputEditable ? (
                                <Box sx={{ display: 'flex', gap: '1rem' }}>
                                    <Tooltip arrow placement="left" title="Edit">
                                        <IconButton onClick={() => {
                                            //table.setEditingRow(row);
                                            handleEditable(row.original._id);
                                            setDefaultAddress(row.original);
                                            console.log(editable);
                                        }}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip arrow placement="right" title="Delete">
                                        <IconButton color="error" onClick={() => {

                                        }}>
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            ) : <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <Tooltip arrow placement="left" title="Edit">
                                    <IconButton onClick={() => {
                                        //table.setEditingRow(row);
                                        handleSave(row.original._id, address);
                                        clearState();
                                    }}>
                                        <SaveAsIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip arrow placement="left" title="Edit">
                                    <IconButton onClick={() => {
                                        handleEditable(row.original._id);
                                    }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        }}
                    />
                </div>
            </Stack>
        </div>
    );
}