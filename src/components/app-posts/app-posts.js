import React, {Component} from 'react';
import Post from '../app-post'

export default class Posts extends Component{  
    render() {
        let items = [];
        if (this.props.search.length >= 0) {
            let t = 0;
            for (let elem of this.props.search) {
                items.unshift(<Post custom={elem} handleFav={this.props.handleFav} item={elem} url={elem.url} id={elem.id} data={elem.updated_at}
                    icon={elem.icon_url} category={elem.categories} joke={elem.value}
                                 key={t++}/>);
    }
        }
        return (
            <>
     {items}
     </>
        )
}
}
