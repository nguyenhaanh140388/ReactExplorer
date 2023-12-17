import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { fetchAll } from "../../redux/actions/employee.action"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

class BenefitList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAll('Benefit');
    }

    render() {
        const { data } = this.props;

        console.log(data);

        return (
            <>
                <h1 className="liner">List of Benefit</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >id</TableCell>
                                <TableCell >Name</TableCell>
                                <TableCell >Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell >{row._id}</TableCell>
                                    <TableCell >{row.Name}</TableCell>
                                    <TableCell >{row.Description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.mainReducer.data,
    };
};
const mapDispatchToProps = {
    fetchAll
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BenefitList);