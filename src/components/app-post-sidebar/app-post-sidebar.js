import React, {Component} from 'react';

export default class SidebarPost extends Component{
    render() {
        return (
            <React.Fragment>
            {this.props.custom ?
            <div className="post-wrapper">
                  <i className={this.props.like ? "fa fa-heart" : "fa fa-heart like"}></i>
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
       </div>   :
        <React.Fragment/>}
            </React.Fragment>
        )
      }
    }
    