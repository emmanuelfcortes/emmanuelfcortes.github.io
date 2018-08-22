import React from 'react';

const Register = ({onClickSignout}) =>  {
 					
 	return(
		 			<main className="pa4 black-80 ">
					  <form className="measure center">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
						    <legend className="f4 fw6 ph0 mh0">Register</legend>
						    <div className="mt3">
						     	<label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
						        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="Name"  id="Name" />
						    </div>
						    <div className="mt3">
						     	<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
						        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
						    </div>
						    <div className="mv3">
						        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
						        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
						    </div>
						    
						    <div className="">
						      	<input type="submit" value="Register" className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" />
						      	<input onClick={onClickSignout} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Back" />
						    </div>
						    
					    </fieldset>
					  </form>
					</main>


 	);
}
export default Register;
 				