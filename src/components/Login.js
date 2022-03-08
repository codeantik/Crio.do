import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";

/**
 * @class Login component handles the Login page UI and functionality
 *
 * Contains the following fields
 *
 * @property {boolean} state.loading
 *    Indicates background action pending completion. When true, further UI actions might be blocked
 * @property {string}
 *    state.username User given field for username
 * @property {string}
 *    state.password User given field for password
 */
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      username: "",
      password: "",
    };
  }

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the API call over the network and return the response
   *
   * @returns {{ success: boolean, token: string, username: string, balance: number }|undefined}
   *    The response JSON object
   *
   * -    Set the loading state variable to true
   * -    Perform the API call via a fetch call: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
   *      - The call must be made asynchronously using Promises or async/await
   *      - The call must handle any errors thrown from the fetch call
   *      - Parse the result as JSON
   * -    Set the loading state variable to false once the call has completed
   * -    Call the validateResponse(errored, response) function defined previously
   * -    If response passes validation, return the response object
   *
   * Example for successful response from backend:
   * HTTP 200
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   */
  performAPICall = async () => {
  let response;
   let errorcaught = false;
   this.setState({loading : true});
   let endpoint = `${config.endpoint}/api/v1/auth/login`;
   let conf ={
     method :"Post",
     header: {
       "content-type":"application/json",
     },
     body: JSON.stringify({
       username: this.state.username,
       password: this.state.password
     })
   }
   try {
    response = await(await fetch (endpoint,conf)).json();
   }
   catch(error){
     errorcaught=true;
   }
   this.setState({loading:false});
   if(this.validateResponse(errorcaught,response)){
     return response;
   }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * -    Check that username field is not an empty value
   * -    Check that password field is not an empty value
   */
  validateInput = () => {
    if(!this.state.username){
      message.error("Invalid input: username not provided");
      return false;
    }
    if(!this.state.password){
      message.error("Invalid input: password is not provided");
      return false;
    }
    return true; 

  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Check the API response
  /**
   * Check the response of the API call to be valid and handle any failures along the way
   *
   * @param {boolean} errored
   *    Represents whether an error occurred in the process of making the API call itself
   * @param {{ success: boolean, message?: string, token?: string, username?: string }} response
   *    The response JSON object from API call which may contain further success or error messages
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * If the API call itself encounters an error, errored flag will be true.
   * If the backend returns an error, then success field will be false and message field will have a string with error details to be displayed.
   * When there is an error in the API call itself, display a generic error message and return false.
   * When there is an error returned by backend, display the given message field and return false.
   * When there is no error and API call is successful, return true.
   */
  validateResponse = (errored,response) => {
   if(errored || (!message.success && response.message))
   {
     message.error("Registration failed");
     return false;
   }
   if(!response.success){
     message.error(response.message);
     return false;
   }
   return true;
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  persistLogin = (token, username, balance) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username",username);
    localStorage.setItem("balance",balance);
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Implement the login function
  /**
   * Definition for login handler
   * This is the function that is called when the user clicks on the login button or submits the login form
   * -    Call the previously defined validateInput() function and check that is returns true, i.e. the input values pass validation
   * -    Call the previously defined performAPICall() function asynchronously and capture the returned value in a variable
   * -    If the returned value exists,
   *      -   Call the previously defined persistLogin(token, username, balance) function
   *      -   Clear the input fields
   *      -   Display a success message
   *      -   Redirect the user to the "/products" page
   */

  login = async () => {
    let response;
     if(this.validateInput()){
      response= this.performAPICall(); // removed unnecessary await
     }
     if(response){
       this.persistLogin(response.token,response.username,response.balance);
       this.setState({username: "",password: " ",confirmpassword: " "});
       message.success("Successful Login");
       this.props.history.push("/products");
     }
  };

  /**
   * JSX and HTML goes here
   * We have a text field and a password field (each with data binding to state), and a submit button that calls login()
   */
  render() {
    return (
      <>
        {/* Display Header */}
        <Header history={this.props.history} />

        {/* Display Login fields */}
        <div className="flex-container">
          <div className="login-container container">
            <h1>Login to QKart</h1>

            <Input
              className="input-field"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={(e) => {
                this.setState({
                  username: e.target.value,
                });
              }}
            />

            <Input.Password
              className="input-field"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                });
              }}
            />

            <Button
              loading={this.state.loading}
              type="primary"
              onClick={this.login}
            >
              Login
            </Button>
          </div>
        </div>

        {/* Display the footer */}
        <Footer></Footer>
      </>
    );
  }
}

export default withRouter(Login);