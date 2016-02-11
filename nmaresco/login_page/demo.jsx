var Demo = React.createClass({
  getInitialState: function(){
                            // note that this is a dynamic class
    return {usrnm: "", pswrd: "", data: [], status: "", status_color: "red"};
  },
  componentDidMount: function(){
    this.loadLoginFromServer();
    //introduces that we will need a pollInterval for the external element
    setInterval(this.loadLoginFromServer,2000);
  },
  handleUserNameChange: function(e){
    //alert("username change works!");
    this.setState({usrnm: e.target.value});
    //alert(this.state.usrnm);
  },
  handlePasswordChange: function(e){
  //  alert("password change works!");
    this.setState({pswrd: e.target.value});
  },
  // gets the login json from the server
  loadLoginFromServer: function(){
  // This would be used for client side login validation which is NOT how it should be done
  /*  $.ajax({
      url: "/login",
      data: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this)
    });*/
  },
  submit: function(e){
    e.preventDefault();
    // load in the inputs from the submit
    usr = this.state.usrnm;
    psw = this.state.pswrd;

    // Quit if either of the fields are empty
    if(usr == "" || psw == ""){
      return;
    }

    // Structure your post request with a json file
    var to_post = { "usrnm": usr , "pswrd": psw};
    // Do an asyncronous post in order to validate whether or not the user exists
    $.ajax({
      url: "/login",
      dataType: 'json',
      type: 'POST',
      data: to_post,
      // 'data' is the response from the server
      success: function(data) {
          if(data == "true"){
            this.setState({status: "Success!"});
            this.setState({status_color: "rgb(14, 159, 32)"});
          }
          else{
            this.setState({status: "You are a failure!"});
            this.setState({status_color: "red"});
          }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  /*  // load the sign in info json into obj
      // THIS CODE IS FOR CLIENT-SIDE AUTHENTICATION -- not in use
    var obj = this.state.data;
    var iith_user = 0;
    var this_acc = obj.account[iith_user];

    // if the username matches the password
    if(this_acc.username == usr && this_acc.password == psw){
      this.setState({status: "Success!"});
      this.setState({status_color: "rgb(23, 227, 49)"});
    }
    else{
      this.setState({status: "You are a failure!"});
      this.setState({status_color: "red"});
    } */

    // Reset the input fields after the user submits
    document.getElementsByName("username")[0].value = "";
    document.getElementsByName("password")[0].value = "";

  },
  render: function (){
    return (
    <div id="login-container">
      <h3>Welcome, Please login.</h3>
      <form onSubmit={this.submit}>
        <div className="input-container-text">
          <h3 style={{color: this.state.status_color}}>{this.state.status}</h3>
          <input onChange={this.handleUserNameChange} type="text" name="username" placeholder="Username:"/><br/>
          <input onChange={this.handlePasswordChange} type="text" name="password" placeholder="Password:"/>
        </div><br/>
        <div class="input-container-text">
          <input type="submit" value="Submit"/>
        </div>
      </form>
    </div>
    );
  }
});

var demo = React.createElement(Demo);
React.render(demo, document.body);


// Frontend
/*
  html
  react.js
  css
  jquery
  ajax
*/

// Backend
/*
  node.js
  express.js
*/
