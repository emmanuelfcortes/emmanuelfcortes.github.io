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

import Clarifai from 'clarifai';

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: 'eb111d6da5ac4193857b3f0c9fa76aec' // its my count key  in Clarifai: www.clarifai.com
});

// particles_param to backend effect.
const particles_param=
{   particles: {
     number:{
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
     } 
     /* density: {
        enable: true,
        value_area: 800
      }*/
     /* line_linked: {
       shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
       }*/
      }
}



class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      input:"inputText",
      imageurl:'',
      box:{},
      inside:'outside'
    }
    //this.transformCoordinates = this.transformCoordinates.bind(this);
  }


  // function that is send like a parameter in onInputChange call.
  //onInputChange is a ImageLinkForm parameter. 
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
        


        
        /*boxer[0].height= (boxer[0].bottom_row - boxer[0].top_row) * img.height;
        boxer[0].width= (boxer[0].right_col - boxer[0].left_col) * img.width;
        boxer[0].left_col = boxer[0].left_col * img.width;
        boxer[0].top_row = boxer[0].top_row * img.height;
        boxer[0].right_col = img.width - (boxer[0].right_col * img.width);
        boxer[0].bottom_row = img.height - (boxer[0].bottom_row * img.height);*/

        console.log("Changed Coordinates", boxer);
        this.setState({box: boxer});
        /*console.log("changeCoordinates this.state.box: ", this.state.box);*/
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

  onEnter=(event)=>{
    //console.log('keyCode: ',event.key);
    if(event.key==='Enter') this.ontoClick(event);
  }

  onKey=(event)=>{
      /*console.log('value:', event.target.value); codigo para teste*/

      this.setState({input:event.target.value});
  }

/*componentDidMount = () => {
      // pegando o tamanho da div em que esta a imagem
      const imgdiv= document.getElementById('img1');
      console.log('Altura da imagem: ', imgdiv.height);
      console.log('Largura da imagem: ', imgdiv.width);
     }*/
  ontoClick=(event)=>{
    /*console.log('Click'); codigo para teste*/
    
    //this.setState({count: ++this.state.count});
    this.setState({imageurl: this.state.input});
    console.log("this.state.imageurl",this.state.imageurl);
    console.log("this.state.input", this.state.input);
    // API CLARIFAI TO DETECT FACES
    //app.models.predict("eeed0b6733a644cea07cf4c60f87ebb7", this.state.input).then( ////////  this ID "eeed0b6733a644cea07cf4c60f87ebb7" have relationship with Clarifai.COLOR_MODEL
    //NOW, we gonna put only the name of the model, and no more the ID. 
    //See the models in  https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
   

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.transformCoordinates(response))
    .catch(error=> console.log('An Error!' ,error)); 
     
  }

 /* onClickSign=(email, pass)=>{
    console.log('Entrou no onClickSign. email: '+email+' password: '+pass);

////////*********************REQUISIÇÃO DO SERVIDOR************************************************
      const myRequest = new Request(
                              'http://localhost:3000/signin',{
                                method:'POST', headers:{'Content-Type':'application/json'}, 
                                body:JSON.stringify({user:email, password:pass})
                              }
                            );
      fetch(myRequest).then(response => response.json())
      .then(response2 => {
            if(response2.indexOf('Sucess')!==-1)
            {
                  console.log("Logou!!!!!!!")  
                  this.setState({inside:'inside'});
            }
            else{
                  console.log("Não encontrou usuário e senha! Wrong")
                  this.setState({inside:'outside'});
            }
      })
    }*/
      
      
      /* 
      **********OUTRA MANEIRA DE CHAMAR A FUNÇÃO fetch(), construindo a requisição diretamente na função************

        fetch('http://localhost:3000/signin', { 
        method: 'post',
        headers:{'Content-Type':'application/json'}, 
        body:JSON.stringify({user:'john', password:'john123'})
      })
      .then(response => response.json())
      .then(console.log)*/
      //fetch("http://localhost:3000/signin").then(response => response.json()).then(console.log)// igual a .then(data=>console.log(data))
    
/*  onRegister=(name,email,password)=>{
        if(name==="" || email==="" || password==="")
        {
          console.log("Empty field.");
          return false;
        }
        const newuser={user:name, email:email, password:password};
        console.log('Entrou no Register: ', newuser);
        const myRequest = new Request(
                                'http://localhost:3000/register',{
                                  method:'POST', headers:{'Content-Type':'application/json'}, 
                                  body:JSON.stringify(newuser)
                                }
                              );
        fetch(myRequest).then(response => response.json())
        .then(response2 => {
              if(response2.indexOf('Sucess')!==-1)
              {
                    this.setState({inside: 'register'});
                    console.log("Registrou!!!!!!!") 
                    return true; 
                    
              }
              else{
                    this.setState({inside:'register'});
                    console.log("User already exists! No Bonus!!!!!!")
                    return false;
                    
              }
              
        })
  }*/
  ChangeRoute=(status)=>{
    console.log('Entrou no changeRoute');
    this.setState({inside: status});// status pode ser inside, outside ou register
    console.log("ChangeRoute Inside="+this.state.inside);
  }

  onClickRegister=(event)=>{
    console.log('Entrou no onClickRegister.');
    this.setState({inside: 'register'});
  }
  onClickSignout=(event) =>{
    console.log('Entrou no onClickSignout.');
    this.setState({inside: 'outside'});
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
                <Rank />
                <ImageLinkForm onInputChange={this.onKey} onInputClick={this.ontoClick} onEnter={this.onEnter} />
                <FaceRecognition  url={this.state.imageurl} box={this.state.box} input={this.state.input}  />
              </div> :
              this.state.inside==='register'?

                <div>
                  <Navigation onClickSignout={this.onClickSignout} inside={this.state.inside}/>
                  <Register onClickSignout={this.onClickSignout} ChangeRoute={this.ChangeRoute} /> 
                </div> :
                <div>
                  <Navigation onClickSignout={this.onClickSignout} inside={this.state.inside} onClickRegister={this.onClickRegister}/>
                  <Signin ChangeRoute={this.ChangeRoute} /> 
                </div>                    
        }
         
      </div>
    );
  }
}

export default App;
