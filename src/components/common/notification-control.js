import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessMessage = () => {
    toast.success('Save successful!', {
        position: toast.POSITION.TOP_CENTER
    },
        {
            data: {
                title: 'Success toast',
                text: 'This is a success message'
            }
        });
};

export const showErrorMessage = (error) => {
    let content = 'Save error!' + '\n' + '[Desciption]: ' + error
    toast.error(content, {
        position: toast.POSITION.TOP_CENTER
    });
};

