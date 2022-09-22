import { useTable, TableOptions } from "react-table";

function Table({ data, columns }: TableOptions<any>) {
  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="overflow-x-auto">
      <table className="table w-full" {...getTableProps()}>
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell, idx) => {
                      // Apply the cell props
                      return (
                        <td
                          className={idx === 0 ? "w-full" : ""}
                          {...cell.getCellProps()}
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
