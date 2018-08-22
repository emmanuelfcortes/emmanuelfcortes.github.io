import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({url, box, input}) =>  {
 				
 				let i =0;
 				let boxes=[];
 				for(i=0; i<box.length;i++){
 					boxes.push(<div id={'abc'+i} className='abc' 
 								style={{left:box[i].left_col,right:box[i].right_col,top:box[i].top_row, bottom:box[i].bottom_row}}>
 								</div>) 
 				}
 					
 				return (
 						<div id='mother' className='mother'>
 							<img id='img1' className='img1' src={url} alt='try_image'></img>
 							{boxes}
 						</div>
 					) 
 				
}
export default FaceRecognition;

