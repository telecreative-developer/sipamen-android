import React from 'react'
import { StackNavigator } from 'react-navigation'
import SplashContainer from './app/containers/SplashContainer'
import ComponentContainer from './app/containers/ComponentContainer'
import LoginContainer from './app/containers/LoginContainer'
import EditProfileContainer from './app/containers/EditProfileContainer'
import ChangePasswordContainer from './app/containers/ChangePasswordContainer'
import ReportBugContainer from './app/containers/ReportBugContainer'
import CalendarContainer from './app/containers/CalendarContainer'
import PostContainer from './app/containers/PostContainer'
import EventContainer from './app/containers/EventContainer'
import CreatePostContainer from './app/containers/CreatePostContainer'

const AppNavigator = StackNavigator({
  Splash: {screen: SplashContainer},
  ComponentPage: {screen: ComponentContainer},
  Login: {screen: LoginContainer},
  EditProfile: {screen: EditProfileContainer},
  ChangePassword: {screen: ChangePasswordContainer},
  ReportBug: {screen: ReportBugContainer},
  Calendar: {screen: CalendarContainer},
  Post: {screen: PostContainer},
  CreatePost: {screen: CreatePostContainer},
  Event: {screen: EventContainer}
}, {
  headerMode: 'none'
})

export default AppNavigator