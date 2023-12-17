import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import MuiTable from "mui-virtualized-table";
import { createDessertData, createPersonData } from "./TableData";
import VirtualizedTable from "./VirtualizedTable";

const data = createPersonData(5000);

const VirtualizedTableShow = () => {
    const [tableData, setTableData] = useState(data);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("age");

    const handleCkeckedAll = e => {
        setSelectedRowIds(prevState =>
            prevState.length === data.length ? [] : data.map(d => d.id)
        );
    };
    const handleCkecked = (e, d) => {
        if (e.target.checked) {
            setSelectedRowIds(prevState => [...prevState, d.id]);
        } else {
            setSelectedRowIds(prevState => prevState.filter(e => e !== d.id));
        }
    };

    // 改變排序
    const handleRequestSort = property => {
        const isDesc = orderBy === property && order === "desc";
        const newOrder = isDesc ? "asc" : "desc";
        setOrder(newOrder);
        setOrderBy(property);

        onChangeTableSort(newOrder, property);
    };
    const onChangeTableSort = (order, property) => {
        const newData = stableSort(tableData, getComparator(order, property));
        setTableData(newData);
    };
    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    };
    const getComparator = (order, orderBy) => {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };
    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const indeterminate =
        selectedRowIds.length > 0 && selectedRowIds.length !== data.length;

    return (
        <VirtualizedTable
            data={stableSort(tableData, getComparator(order, orderBy))}
            order={order}
            orderBy={orderBy}
            columns={[
                {
                    name: "name",
                    width: 180,
                    onHeaderClick() {
                        handleRequestSort("name");
                    },
                    header: (
                        <div>
                            <Checkbox
                                checked={selectedRowIds.length > 0}
                                indeterminate={indeterminate}
                                onChange={handleCkeckedAll}
                            />
                            Name
                        </div>
                    ),
                    cell: d => (
                        <div>
                            <Checkbox
                                onChange={e => handleCkecked(e, d)}
                                checked={selectedRowIds.includes(d.id)}
                            />
                            {d.name}
                        </div>
                    )
                },
                {
                    name: "jobTitle",
                    header: "Job Title",
                    width: 200,
                    onHeaderClick() {
                        handleRequestSort("jobTitle");
                    }
                },
                {
                    name: "jobArea",
                    header: "Job Area",
                    width: 200,
                    onHeaderClick() {
                        handleRequestSort("jobArea");
                    }
                },
                {
                    name: "jobType",
                    header: "Job Type",
                    width: 200,
                    onHeaderClick() {
                        handleRequestSort("jobType");
                    }
                }
            ]}
        />
    );
};

export default VirtualizedTableShow;
