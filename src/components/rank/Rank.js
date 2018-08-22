import React from 'react';
import './Rank.css';

const Rank = ({user,rank}) => {
	
		return(

			<div>
				<div className='white f3'>
					{user} 
				</div>
				<div className='white f3'>
					{', your current Rank is...'} 
				</div>
				<div className='white f1'>
					{rank}
				</div>
				
			</div>
			

		);	
}

export default Rank;