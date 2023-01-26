import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  makeStyles,
  Tooltip,
  IconButton,
  TableContainer,
  Paper,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Api from "../Service/Api";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const useStyles = makeStyles({
  root: {
    margin: "50px"
  }
});

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    await Api.get("users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteUser = (id) => {
    Api.delete(`users/${id}`)
      .then((res) => {
        toast.success("User Deleted Successfully")
        getAllUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" component={Link} to="/add" style={{ marginBottom: "10px" }}>
        Add New User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Register</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell align="right">{user.first_name}</TableCell>
                  <TableCell align="right">{user.last_name}</TableCell>
                  <TableCell align="right">{user.register_on}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton>
                        <FaPen
                          onClick={() => {
                            history.push(`/edit/${user.id}`);
                          }}
                          size={20}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton >
                        <FaTrashAlt
                          onClick={() => DeleteUser(user.id)}
                          size={20}
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllUsers;