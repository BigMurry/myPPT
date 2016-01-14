import React from 'react'

export default function MainLayout(props){
  return (
    <div className={'layout'}>
      <div style={styles.layoutTitle}>Online PPT</div>
      {props.content}
      <div style={styles.layoutFoot}>Copyright (c) Murry.Diao</div>
    </div>
  )
}

const styles = {
  layoutTitle:{
    fontSize:40
  }
}

MainLayout.propTypes = {
  content: React.PropTypes.element.isRequired
}
