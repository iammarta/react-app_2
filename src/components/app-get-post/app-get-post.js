import React, {Component} from 'react';
import './app-get-post.css'
import axios from 'axios';
import Posts from '../app-posts'


export default class GetPost extends Component{  
    constructor(props){
        super(props);
        this.state = {
                searchChuck:[]
        };
        }
    handleJoke(item, elem, search){
       if(item === '1'){
        axios.get('https://api.chucknorris.io/jokes/random')
        .then(response => {
          this.setState({searchChuck: [...this.state.searchChuck, response.data]});
      }).catch(error => {
        console.log(error);
      });
       }
       if(item === '2' && elem === 'animal'){
        axios.get('https://api.chucknorris.io/jokes/random?category=animal')
        .then(response => {
          this.setState({searchChuck: [...this.state.searchChuck, response.data], elem});
      }).catch(error => {
        console.log(error);
      });
       }
       if(item ==="2" && elem ==="career"){
        axios.get('https://api.chucknorris.io/jokes/random?category=career')
        .then(response => {
          this.setState({searchChuck: [...this.state.searchChuck, response.data]});
      }).catch(error => {
        console.log(error);
      });
         }
         if(item ==="2" && elem ==="celebrity"){
            axios.get('https://api.chucknorris.io/jokes/random?category=celebrity')
            .then(response => {
              this.setState({searchChuck: [...this.state.searchChuck, response.data]});
          }).catch(error => {
            console.log(error);
          });
             }
             if(item ==="2" && elem ==="dev"){
                axios.get('https://api.chucknorris.io/jokes/random?category=dev')
                .then(response => {
                  this.setState({searchChuck: [...this.state.searchChuck, response.data]});
              }).catch(error => {
                console.log(error);
              });
                 }
                 if(item === "3"){
                    axios.get('https://api.chucknorris.io/jokes/search?query='+search)
                    .then(response => {
                      this.setState({searchChuck: response.data.result.map(el=>el)});
                  }).catch(error => {
                    console.log(error);
                  });
                 }
    }
             
    render() {
        return (
            <>
            <button type="button" className="btn btn-primary btn-lg" onClick={()=>this.handleJoke(this.props.value, this.props.categoryVal, this.props.search)}>
                Get a joke
            </button>
         <Posts search={this.state.searchChuck} category={this.state.category}/>
            </>
        )
    }
    }