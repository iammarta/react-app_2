import React, {Component} from 'react';
import './app-sidebar.css'
import SidebarPost from '../app-post-sidebar'

export default class Sidebar extends Component{
    render() {
        let items = [];
        if (this.props.item.length >= 0) {
            let t = 0;
            for (let elem of this.props.item) {
                items.unshift(<SidebarPost custom={elem} url={elem.url} id={elem.id} data={elem.updated_at}
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