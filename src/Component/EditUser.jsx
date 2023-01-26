import { useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import Api from "../Service/Api";
import { toast } from 'react-toastify';

const initialValue = {
    first_name: "",
    last_name: "",
    register_on: "",
    id: "",
};

const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%",
    "& > *": {
      marginTop: 20,
    },
  },
});

const EditUser = () => {
  const classes = useStyles();
  const [user, setUser] = useState(initialValue);
  const { first_name, last_name, register_on } = user;
  const { id, name1 } = useParams();
  console.log(name1);
  let history = useHistory();

  useEffect(() => {
    loadUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUserDetails = async () => {
    Api.get(`users/${id}`).then((res) => {
      setUser(res.data);
    });
  };

  const editUserDetails = async () => {
    Api.put(`users/${id}`, user).then((res) => {
      if (res.status === 200) {
        history.push("/");
        toast.success("User Updated Successfully")
      }
    });
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <FormGroup className={classes.container}>
      <Typography variant="h4">Edit User Details</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">first_name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="first_name"
          value={first_name}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">last Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="last_name"
          value={last_name}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Register</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="register_on"
          value={register_on}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => editUserDetails()}
        >
          Submit
        </Button>
      </FormControl>
    </FormGroup>
  );
};

export default EditUser;
