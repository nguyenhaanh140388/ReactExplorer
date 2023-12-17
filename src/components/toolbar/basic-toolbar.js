import React, { useMemo, useEffect, useCallback, useState } from 'react';
import {
    Button,
    Card,
    Row,
    Col,
    Form,
    Container,
    Collapse,
    ButtonGroup,
    ButtonToolbar,
    Dropdown,
    DropdownButton,
}
    from 'react-bootstrap';

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
} from '@mui/material';

import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConfirmDialog from '../../components/dialog/confirmdialog';
import UploadFileDialog from '../../components/dialog/uploadfile-dialog';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function BasicToolBar(props) {

    const [modalShow, setModalShow] = React.useState(false);
    const [uploadFileShow, setUploadFileDialog] = React.useState(false);
    const [isDeleteForever, setDeleteForever] = React.useState(false);

    const handleClose = () => { setModalShow(false); };
    const handleSave = () => { console.log('save'); props.handlerDelele(isDeleteForever); setModalShow(false); };

    const handleUploadFileClose = () => { setUploadFileDialog(false); };
    const handleUploadFileSave = () => { console.log('save'); setUploadFileDialog(false); };

    const handleClearSearch = () => { console.log('ClearSearch'); props.clearSearch(); };

    return (
        <div>
            <ConfirmDialog
                title="Do you delete all checked department?"
                show={modalShow}
                onHide={() => setModalShow(false)}
                handleClose={handleClose}
                handleSave={handleSave}
            />

            <UploadFileDialog
                title="Please choose a any file for uploading."
                show={uploadFileShow}
                onHide={() => setUploadFileDialog(false)}
                handleClose={handleUploadFileClose}
                handleSave={handleUploadFileSave}
            />

            <ButtonToolbar  {...props} size="sm"
                aria-label="Toolbar with button groups" style={{ margin: '0px' }} >
                <ButtonGroup size="sm" className="me-2" aria-label="First group">
                    <Tooltip arrow placement="left" title="Clear">
                        <Button className='btn-atn'
                            size="sm"
                            disabled={props.disableButtonClear} onClick={handleClearSearch}>
                            <CleaningServicesIcon fontSize="small" />
                        </Button>
                    </Tooltip>
                </ButtonGroup>
                <ButtonGroup className="me-2" size="sm">
                    <Button size="sm" className='btn-atn'> <DeleteIcon /></Button>
                    <Tooltip arrow placement="left" title="Delete">
                        <DropdownButton size="sm"
                            className='btn-atn'
                            title=""
                            as={ButtonGroup}
                            id="bg-vertical-dropdown-2">
                            <Dropdown.Item key={1} onClick={() => {
                                setModalShow(true);
                                setDeleteForever(false);
                            }}>
                                <Tooltip title="Delete">
                                    <DeleteIcon />
                                </Tooltip>
                            </Dropdown.Item>
                            <Dropdown.Item key={2} onClick={() => {
                                setModalShow(true);
                                setDeleteForever(true);
                            }}>
                                <Tooltip title="DeleteForever">
                                    <DeleteForeverIcon />
                                </Tooltip>
                            </Dropdown.Item>
                        </DropdownButton>
                    </Tooltip>
                </ButtonGroup>
                <ButtonGroup className="me-2" size="sm">
                    <Button size="sm" className='btn-atn' onClick={() => {
                        setUploadFileDialog(true);
                    }}> <ImportExportIcon />

                    </Button>
                    <Button  className='btn-atn'> <ExitToAppIcon /></Button>
                </ButtonGroup>
            </ButtonToolbar>
        </div>

    );
}