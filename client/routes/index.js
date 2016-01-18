import React from 'react'
import {Route, IndexRoute} from 'react-router'
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
    <IndexRoute components={{content: Index}}/>
    <Route path="upload" components={{content: Upload}}/>
    <Route path="edit" components={{content: Edit}}/>
    <Route path="project" components={{content: Project}}/>
    <Route path="search" components={{content: Search}}/>
    <Route path="help" components={{content: Help}}/>
  </Route>
)
