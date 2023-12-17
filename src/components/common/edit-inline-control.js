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
    Switch
} from '@mui/material';

import { Delete, Edit } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import SaveAsIcon from '@mui/icons-material/SaveAs';

export const TextFieldControlName = "TextField";
export const SwitchControlName = "SwitchControl";
export const EditButtonName = "EditButtonName";
export const SaveButtonName = "SaveButtonName";

export function EditInlineControl({ type,
    bindindName,
    value,
    updateField,
    checkIsValid,
    editClick,
    deleteClick,
    saveClick,
    closeClick }) {
    switch (type) {
        case TextFieldControlName:
            return (
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}
                    //noValidate
                    autoComplete="off">
                    <TextField id="outlined-basic"
                        error={checkIsValid}
                        onChange={(e) => updateField(bindindName, e.target.value)}
                        value={value}
                        variant="standard" />
                </Box>
            );
        case SwitchControlName:
            return (
                <Switch
                    checked={value}
                    onChange=
                    {(e) => updateField(bindindName, e.target.checked)}
                />
            );
        case EditButtonName:
            return (
                <Box sx={{ display: 'flex' }}>
                    <Tooltip arrow placement="left" title="Edit">
                        <IconButton onClick={editClick}>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow placement="right" title="Delete">
                        <IconButton color="error" onClick={deleteClick}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Box>
            );
        case SaveButtonName:
            return (
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Tooltip arrow placement="left" title="Save">
                        <IconButton onClick={saveClick}>
                            <SaveAsIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow placement="left" title="Close">
                        <IconButton onClick={closeClick}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            );
        default:
            return (
                <>4</>
            );
    }
}