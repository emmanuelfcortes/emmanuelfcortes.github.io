import React from 'react';

const Navigation =({onClickSignout, onClickRegister, inside}) => {

	if(inside==='inside'){
		console.log("Navigation: inside=inside");
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}> 
				<p onClick={onClickSignout} className='f3 dim link  black underline pa3 pointer'>Sign Out </p> 
			</nav>
		)
	} else if(inside==='outside'){
		console.log("Navigation: inside=outside");
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}> 
				<p onClick={onClickSignout} className='f3 dim link  black underline pa3 pointer'>Sign In</p> 
				<p onClick={onClickRegister} className='f3 dim link  black underline pa3 pointer'>Register</p> 
			</nav>
		)
	} 

	else if(inside==='register'){
		console.log("Navigation: inside=register");
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}> 
				<p onClick={onClickSignout} className='f3 dim link  black underline pa3 pointer'>Sign In</p> 
				<p onClick={onClickRegister} className='f3 dim link  black underline pa3 pointer'>Register</p> 
			</nav>
		)
	} 


}

export default Navigation;