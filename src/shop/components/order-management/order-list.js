import React, { useMemo, useEffect, useCallback, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import productService from "../../dataservices/product.service"

import { useDispatch, useSelector } from 'react-redux'
import { RETRIEVE_DATA, UPDATE_DATA } from "../../../redux/actions/type"
import { Link, Route, Routes } from 'react-router-dom';
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
    Checkbox,
    Switch,
} from '@mui/material';

import {
    Button,
    Card,
    Row,
    Col,
    Form,
    Container,
    Collapse,
}
    from 'react-bootstrap';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import BasicToolbar from '../../../components/toolbar/basic-toolbar';
import {
    EditInlineControl,
    TextFieldControlName,
    SwitchControlName,
    EditButtonName,
    SaveButtonName
} from '../../../components/common/edit-inline-control';

import countries from "i18n-iso-countries";
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";

export default function OrderList() {
    const dispatch = useDispatch();
    const apiReducer = useSelector(state => state.apiReducer);
    const [isEditable, setIsEditable] = useState(false);
    const [editable, setEditable] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [checked, setChecked] = useState([]);

    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [hasError, setError] = useState(false);
    const [pagination, setPagination] = useState({
        pageIndex: 1,
        pageSize: 10,
    });

    const [sorting, setSorting] = useState([]);

    const [updateDepartment, setUpdateDepartment] = useState({
        name: '',
        dateOfCreateFrom: '',
        dateOfCreateTo: '',
        dateOfUpdateFrom: '',
        dateOfUpdateTo: '',
        isActive: 0,
        isSearch: false,
    });

    const [searchDepartment, setSearchDepartment] = useState({
        name: '',
        dateOfCreateFrom: '',
        dateOfCreateTo: '',
        dateOfUpdateFrom: '',
        dateOfUpdateTo: '',
        isActive: 2,
        isSearch: false,
    });

    const gridSearch = {
        columnFilters: JSON.stringify(columnFilters ?? []),
        globalFilter: globalFilter,
        multiSort: JSON.stringify(sorting ?? []),
        page: pagination.pageIndex,
        take: pagination.pageSize,
        name: searchDepartment.name,
        dateOfCreateFrom: searchDepartment.dateOfCreateFrom,
        dateOfCreateTo: searchDepartment.dateOfCreateTo,
        dateOfUpdateFrom: searchDepartment.dateOfUpdateFrom,
        dateOfUpdateTo: searchDepartment.dateOfUpdateTo,
        isActive: searchDepartment.isActive,
    }

    const [open, setOpen] = useState(false);

    // Have to register the languages you want to use
    countries.registerLocale(enLocale);
    countries.registerLocale(itLocale);

    const handleCheckAll = () => {
        setCheckAll((prev) => !prev);
    };

    const handleCheckOne = (id, checkAll, isChecked) => {
        console.log('handleCheckOne');
        if (checkAll) {
            const allOtherIds = apiReducer.data
                .map((item) => item.id)
                .filter((item) => item !== id);
            setCheckAll(false);
            setChecked(allOtherIds);
            console.log('allOtherIds');
        } else {
            console.log('checked');
            setChecked((prev) => {

                if (isChecked) {
                    return prev.filter((item) => item !== id);
                } else {
                    return [...prev, id];
                }
            });
        }
    };

    const update = async (id, data) => {
        try {
            const res = await productService.update(id, data);

            dispatch({
                type: UPDATE_DATA,
                payload: data,
            });

            return Promise.resolve(res.data);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const fetchAll = async () => {
        try {
            const res = await productService.getProducts(gridSearch);
            console.log(res);
            dispatch({
                type: RETRIEVE_DATA,
                payload: res.data.dataSource,
                paging: {
                    hasNextPage: res.data.hasNextPage,
                    hasPreviousPage: res.data.hasPreviousPage,
                    pageIndex: res.data.pageIndex,
                    pageSize: res.data.pageSize,
                    totalCount: res.data.totalCount,
                    totalPageCount: res.data.totalPageCount,
                },
                error: res.data.errors
            });
        } catch (error) {
            console.log(error)
        }
    }
    const updateField = (columnName, value) => {
        setUpdateDepartment({
            ...updateDepartment,
            [columnName]: value
        });
    }

    const setDefaultDepartment = (row) => {
        setUpdateDepartment({
            ...updateDepartment,
            name: row.name,
            isActive: row.isActive === "True",
        });
    };

    const clearState = () => {
        setSearchDepartment({
            ...updateDepartment,
            name: '',
            dateOfCreateFrom: '',
            dateOfCreateTo: '',
            dateOfUpdateFrom: '',
            dateOfUpdateTo: '',
            isActive: 0
        });
    };

    const handleSave = (id, row) => {
        console.log(row);
        if (row) {
            update(id, row)
                .then((reponse) => {
                    console.log(reponse);
                    setSearchDepartment({ ...searchDepartment, isSearch: !searchDepartment.isSearch });
                    console.log({ message: "The tutorial was updated successfully!" });
                })
                .catch((e) => {
                    console.log(e);
                });

        }


        handleEditable(id);
    }

    const usStateList = [
        'True',
        'False',
    ];

    const columns =
        // useMemo (() =>
        [
            {
                accessorKey: 'name1',
                header: (
                    <Checkbox
                        checked={checkAll}
                        onChange={() => { handleCheckAll(); }}
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                ),
                enableColumnActions: false,
                enableEditing: false,
                enableColumnFilter: false,
                enableColumnOrdering: false,
                enableMultiSort: false,
                enableSorting: false,
                size: 10,
                Cell: ({ cell, row }) => {
                    const isChecked = checked.includes(row.original.id);
                    return (
                        <Checkbox
                            checked={isChecked || checkAll}
                            onChange={() => handleCheckOne(row.original.id, checkAll, isChecked)}
                            inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    );
                }
            },
            {
                accessorKey: 'name',
                header: 'name',
                size: 150,
                Cell: ({ cell, row }) => {
                    const inputEditable = editable.includes(row.original.id);
                    return inputEditable ? (
                        <EditInlineControl
                            type={TextFieldControlName}
                            value={updateDepartment.name}
                            checkIsValid={hasError}
                            bindindName='name'
                            updateField={updateField}
                        />
                    ) : (<>{row.original.name}</>)
                },
            },
            {
                accessorKey: 'isActive',
                header: 'State',
                size: 50,
                filterVariant: 'multi-select',
                filterSelectOptions: usStateList,
                Cell: ({ cell, row }) => {
                    const inputEditable = editable.includes(row.original.id);
                    return inputEditable ? (
                        <EditInlineControl
                            type={SwitchControlName}
                            value={updateDepartment.isActive}
                            bindindName='isActive'
                            updateField={updateField}
                        />
                    ) : (<> <Switch
                        checked={row.original.isActive === "True"}
                        disabled
                        inputProps={{ 'aria-label': 'controlled' }}
                    /></>)
                }
            },
            {
                header: 'Actions',
                enableColumnActions: false,
                enableEditing: false,
                enableColumnFilter: false,
                enableColumnOrdering: false,
                enableMultiSort: false,
                enableSorting: false,
                size: 50,
                Cell: ({ cell, row }) => {
                    const inputEditable = editable.includes(row.original.id);
                    return !inputEditable ? (
                        <EditInlineControl
                            type={EditButtonName}
                            editClick={() => {
                                handleEditable(row.original.id);
                                setDefaultDepartment(row.original);
                            }} />
                    ) : <EditInlineControl
                        type={SaveButtonName}
                        saveClick={() => {
                            handleSave(row.original.id, updateDepartment);
                            clearState();
                        }}
                        closeClick={() => {
                            handleEditable(row.original.id);
                        }} />
                }
            }
        ]

    useEffect(() => {
        console.log(gridSearch);
        fetchAll();
        if (checkAll) {
            const allOtherIds = apiReducer.data
                .map((item) => item.id);
            setChecked(allOtherIds);
        }
        else {
            setChecked([]);
        }

    }, [
        columnFilters,
        globalFilter,
        pagination.pageIndex,
        pagination.pageSize,
        sorting,
        searchDepartment.isSearch,
        checkAll
    ]);

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

    const updateSearch = (columnName, value) => {
        setSearchDepartment({
            ...searchDepartment,
            [columnName]: value
        });
    }

    return (
        <div >
            <Stack >
                <div className="p-2">
                    <h4 className="liner"  >Product-Mananagement</h4>
                </div>
                <div className="p-2">
                    {/* <HelpOutlineIcon style={{ float: 'left', cursor: 'help' }} onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open} />
                    <Collapse in={open}>
                        <Card body style={{ width: '600px', marginBottom: '10px', boxShadow: '10px 10px 10px #AAB7B8' }}>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life
                            accusamus terry richardson ad squid. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred nesciunt sapiente
                            ea proident.
                            Anim pariatur cliche reprehenderit, enim eiusmod high life
                            accusamus terry richardson ad squid. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred nesciunt sapiente
                            ea proident..
                        </Card>
                    </Collapse> */}
                    <Container
                        gap={2}
                        style={{ marginTop: '10px', marginLeft: '0px' }} >
                        <Row style={{ height: '40px' }}>
                            <Col sm={1} style={{ textAlign: 'left' }}>
                                Name
                            </Col>
                            <Col sm={3} style={{ textAlign: 'left' }} >
                                <Form.Control type="text"
                                    value={searchDepartment.name}
                                    style={{ marginLeft: '0px' }}
                                    onChange=
                                    {(e) => updateSearch('name', e.target.value)}
                                    placeholder="Enter name" />
                            </Col>
                            {/* border: "1px solid #343434"  */}
                            <Col style={{ textAlign: 'left' }}> Date of Create From</Col>
                            <Col sm><Form.Control type="date"
                                value={searchDepartment.dateOfCreateFrom}
                                onChange=
                                {(e) => updateSearch('dateOfCreateFrom', e.target.value)}
                                placeholder="Enter Date of Create From" /></Col>
                            <Col sm style={{ textAlign: 'left' }}>Date of Create To</Col>
                            <Col sm><Form.Control type="date"
                                value={searchDepartment.dateOfCreateTo}
                                onChange=
                                {(e) => updateSearch('dateOfCreateTo', e.target.value)}
                                placeholder="Enter Date of Create To" /></Col>
                        </Row>
                        <Row style={{ height: '40px' }}>
                            <Col sm={1} style={{ textAlign: 'left' }}>
                                State
                            </Col>
                            <Col sm={3}  >
                                <ToggleButtonGroup
                                    value={searchDepartment.isActive}
                                    exclusive
                                    size="sm"
                                    onChange=
                                    {(event, newAlignment) => updateSearch('isActive', newAlignment)}
                                    style={{ marginLeft: '-75px' }}
                                    aria-label="text alignment">
                                    <ToggleButton value={2} aria-label="left aligned">
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
                            <Col sm style={{ textAlign: 'left' }}> Date of Update From</Col>
                            <Col sm><Form.Control type="date" value={searchDepartment.dateOfUpdateFrom}
                                onChange=
                                {(e) => updateSearch('dateOfUpdateFrom', e.target.value)}
                                placeholder="Enter Date of Update From" /></Col>
                            <Col sm style={{ textAlign: 'left' }}>Date of Update To</Col>
                            <Col sm><Form.Control type="date" value={searchDepartment.dateOfUpdateTo}
                                onChange=
                                {(e) => updateSearch('dateOfUpdateTo', e.target.value)}
                                placeholder="Enter Date of Update To" /></Col>
                        </Row>
                        <Row style={{ height: '40px' }}>
                            <Col sm={1}></Col>
                            <Col sm></Col>
                            <Col sm></Col>
                            <Col sm></Col>
                            <Col lg={true} >
                                <Button type="submit"
                                    size="sm"
                                    style={{ marginLeft: '-20px' }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        console.log(gridSearch);
                                        setSearchDepartment({ ...searchDepartment, isSearch: !searchDepartment.isSearch });
                                    }}
                                    className="mb-2">
                                    <SearchIcon /> Search
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className='p-2'>
                    <BasicToolbar
                    // disableButtonClear={false}
                    />
                </div>
                <div className="p-2">
                    {
                        apiReducer.data && <MaterialReactTable
                            columns={columns}
                            data={apiReducer.data}
                            enableColumnOrdering
                            manualFiltering
                            manualPagination
                            manualSorting
                            onColumnFiltersChange={setColumnFilters}
                            onGlobalFilterChange={setGlobalFilter}
                            onPaginationChange={setPagination}
                            onSortingChange={setSorting}
                            isMultiSortEvent={() => true}
                            initialState={{ density: 'compact' }}
                            rowCount={apiReducer.paging.totalCount}
                            state={{
                                columnFilters,
                                globalFilter,
                                pagination,
                                sorting,
                                searchDepartment,
                                checkAll
                            }}
                            renderTopToolbarCustomActions={() => (
                                <Tooltip arrow placement="left" title="Insert new department">
                                    <Link to="/product-management/product-add">
                                        <Button
                                            size="sm"
                                            style={{ cursor: 'default' }}
                                            onClick={() => {

                                            }}>
                                            <AddCircleIcon /> New
                                        </Button>
                                    </Link>
                                </Tooltip>
                            )}
                        />
                    }
                </div>
            </Stack >
        </div >
    );
}