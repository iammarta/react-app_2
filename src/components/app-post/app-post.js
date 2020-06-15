import React, {Component} from 'react';
import './app-post.css'

export default class Post extends Component{  
    constructor(props){
        super(props);
        this.state={
        like:false,
        }
        this.onLike=this.onLike.bind(this)
    }
    onLike() {
        this.setState({
            like: !this.state.like
          });
        if (!this.state.like) {
            this.props.handleFav(this.props.custom);
        }
    }
    render() {
        return (
            <div className="post-wrapper">
                 <i className={this.state.like ? "fa fa-heart like" : "fa fa-heart"} onClick={this.onLike}></i>
            <span className="post-id" >ID: <a href={this.props.url} target="blank">{this.props.id}</a></span> 
            <div className="text-wrapper">
            <img src={this.props.icon} alt="icon" />
            <span className="post-text">
                {this.props.joke}
            </span>
            </div>
            <span className="post-date"> Last Updated: {Math.ceil((Date.now() - new Date(this.props.data.split(".")[0].replace(' ', 'T')))/ 3600000)} hours ago</span>
            <div className="post-btn">
            <button type="button" className="btn btn-light">{this.props.category}</button>
            </div>
            </div> 
        )
}
}