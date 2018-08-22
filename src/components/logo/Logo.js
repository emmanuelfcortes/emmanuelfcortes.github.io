import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';

const Logo = () => {
	const imgurl='https://thumbs.dreamstime.com/z/sinapse-19760650.jpg';
	return(

		<div className='ma4 mt0'> 
			<Tilt className="Tilt br2 shadow-2" options={{ max : 90, reverse: true,  }} style={{ height: 150, width: 200 }} >
	 			<div className="Tilt-inner pa3"> 
	 				<img style={{paddingTop: '1px'}} src={imgurl} alt='Logo'></img>
	 			</div>
			</Tilt>
			
		</div>
	);

}

/*****************************
 
<Tilt className="Tilt" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
 <div className="Tilt-inner"> 👽 </div>
</Tilt>
******************************/
export default Logo;