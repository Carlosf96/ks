import React from 'react';
import {
  Paper,
  Menu,
  MenuItem,
  IconButton,
  TablePagination,
  Table,
} from '@material-ui/core/';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from 'react-loading-skeleton';

import { Order } from '@/modules/Jobs/typings';
import KTableCell from '@/components/KTableCell';
import KTableRow from '@/components/KTableRow';
import KTableBody from '@/components/KTableBody';
import KTableContainer from '@/components/KTableContainer';
import {
  stableSort,
  getSorting,
} from '@/components/KTable/partials/EnhancedTableHead/utils/sorting';
import EnhancedTableHead from '@/components/KTable/partials/EnhancedTableHead';
import { isMobile } from '@/utils/helpers';

interface Options {
  view?: string;
  edit: string;
  delete: (id: number) => void;
}
interface ITableProps {
  data: any[];
  headCells: Array<any>;
  isLoading?: boolean;
  options?: Options;
}

function formatStrings(i: number, user: any) {
  return i ? user.name + '' : user.name + ', ';
}

const KTable: React.FC<ITableProps> = ({
  data,
  headCells,
  options,
  isLoading,
}) => {
  type Data = any;
  const [order, setOrder] = React.useState<Order>('asc');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [orderBy, setOrderBy] = React.useState<keyof Data>('title');
  const [page, setPage] = React.useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  // const [routeId, setRouteId] = useState(-1);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // setRouteId(parseInt(event.currentTarget.id, 10));
  };

  const handleClose = (_event: unknown, _id: any) => {
    setAnchorEl(null);
    // setRouteId(-1);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const ITEM_HEIGHT = 48;
  const isSticky = !isMobile();

  return (
    <KTableContainer component={Paper}>
      <Table stickyHeader={isSticky}>
        <EnhancedTableHead
          headCells={headCells}
          order={order}
          orderBy={String(orderBy)}
          onRequestSort={handleRequestSort}
          rowCount={data.length}
        />
        <KTableBody>
          {isLoading
            ? Array(rowsPerPage)
                .fill(null)
                .map((el, i) => (
                  <KTableRow key={i}>
                    {headCells.map((el, i) => {
                      return (
                        <KTableCell key={i}>
                          <Skeleton />
                        </KTableCell>
                      );
                    })}
                  </KTableRow>
                ))
            : stableSort(data, getSorting(order, orderBy))
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage,
                )
                .reverse()
                .map((row: any, idx: number) => {
                  return (
                    <KTableRow key={idx}>
                      {headCells.map(({ id }, i: number) => {
                        return Array.isArray(row[id]) ? (
                          <KTableCell key={i}>
                            {row[id].map((user: any, i: number) =>
                              formatStrings(i, user),
                            )}
                          </KTableCell>
                        ) : id === 'options' && options ? (
                          <KTableCell key={i}>
                            <IconButton
                              id={String(row.id)}
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={handleClick}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={open}
                              onClose={handleClose}
                              PaperProps={{
                                style: {
                                  maxHeight: ITEM_HEIGHT * 4.5,
                                  width: 100,
                                },
                              }}
                            >
                              {options.view && (
                                <Link
                                  to={options.view + anchorEl?.id}
                                  style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                  }}
                                >
                                  <MenuItem
                                    onClick={event =>
                                      handleClose(event, anchorEl?.id)
                                    }
                                  >
                                    View
                                  </MenuItem>
                                </Link>
                              )}
                              <Link
                                to={options.edit + anchorEl?.id}
                                style={{
                                  textDecoration: 'none',
                                  color: 'black',
                                }}
                              >
                                <MenuItem
                                  button={true}
                                  onClick={event =>
                                    handleClose(event, anchorEl?.id)
                                  }
                                >
                                  Edit
                                </MenuItem>
                              </Link>

                              <MenuItem
                                onClick={event => {
                                  options.delete(
                                    Number(anchorEl?.id),
                                  );
                                  handleClose(event, anchorEl?.id);
                                }}
                              >
                                Delete
                              </MenuItem>
                            </Menu>
                          </KTableCell>
                        ) : (
                          <KTableCell key={i}>
                            {row[id] === undefined || row[id] === null
                              ? ' '
                              : row[id].toString()}
                          </KTableCell>
                        );
                      })}
                    </KTableRow>
                  );
                })}
        </KTableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </KTableContainer>
  );
};

export default KTable;
