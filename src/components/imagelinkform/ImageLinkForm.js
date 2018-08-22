import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onInputClick, onEnter} ) => {
		return(

			
			
			<div>
			{/*<form onSubmit={onInputClick}>*/}
				<p>
					This Magic Brain will detect faces in pictures!!!!
				</p>
				<div className='center' >
					<div className='form center pa4 br3 shadow-5'>
						<input onChange={onInputChange} onKeyDown={onEnter} className='f4 pa2 w-70 center' type='text' placeholder='Insert the URL' />
						<button onClick={onInputClick}  className='w-30 grow f4 link ph3 pv2  dib white bg-light-purple' >Detect Faces</button>
						{/*<input type='submit' value="Detect Faces" className='w-30 grow f4 link ph3 pv2  dib white bg-light-purple' />*/}
					</div>

				</div>
			{/*</form>*/}
			</div>
			

		);	
}

export default ImageLinkForm;