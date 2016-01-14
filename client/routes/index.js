import React from 'react'
import {Route} from 'react-router'

import MainLayout from '../layouts/MainLayout'
import Index from '../containers/Index'
import Upload from '../containers/Upload'
import Edit from '../containers/Edit'
import Project from '../containers/Project'
import Help from '../containers/Help'
import Search from '../containers/Search'

const {
  Component
} = React

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={{content: Index}}/>
    <Route path="upload" component={{content: Upload}}/>
    <Route path="edit" component={{content: Edit}}/>
    <Route path="project" component={{content: Project}}/>
    <Route path="search" component={{content: Search}}/>
    <Route path="help" component={{content: Help}}/>
  </Route>
)
