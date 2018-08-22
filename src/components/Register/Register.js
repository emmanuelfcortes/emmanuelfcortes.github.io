import React from 'react';

class Register extends React.Component{
 	constructor(props){
 		super(props);
 		//this.onChangeRoute=this.props.onChangeRoute.bind(this);
 		this.state={
			name:'',
			email:'',
			password:'',
			existuser:''
		}
	}
	
	onNameChange = (event) => {
		
		this.setState({name:event.target.value});
	}
	onEmailChange = (event) => {
		
		this.setState({email:event.target.value});

	}
	onPasswordChange = (event) => {
		this.setState({password:event.target.value});
	}
 	//{onClickSign, onClickRegister}// tem que passar essas functions como propriedades;
 	

///////////////////////////**************VERSÃO ANTIGA************//////////////////////
 	/*onClickRegisterInterno = (event) => {
 		this.props.onRegister(this.state.name, this.state.email, this.state.password);	
 	}*/
 ////////////////////////*****************//////////////////////////////////////////////

	onClickRegisterInterno = (event) => {
	 		  
	        if(this.state.name==='' || this.state.email==='' || this.state.password==='')
	        {
		          	console.log("Empty field.");
		          	this.setState(()=>{
			                    	return { existuser:
			                    		<div>
			                    			<p>Preencha os campos!!!</p>
			                    		</div>
			                    	}
			                    });
		          	
		          	
	        }
	        else{
	        	
	        	
	        	 	const newuser={user:this.state.name, email:this.state.email, password:this.state.password};
			        const myRequest = new Request(
			                                'https://mighty-lowlands-42943.herokuapp.com/register',{
			                                  method:'POST', headers:{'Content-Type':'application/json'}, 
			                                  body:JSON.stringify(newuser)
			                                }
			                              );
			        fetch(myRequest).then(response => response.json())
			        .then(response2 => {
			              if(response2.indexOf('Sucess')!==-1) {
			                    
			                    console.log("Registrou!!!!!!!");
			                    this.props.ChangeUser(this.state.name);
			                    this.props.onChangeRoute('inside');  
			              }
			              else if(response2.indexOf('Email')!==-1){
			                    const print="Email";
			                    console.log(print + " already exists! No Bonus!!!!!!");
			                    this.setState(()=>{return {existuser:<div><p>{print} ja existe!!!! Escolha outro {print}!!!</p></div>}});
			                    this.props.onChangeRoute('register');
			              }
			              else if(response2.indexOf('Name')!==-1){
			                    const print="Name";
			                    console.log(print + " already exists! No Bonus!!!!!!");
			                    this.setState(()=>{
			                    	return { existuser:
			                    		<div>
			                    			<p>{print} ja existe!!!! Escolha outro {print}!!!</p>
			                    		</div>
			                    	}
			                    });
			                    this.props.onChangeRoute('register');
			              }
			              
			        }).catch(err => console.log("Erro!!!!", err));
			}
	        
	}	
 	


 	render(){
 		return(
		 			<main className="pa4 black-80 ">
					  <div className="measure center">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
						    <legend className="f4 fw6 ph0 mh0">Register</legend>
						    <div className="mt3">
						     	<label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
						        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="Name"  id="Name" />
						    </div>
						    <div className="mt3">
						     	<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
						        <input onChange={this.onEmailChange}className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
						    </div>
						    <div className="mv3">
						        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
						        <input onChange={this.onPasswordChange}className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
						    </div>
						    
						    <div className="">
						      	<button onClick={this.onClickRegisterInterno}  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">Register</button>
						      	{this.state.existuser}
						      	<input onClick={this.props.onClickSignout} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Back" />
						    </div>
						    
					    </fieldset>
					  </div>
					</main>
		)			
 	}
}
export default Register;
 				