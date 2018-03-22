import { combineReducers } from 'redux'
import { loading, success, failed, navigate, activePageHome } from './processor'
import { sessionPersistance } from './login'
import { posts, myPosts } from './posts'
import { events } from './events'
import { comments } from './comments'
import { articles } from './articles'
import { notifications, generalNotifications } from './notifications'

const rootReducers = combineReducers({
  posts, events, comments, articles, sessionPersistance, notifications,
  loading, success, failed, navigate, activePageHome, myPosts, generalNotifications
})

export default rootReducers