import { ChangeEvent, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";

import { IUser, IUserUpdate } from "../../types/IUser";
import { IProfileColumn as IColumn } from "../../types/ITables";
import { tRight } from "../../types/ICredential";
import { useAppSelector } from "../../hooks/reduxHooks";
import { userUpdate } from "../../api/usersWorker";
import ProfileBodyModal from "./ProfileBodyModal";

const columns: IColumn[] = [
  {
    id: "id",
    label: "ID",
    minWidth: 20,
    format: (value: number) => value.toString(),
  },
  { id: "name", label: "name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
  },
  {
    id: "role",
    label: "Role",
    minWidth: 100,
  },
];

export default function ProfileBodyUsers(): JSX.Element {
  const rights: tRight = useAppSelector(function (state) {
    return state.credential.rights;
  });
  const users: IUser[] = useAppSelector(function (state) {
    return state.users.users;
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function handleReset(user: IUser) {
    const newPassword: string = Math.random().toString(36).substring(2, 9);
    const userSend: IUserUpdate = {
      id: user.id,
      password: newPassword,
    };

    try {
      userUpdate(userSend);
    } catch (error) {
      console.log(error);
    }

    window.open(
      `mailto:${user.email}?subject="E commerce website. New password"&body="New password: ${newPassword}"`
    );
  }

  return (
    <Paper sx={{ minWidth: 850 }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={6}>
                Users
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column: IColumn) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {rights.users.update && (
                <>
                  <TableCell style={{ top: 57, minWidth: 70 }}>
                    Update
                  </TableCell>
                  <TableCell style={{ top: 57, minWidth: 70 }}>
                    Reset password
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user: IUser) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    {columns.map((column: IColumn) => {
                      const value = user[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    {rights.users.update && (
                      <>
                        <TableCell placeholder="Update">
                          <ProfileBodyModal {...user} />
                        </TableCell>
                        <TableCell placeholder="Reset password">
                          <Button
                            onClick={(e) => {
                              handleReset(user);
                            }}
                          >
                            <LockResetIcon />
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
