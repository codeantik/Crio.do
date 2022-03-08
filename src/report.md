<!-- Debugged issues report -->

1.  ReactDOM.render(
    <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </React.StrictMode>, document.getElementById("root")
    );

The index.js did not have the getElementById to get the root element. So it was not able to render the App component.I added the getElementById to the index.js and it worked.

2.  validateInput = () => {
    if(!this.state.username){
    message.error("Invalid input: Username not provided");
    return false; // no return statement
    }
    if(!this.state.password){ // wrong usage of if statement
    message.error("Invalid input: Password not provided")
    return false;
    }
    if(this.state.username.length<6 || this.state.username.length>32 || this.state.password<6 || this.state.password>32){
    message.error("Invalid input: Username and Password length should be between 6 and 32");
    return false;
    }
    if(this.state.password !== this.state.confirmPassword){
    message.error("Invalid input: Confirm Password doesnot match");
    return false;
    }
    return true;
    };

The validateInput function in Register.js file contained logical and syntactical errors like some of the if statements were not written in the correct way, i.e. they did not contain the return statement. Fixed all these issues

3.  register = async () => {
    if (this.validateInput()){
    const response = this.performAPICall(); // removed unnecessary await
    if(response){
    this.setState({username:" ",password:" ",confirmPassword:" "});
    message.success("Successfully Registered User");
    this.props.history.push("/login");
    }
    }
    };

There was an unnecssary usage of await keyword in the register function in Register.js & login function in Login.js.
Removed the await keyword from the register function in Register.js & login function in Login.js.

4.  <Button
    loading={this.state.loading}
    type="primary"
    onClick={this.register}
    // added on click
    >

Absence of onClick property in the Button component in Register.js file. Insertd the onClick property in the Button component to call the register function.

5.

Added error & success messages in the backend routes.
