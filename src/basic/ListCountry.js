import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { retrieveCountry } from "../redux/actions/countryActions"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Virtuoso } from 'react-virtuoso'

class ListCountry extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.retrieveCountry();
    }

    render() {
        const { countries,  } = this.props;
        const paging = countries.paging;

        return (
            <>
                <h1>ListCountry</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >id</TableCell>
                                <TableCell >CountryName</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {countries.data && countries.data.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell >{row.id}</TableCell>
                                    <TableCell >{row.countryName}</TableCell>
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
        countries: state.countries,
    };
};
const mapDispatchToProps = {
    retrieveCountry
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCountry);