import React from 'react';

class Signin extends React.Component{
	constructor(props){
		super(props);
		//this.onChangeRoute=this.props.onChangeRoute.bind(this);
		this.state={
			email:'',
			password:'',
			signinfail:''
		}
	}
	
	onEmailChange = (event) => {
		
		this.setState({email:event.target.value});
		

	}
	onPasswordChange = (event) => {
		this.setState({password:event.target.value});
		
	}
 	//{onClickSign, onClickRegister}// tem que passar essas functions como propriedades;
 	/////////////////////////////////////*****ANTIGO******/////////////////////////////////////////////
 	/*onClickSignin = (event) => {
 		this.props.onClickSign(this.state.email, this.state.password);

 	} */
 	/////////////////////////////////////*********////////////////////////////////////////////////////
 	


			 	onClickSign=(event)=>{
			    	console.log('Entrou no onClickSign. email: '+this.state.email+' password: '+this.state.password);

			////////*********************REQUISIÇÃO DO SERVIDOR*************************************************\/////////
			      	const myRequest = new Request(
			                              'https://mighty-lowlands-42943.herokuapp.com/signin',{
			                                method:'POST', headers:{'Content-Type':'application/json'}, 
			                                body:JSON.stringify({user:this.state.email, password:this.state.password})
			                              }
			                            );
			      	fetch(myRequest).then(response => response.json())
			      	.then(response2 => { //response2 its a array
			            
			            //if(response2.indexOf('Sucess')!==-1) {

						if(response2[0].id!==undefined) {
			                  console.log("Logou!!!!!!!");
			                  this.props.ChangeUser(response2[0].name);
			                  this.props.ChangeRank(response2[0].entries);  
			                  this.props.onChangeRoute('inside');
			            }
			            else{
			                  console.log("Não encontrou usuário e senha! Wrong");
			                  this.setState(()=>{
			                  	return {signinfail:<div><p>LOGIN FAIL. USER OR PASSWORD WRONG.</p></div>}
			                  });
			                  this.props.onChangeRoute('outside');

			            }
			      	})
			      	.catch(er=>{
			      		console.log('Deu erro!!!!', er);
			      	})
			    }

    onClickRegister=(event) =>{
    	console.log('Entrou no onClickRegister do Signin.js');
    	this.props.onChangeRoute('register');
    }

 	render(){	
 		return(
			<main className="pa4 black-80 ">
			  <div className="measure center">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
				    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
				    <div className="mt3">
				     	<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" name="email-address"  id="email-address" />
				    </div>
				    <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
				    </div>
				    
				    <div className="">
				      	<input onClick={this.onClickSign} 
					      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      	type="submit" 
					      	value="Sign in" 
					    />
				    </div>
				    <div className="lh-copy mt3">
				    	<a onClick={this.onClickRegister} href="#0" className="f6 link dim black db">Register</a>
				    </div>
				    {this.state.signinfail}
			    </fieldset>
			  </div>
			</main>
		);
	}	
}

export default Signin;