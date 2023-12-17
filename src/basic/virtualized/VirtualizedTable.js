import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import MuiTable from "mui-virtualized-table";

const useVirtualizedTableStyles = makeStyles({
  root: {
    "& .MuiTableCell-root": {
      "background-color": "#fff"
    },
    "& .topLeftGrid, & .topRightGrid": {
      border: "none",
      "border-bottom": "1px solid"
    },
    "& .bottomLeftGrid": {
      border: "none"
    }
  },
  headerCell: {
    color: "#9a9a9a",
    "font-size": "12px",
    "background-color": "#fff"
  },
  stickyCell: {
    display: "flex",
    "align-items": "center"
    // "&:nth-of-type(odd)": {
    //   "background-color": "#eee"
    // }
  }
});

const VirtualizedTable = props => {
  const { data = [], columns = [], order = null, orderBy = null } = props;

  const classes = useVirtualizedTableStyles();

  return (
    <div className={classes.root} style={{ height: "calc(100vh)" }}>
      <AutoSizer>
        {({ width, height }) => (
          <MuiTable
            data={data}
            columns={columns}
            orderBy={orderBy}
            orderDirection={order}
            includeHeaders={true}
            cellProps={(column, row) => {
              if (data.indexOf(row) > 0 && data.indexOf(row) % 2 !== 0) {
                return {
                  style: {
                    "background-color": "#eee"
                  }
                };
              }
              if (column.name === columns[0].name) {
                return {
                  className: `
                    ${classes.stickyColumnClass}
                    ${classes.stickyCell}
                  `
                };
              }
            }}
            width={width}
            maxHeight={800}
            fixedRowCount={1}
            fixedColumnCount={1}
            style={{ tableLayout: "fixed", backgroundColor: "white" }}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedTable;
