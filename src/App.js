import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
     constructor(props){
       super(props);
       this.state={
         error:null,
           city:'DELHI',
         wheather: {},
         isLoaded:false,
         isToggle: true,
         cod:200

      }
     }

     componentDidMount(){
        this.fetchData();
     }

     changeHandler=(event)=>{
       this.setState({city: event.target.value})
     }

     onSubmit=(event)=>{
       event.preventDefault();
      this.fetchData()
      document.getElementById("value1").reset();
     }


     fetchData = () =>
     {
         fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=f09785c8f0fa708ea14a2352af994227`)
           .then(res=>res.json())
           .then(
              (result)=> {
                 console.log("this.state.istoggle",this.state.isToggle);
                 if(this.state.isToggle)
                 {
                    const modify={...result};
                    if(modify.cod===200)
                    {
                  this.setState({ wheather: result, isLoaded:true })
                    }
                 }
                 else{
                   const modifiedWeather =  {...result};
                    modifiedWeather.main.temp_min =45*( modifiedWeather.main.temp_min -32)/9; 
                    modifiedWeather.main.temp_max =45*( modifiedWeather.main.temp_max -32)/9; 
                    this.setState({
                      wheather: modifiedWeather,
                      isLoaded:true
                    })
                 }
     
              },
              (error)=>{
                this.setState({
                 isLoaded:false,
                  error
                })
              }   
           )
     }

    changeToggle=(event)=>{
      event.preventDefault();
      this.setState({isToggle: !this.state.isToggle})
    }

    render(){
           const {error,wheather,isLoaded}=this.state;

             if(!isLoaded)
            {
              return(
              <div>{error}</div>
              )
            }
            else{
            
             return(

              <div>
                <div>
                   <form onSubmit={this.onSubmit} id="value1">
                        <input type="text" required="required" onChange={this.changeHandler} placeholder="CITY NAME"/>
                        <button value="submit">SUBMIT</button>
                   </form>
                 </div>  
                 <label className="switch">
                  <input type="checkbox" checked={this.state.isToggle} onChange={(event)=>{this.setState({
                    isToggle: event.target.checked
                  })}}/>
                  <span className="slider round"></span>
                </label>
             <form onSubmit={this.changeTemperature}>
               <button value="SUBMIT" onSubmit={this.changeToggle}>CHANGE TEMPERATURE UNITS</button>
             </form>

             <ul>
                 <li className="list2">CITY NAME CHOOSEN BY YOU ::{this.state.city}</li>
          {  /*    const temp={this.state.isToggle}      */}
                   <hr/><hr/>
                   <li className="list2">COUNTRY NAME IN WHICH THE COUNTRY IS LOCATED ::  {this.state.wheather.sys.country}</li> 
                  <li className="list2">TEMP IN MIN  :: {this.state.wheather.main.temp_min} FAHRENHEIT</li>
                  <li className="list2">TEMP IN MAX  ::  {this.state.wheather.main.temp_max} FAHRENHEIT</li>
                  <li className="list2">HUMIDITY VAL ::   {this.state.wheather.main.humidity} </li>    
             </ul>
            

            </div>      
             )

            }       
    }
}

export default App;


