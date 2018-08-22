import React from 'react';
//import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation.js';//não precisa colocar o .js
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register';

// Require the client
//===========>>>>
//===========>>>>import Clarifai from 'clarifai' //==================>>>>>> CLARIFAI;

// initialize with your api key. This will also work in your browser via http://browserify.org/

//===========>>>>const app = new Clarifai.App({ //==================>>>>>> CLARIFAI
//===========>>>> apiKey: 'eb111d6da5ac4193857b3f0c9fa76aec' // its my count key  in Clarifai: www.clarifai.com });//==================>>>>>> CLARIFAI



const particles_param=
{   particles: {
     number:{
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
     } 
     
      }
}


class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      input:"inputText",
      imageurl:'',
      box:{},
      inside:'outside',
      user_rank:0,
      user:''
    }
    
  }


   
   changeCoordinates = (img, boxer) => {
        console.log('Entrou no changeCoordinates');
       if(boxer[0].left_col<1)
        console.log('Original Coordinates: ', boxer);

        for(let i=0 ; i<boxer.length; i++)
        {
          console.log('changeCoordinates - for: original ',boxer[i]);
          boxer[i].height= (boxer[i].bottom_row - boxer[i].top_row) * img.height;
          boxer[i].width= (boxer[i].right_col - boxer[i].left_col) * img.width;
          boxer[i].left_col = boxer[i].left_col * img.width;
          boxer[i].top_row = boxer[i].top_row * img.height;
          boxer[i].right_col = img.width - (boxer[i].right_col * img.width);
          boxer[i].bottom_row = img.height - (boxer[i].bottom_row * img.height);
          console.log('changeCoordinates - for: changed',boxer[i]);
        }  
        console.log("Changed Coordinates", boxer);
        this.setState({box: boxer});
        
   } 

   AddEntries=() =>{
      this.setState((prevstate)=>{
        console.log('In the AddEntries - prevstate=',prevstate.user_rank);
        return {user_rank:Number(prevstate.user_rank)+1}
       
      });
     
      const newuser={user:this.state.user, entries:this.state.user_rank};
      const myRequest = new Request(
                                      'https://mighty-lowlands-42943.herokuapp.com/entries',{
                                        method:'PUT', headers:{'Content-Type':'application/json'}, 
                                        body:JSON.stringify(newuser)
                                      }
                                    );
              fetch(myRequest).then(response => response.json())
              .then(response2 => {
                    if(response2.indexOf('Sucess')!==-1) {
                          
                          console.log("Atualizou o Entries!!!!!!!");
                           
                    }
                    
                    
              }).catch(error => {console.log("Error in updating Entries.", error)});

   }

   transformCoordinates=(response) => { 
      console.log('Entrou no transform_coordinates');
      console.log('CLARIFAI RESPONSE:', response);
      console.log('Box_original: ',this.state.box);
      console.log('data: ',response.outputs[0].data);
      const image=document.getElementById('img1');
      console.log('Image height: ', image.height);
      console.log('Image width: ', image.width);

      if(response.outputs[0].data.regions===undefined)
         console.log("NOOOOOOOO FACES DETECTETED. AAAAAHAHAHAHHAH");
      else{
            console.log('Face(s) detected! Faces Quantity: ', response.outputs[0].data.regions.length);
            let aux_box = [];
            for(let i=0; i< response.outputs[0].data.regions.length; i++)
             { console.log('Response:',response);
                console.log('Faces coordinates', response.outputs[0].data.regions[i].region_info.bounding_box);// show the box coordinates
                aux_box[i]= response.outputs[0].data.regions[i].region_info.bounding_box; 

            }
            
         this.changeCoordinates(image, aux_box);  
      }
      
      

    }
    ChangeRank=(rank) =>{
      this.setState({user_rank: rank});
    }
    ChangeUser=(user) =>{
      this.setState({user: user});
    }

  onEnter=(event)=>{
        if(event.key==='Enter') this.ontoClick(event);
  }

  onKey=(event)=>{
    
      this.setState({input:event.target.value});
  }

  ontoClick=(event)=>{
    
    this.setState( ()=> { return{ imageurl: this.state.input }});
    console.log("this.state.imageurl",this.state.imageurl);
    console.log("this.state.input", this.state.input);
    //app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)//==================>>>>>> CLARIFAI
    const myRequest = new Request(
                                    'https://mighty-lowlands-42943.herokuapp.com/image',{
                                      method:'POST', headers:{'Content-Type':'application/json'}, 
                                      body:JSON.stringify({url:this.state.input})
                                    }
                                  );
    fetch(myRequest).then(resp => resp.json())
    .then(response => {
      this.transformCoordinates(response)
      this.AddEntries();
    })
    .catch(error=> console.log('An Error!' ,error)); 
     
  }

  CleanSession =() =>{
    
    //Implementation - 1   
    /*this.setState({
      input:"inputText",
      imageurl:'',
      box:{},
      inside:'outside',
      user_rank:0,
      user:''
    })*/

    //Implementation - 2
    const initialState={
      input:"inputText",
      imageurl:'',
      box:{},
      inside:'outside',
      user_rank:0,
      user:''
    };
    this.setState(initialState);
  }

  onChangeRoute=(str)=>{
    
    this.setState(() => { return {inside: str} });// status pode ser inside, outside ou register
  }


  onClickRegister=(event)=>{
    console.log('Entrou no onClickRegister.');
    this.setState({inside: 'register'});
  }
  onClickSignout=(event) =>{
    console.log('Entrou no onClickSignout.');
    this.CleanSession();
    //this.setState({inside: 'outside'});
  } 
        
 
  render() 
  {
    return (
         
      <div className="App">
         
         <Particles className="particles"params={particles_param} />
        
         { this.state.inside==='inside'?
            <div>
                <Navigation onClickSignout={this.onClickSignout} inside={this.state.inside}/>
                <Logo />
                <Rank user={this.state.user} rank={this.state.user_rank}/>
                <ImageLinkForm onInputChange={this.onKey} onInputClick={this.ontoClick} onEnter={this.onEnter} />
                <FaceRecognition  url={this.state.imageurl} box={this.state.box} input={this.state.input}  />
              </div> :
              this.state.inside==='register'?

                <div>
                  <Navigation onClickSignout={this.onClickSignout} inside={this.state.inside}/>
                  <Register onClickSignout={this.onClickSignout} onChangeRoute={this.onChangeRoute} ChangeUser={this.ChangeUser} /> 
                </div> :
                <div>
                  <Navigation onClickSignout={this.onClickSignout} inside={this.state.inside} onClickRegister={this.onClickRegister}/>
                  <Signin onChangeRoute={this.onChangeRoute} ChangeUser={this.ChangeUser} ChangeRank={this.ChangeRank} /> 
                </div>                    
        }
         
      </div>
    );
  }
}

export default App;
