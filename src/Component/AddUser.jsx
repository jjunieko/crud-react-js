import { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useHistory , withRouter} from "react-router-dom";
import Api from "../Service/Api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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


  const AddUser = (props) => {
    const [user, setUser] = useState(initialValue);
    // eslint-disable-next-line
    const { first_name, last_name, register_on } = user;
    const classes = useStyles();
    let history = useHistory();
  
    const onValueChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    const addUserDetails = async () => {
      await Api.post(`users`, user).then((res) => {
        if (res.status === 201) {
          history.push("/");
          toast.success("User Created Successfully")
        }
      });
    };
  
    return (
      <>
        <FormGroup className={classes.container}>
          <Typography variant="h4">Add User Details</Typography>
          <FormControl>
            <InputLabel htmlFor="my-input">First Name</InputLabel>
            <Input
              onChange={(e) => onValueChange(e)}
              name="first_name"
              value={user.first_name}
              id="my-input"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Last name</InputLabel>
            <Input
              onChange={(e) => onValueChange(e)}
              name="last_name"
              value={user.last_name}
              id="my-input"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">register</InputLabel>
            <Input
              onChange={(e) => onValueChange(e)}
              name="register_on"
              value={user.register_on}
              id="my-input"
            />
          </FormControl>
          <FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addUserDetails()}
            >
              Submit
            </Button>
          </FormControl>
        </FormGroup>
      </>
    );
  };
  
  export default withRouter(AddUser);