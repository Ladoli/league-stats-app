import React, { PureComponent } from 'react';
import './PaginationBar.css';

export default class PaginationBar extends PureComponent{

  select = (e) => {
    let page = e.target.value;
    this.props.dropdownSelect(page);
  }

  renderDropDownOptions = () => {
    let { pagesCount } = this.props;
    let options = [];
    for(let i = 1; i <= pagesCount; i++){
      options.push(<option key={i} value={i}>{i}</option>)
    }
    return options;
  }

  render(){
    let alterClass ="";
    if(this.props.alternative){
      alterClass = "alter";
    }
    let page = this.props.page ? this.props.page : 1;
    return (
      <div className={"paginationBarContainer " + alterClass}>
        <span className={"pageHelp " + alterClass}>Page</span> 
        <select 
          onChange={ this.select } 
          name={"paginationDropDown"} 
          className={alterClass}
          value={page}
          >
          {this.renderDropDownOptions()}
        </select>
      </div>
    )
  }
}
