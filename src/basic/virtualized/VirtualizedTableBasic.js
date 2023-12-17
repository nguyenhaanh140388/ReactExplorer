import React, { useEffect, useState } from "react";
import MuiTable from 'mui-virtualized-table';
import { AutoSizer } from "react-virtualized";
import Paper from "@material-ui/core/Paper";
import { sortWith, prop, ascend, descend } from "ramda";
import { dataHeader, createPersonData } from "./TableData";

export default function VirtualizedTableBasic() {

    const dataSource = createPersonData(5000);

    const [orderBy, setOrderBy] = useState("name");
    const [orderDirection, setOrderDirection] = useState("asc");
    const [checkAll, setCheckAll] = useState(false);
    const [checked, setChecked] = useState([]);
    const sortDir = orderDirection === "asc" ? ascend : descend;
    const processedData = sortWith([sortDir(prop(orderBy))], dataSource);

    const handleCheckAll = () => {
        setCheckAll((prev) => !prev);
    };

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

    const columns = dataHeader(
        checked,
        checkAll,
        handleCheckOne,
        handleCheckAll
    );

    useEffect(() => {
        if (checkAll) {
            setChecked([]);
        }
    }, [checkAll]);

    return (
        <Paper style={{ height: 300, width: "100%" }}>
            <AutoSizer>
                {({ width, height }) => (
                    < MuiTable data={processedData} style={{ height: 250 }}
                        columns={columns}
                        columnWidth={40}
                        height={height}
                        orderBy={orderBy}
                        orderDirection={orderDirection}
                        includeHeaders={true}
                        width={width}
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
    );
}