import { combineReducers } from 'redux'
import { loading, loadingDownload, success, successDownload, failed, failedDownload, navigate, activePageHome } from './processor'
import { sessionPersistance } from './login'
import { posts, myPosts } from './posts'
import { events } from './events'
import { comments } from './comments'
import { articles } from './articles'
import { notifications, generalNotifications } from './notifications'
import { dataStandarKompetensi, dataSerdik, dataHandbook } from './documents'
import { pokUji } from './pokuji'
import { twitterToken, tweets } from './twitter'
import { scores } from './scores'
import { dataImages } from './images'

const rootReducers = combineReducers({
  posts, events, comments, articles, sessionPersistance, notifications,
  loading, loadingDownload, success, successDownload, failed, failedDownload,
  navigate, activePageHome, myPosts, generalNotifications, twitterToken,
  dataStandarKompetensi, dataSerdik, dataHandbook, pokUji, tweets, scores, dataImages
})

export default rootReducers