import React from 'react';
import './FaceRecognition.css';
/*const imgdiv = document.getElementById('mother');*/
/*class FaceRecognition extends React.Component {
 		constructor(props){
 			super(props);
 			this.state ={url:''};


 			
 		}*/
const FaceRecognition = ({url, box, input}) =>  {
 				/*console.log('FaceRecognition URL OBject:', url);
 				console.log('FaceRecognition URL_url:', url.url);
 				console.log('FaceRecognition box', box);
 				console.log('FaceRecognition input', input);*/
 				let textbody='';
 				let i =0;
 				const divmother = React.createElement('div', {id: 'mother'+i, className:'mother'});
 				const img1= React.createElement('img', {id:'img1', className:'img1', src: url, alt:'try_image'});
 				let boxes=[];
 				for(i=0; i<box.length;i++){
 					boxes[i]=React.createElement('div', {id: 'abc'+i, className: 'abc', 
 								style:{left:box[i].left_col,right:box[i].right_col,top:box[i].top_row, bottom:box[i].bottom_row}  });
 					console.log('BOXES ['+i+']', boxes[i]);
 					
 				}
 				textbody= React.cloneElement(divmother,null,img1,boxes);
 				
 				/*console.log('textbody:',textbody);*/	
 				return textbody;
}
export default FaceRecognition;
 				

 				//NÃO FUNCIONOU ESSE CÓDIGO ABAIXO
 				/*let html_fixo = "<div id='mother' className='mother'>"+
 							"<img id='img1' className= 'img1' src={url.url} alt='try_image'></img>" +
 				 			"<div className='abc' style={{left:url.box.left_col,right:url.box.right_col,top:url.box.top_row, bottom:url.box.bottom_row}}></div>" +
							"</div>";							 				 			
				return html_fixo;*/				
 				/*return(

				<div id='mother' className='mother'>
        			<img id='img1' className= 'img1' src={url.url} alt='try_image'></img>

	        		{insertDiv()}
	        		<div className='abc' style={{left:url.box.left_col,right:url.box.right_col,top:url.box.top_row, bottom:url.box.bottom_row}}></div>	

				</div>
				);*/
 
/*height: box.height, width: box.width*/

