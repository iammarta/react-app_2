import React, {Component} from 'react';
import './app.css'
import axios from 'axios';
import Posts from '../app-posts'
import Sidebar from '../app-sidebar'

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            categoryVal:[],
            categoryStyle: {
                animalStyle:false,
                careerStyle: false,
                celebrity:false,
                dev: false,
            },
            input: '',
            searchChuck:[],
            fav:[]
        };
        this.handleFav = this.handleFav.bind(this)
    }
    componentDidMount() {
        const localItem = JSON.parse(localStorage.getItem("favourite"));
        localItem ? this.setState({fav: localItem}) : localStorage.setItem("favourite", "[]");
    }

    handleFav(elem) {
        let newJokes = JSON.parse(localStorage.getItem("favourite"));
        newJokes.push(elem);
        localStorage.setItem("favourite", JSON.stringify(newJokes));
        let currentJokes = this.state.searchChuck;
        if (currentJokes.some(x => x.id === elem.id)) {
            currentJokes.map(x => {
                if (x.id === elem.id) {
                    x.favourite = true;
                    return x;
                } else {
                    x.favourite = false;
                    return x;
                }
            });
        }
        this.setState({fav: newJokes, currentJokes: currentJokes});
    }
   
    add(id) {
        this.state.fav.some(elem => elem.id === id)
    }
    handleButtonsChange(e){
        this.setState({value: e.target.value});
     }
     handleSearch(e){
        this.setState({input:  e.target.value});
     }
     handleCategoriesChange(e){
        this.setState({categoryVal: e.target.value});
        if(e.target.value === 'animal'){
        this.setState({
            categoryStyle:{
                animalStyle: !this.state.animalStyle
            }
          });
        }else if(e.target.value === 'career'){
            this.setState({
                categoryStyle:{
                    careerStyle: !this.state.careerStyle
                }
              });
            }
            else if(e.target.value === 'celebrity'){
                this.setState({
                    categoryStyle:{
                       celebrityStyle: !this.state.celebrityStyle
                    }
                  });
                }
                else if(e.target.value === 'dev'){
                    this.setState({
                        categoryStyle:{
                            devStyle: !this.state.devStyle
                        }
                      });
                    }
     }
     handleJoke(item, elem, search){
        if(item === '1'){
         axios.get('https://api.chucknorris.io/jokes/random')
         .then(response => {
            response.favourite = this.add(response.data.id);
           this.setState({searchChuck: [...this.state.searchChuck, response.data]});
       }).catch(error => {
         console.log(error);
       });
        }
        if(item === '2' && elem === 'animal'){
         axios.get('https://api.chucknorris.io/jokes/random?category=animal')
         .then(response => {
            response.favourite = this.add(response.data.id);
           this.setState({searchChuck: [...this.state.searchChuck, response.data], elem});
       }).catch(error => {
         console.log(error);
       });
        }
        if(item ==="2" && elem ==="career"){
         axios.get('https://api.chucknorris.io/jokes/random?category=career')
         .then(response => {
            response.favourite = this.add(response.data.id);
           this.setState({searchChuck: [...this.state.searchChuck, response.data]});
       }).catch(error => {
         console.log(error);
       });
          }
          if(item ==="2" && elem ==="celebrity"){
             axios.get('https://api.chucknorris.io/jokes/random?category=celebrity')
             .then(response => {
                response.favourite = this.add(response.data.id);
               this.setState({searchChuck: [...this.state.searchChuck, response.data]});
           }).catch(error => {
             console.log(error);
           });
              }
              if(item ==="2" && elem ==="dev"){
                 axios.get('https://api.chucknorris.io/jokes/random?category=dev')
                 .then(response => {
                    response.favourite = this.add(response.data.id);
                   this.setState({searchChuck: [...this.state.searchChuck, response.data]});
               }).catch(error => {
                 console.log(error);
               });
                  }
                  if(item === "3"){
                     axios.get('https://api.chucknorris.io/jokes/search?query='+search)
                     .then(response => {
                        response.favourite = this.add(response.data.id);
                       this.setState({searchChuck: response.data.result.map(el=>el)});
                   }).catch(error => {
                     console.log(error);
                   });
                  }
     }
     render() {
        return (
            <div className="container-fluid">
            <div className="row">
            <div className="col-xl">
            <h1>Hey!</h1>
            <h2>Let's find a joke for you: </h2>
            <div className="buttons-wrapper">
            <div className="radio-item d-flex">
            <input type="radio" id="random" name="btn" value={1} onChange={(e)=>this.handleButtonsChange(e)}/>
            <label htmlFor="random">Random</label>
            </div>
            <div className="radio-item d-flex">
            <input type="radio" id="categories" name="btn" value={2} onChange={(e)=>this.handleButtonsChange(e)}/>
            <label htmlFor="categories">For categories</label>
            </div>
            <div className = {this.state.value ==='2' ? 'categories-buttons-wrapper active': 'categories-buttons-wrapper'} onClick={(e) => this.handleCategoriesChange(e)}>
            <button type="button" className={this.state.categoryStyle.animalStyle ? 'btn btn-light active' : 'btn btn-light'} value="animal">Animal</button>
            <button type="button" className={this.state.categoryStyle.careerStyle ? 'btn btn-light active' : 'btn btn-light'} value="career">Career</button>
            <button type="button" className={this.state.categoryStyle.celebrityStyle ? 'btn btn-light active' : 'btn btn-light'} value="celebrity">Celebrity</button>
            <button type="button" className={this.state.categoryStyle.devStyle ? 'btn btn-light active' : 'btn btn-light'} value="dev">Dev</button>
            </div>
            <div className="radio-item d-flex">
            <input type="radio" id="search" name="btn" value={3} onChange={(e)=>this.handleButtonsChange(e)}/>
            <label htmlFor="search">Search</label>
            </div>
            <div className={this.state.value === '3' ? "search-wrapper active" : "search-wrapper" }>
            <input className="form-control" type="text" onChange={(e)=>this.handleSearch(e)}/>
            </div>
            </div>
            <>
            <button type="button" className="btn btn-primary btn-lg" onClick={()=>this.handleJoke(this.state.value, this.state.categoryVal, this.state.input)}>
                Get a joke
            </button>
         <Posts handleFav={this.handleFav} search={this.state.searchChuck} category={this.state.category}/>
            </>
                </div>
                <div className="col-xl sidebar-wrapper">
                <div className="sidebar-title-wrapper">
            <h3>Favourite</h3>
            <Sidebar item={this.state.fav}/>
            </div>
                </div>
                </div>
                </div>
        )
      }
    }
