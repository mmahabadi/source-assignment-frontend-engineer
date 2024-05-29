import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './button';
import { dataTableAction, dataTableColumn } from '../types';
import { LoadingIndicator } from './loading-indicator';
import { ReactElement, useEffect, useRef, useState } from 'react';

type propTypes = {
  loading: boolean;
  columns: dataTableColumn[];
  data: unknown[];
  actions: dataTableAction[];
};

const DataTable = ({ loading, columns, data, actions }: propTypes) => {
  const [page, setPage] = useState(0);
  //TODO: define global settings for page size
  const pageSize = useRef(7);
  const [filteredData, setFilteredData] = useState<unknown[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (data?.length > 0) {
      const start = page * pageSize.current;
      const end = start + pageSize.current;
      setFilteredData((data as unknown[]).slice(start, end));
      setTotalPages(Math.ceil(data?.length / pageSize.current));
    }
  }, [data, page]);

  if (!columns || !data) {
    return null;
  }

  if (!columns.length) {
    return <div>No columns</div>;
  }

  if (!loading && !data.length) {
    return <div>No data</div>;
  }

  const prevHandler = () => page > 0 && setPage(page - 1);
  const nextHandler = () => {
    const start = page * pageSize.current;
    const end = start + pageSize.current;
    end < data?.length && setPage(page + 1);
  };
  return (
    <Table>
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead>#</TableHead>
          {columns.map((column: dataTableColumn, index: number) => (
            <TableHead key={`col-${column?.prop}`}>{column?.title}</TableHead>
          ))}
          {actions?.map((action: dataTableAction) => (
            <TableHead
              key={`col-${action?.label}`}
              className="text-right"
            ></TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && (
          <TableRow>
            <TableCell colSpan={columns.length + actions?.length + 1}>
              <LoadingIndicator />
            </TableCell>
          </TableRow>
        )}
        {filteredData.map((row: unknown, index: number) => (
          <TableRow key={`row-${(row as { id: string })?.id || index}`}>
            <TableCell>{page * pageSize.current + index + 1}</TableCell>
            {columns.map((column: dataTableColumn) => {
              if (!column.prop) return null;
              let content = (row as { [key: string]: unknown })[column.prop];
              if (column.template) {
                content = column.template(row);
              }
              return (
                <TableCell key={`row-${column.prop}`}>
                  {content as ReactElement}
                </TableCell>
              );
            })}
            {actions?.map((action: dataTableAction) => (
              <TableCell key={`action-${action.label}`} className="text-right">
                <Button variant="link" onClick={() => action.onClick(row)}>
                  {action.label}
                </Button>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={columns.length + actions?.length}>
            <Button
              variant="default"
              disabled={page === 0}
              onClick={prevHandler}
            >
              Prev
            </Button>
            <Button
              variant="default"
              disabled={page + 1 === totalPages}
              onClick={nextHandler}
            >
              Next
            </Button>
          </TableCell>
          <TableCell className="text-right">
            Page: {page + 1} of {totalPages}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export { DataTable };
