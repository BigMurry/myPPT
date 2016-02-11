import React from 'react'

export default class MainLayout extends React.Component{

  constructor(props){
    super(props)
    this._renderHead = this._renderHead.bind(this)
  }

  _renderHead(){
    return(
      <div className={'layout-head'}>
        <div className={'layout-title'}>Online PPT</div>
        <div className={'layout-menu'}>Menu</div>
      </div>
    )
  }

  render(){
    return (
      <div className={'layout'}>
        {this._renderHead()}
        {this.props.content}
        <div className={'layout-foot'}>Copyright (c) Murry.Diao</div>
      </div>
    )
  }

}

MainLayout.propTypes = {
  content: React.PropTypes.element.isRequired
}
