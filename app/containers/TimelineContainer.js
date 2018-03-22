import React from 'react'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import Timeline from '../components/Timeline'
import { fetchPosts, sendPost, sendPostWithImage } from '../actions/posts'
import { fetchComments, sendComment } from '../actions/comments'
import ModalCreatePost from '../particles/modals/ModalCreatePost'
import TimelineCard from '../particles/TimelineCard'
import { setNavigate } from '../actions/processor'

class TimelineContainer extends React.Component {
  constructor() {
    super()
    
    this.state = {
      post: '',
      imageBase64: '',
      refreshing: false,
      visibleModalCreatePost: false
    }
  }

  async componentWillMount() {
    const { fetchPosts, sessionPersistance } = await this.props
    await this.setState({refreshing: true})
    await fetchPosts(sessionPersistance.accessToken)
    await this.setState({refreshing: false})
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps !== this.props) {
      return true
    }

    if(nextState !== this.state) {
      return true
    }

    return false
  }

  handleNavigateToPost(item) {
    const { setNavigate } = this.props
    setNavigate('Post', item)
  }

  handleNavigateToCreatePost() {
    const { setNavigate } = this.props
    setNavigate('CreatePost')
  }

  async handleRefresh() {
    const { fetchPosts, sessionPersistance } = await this.props
    await this.setState({refreshing: true})
    await fetchPosts(sessionPersistance.accessToken)
    await this.setState({refreshing: false})
  }

  render() {
    const { posts } = this.props
    const { post, refreshing } = this.state
    return (
      <Timeline
        posts={posts}
        refreshing={refreshing}
        handleRefresh={() => this.handleRefresh()}
        handleNavigateToCreatePost={() => this.handleNavigateToCreatePost()}
        renderPosts={({item}) => (
          <TimelineCard
            avatar={item.users[0].avatar_url}
            name={`${item.users[0].first_name} ${item.users[0].last_name}`}
            info={`SESPIMMEN ${item.users[0].force_of}`}
            image={item.image}
            post={item.post}
            createdAt={item.createdAt}
            handleNavigateToPost={() => this.handleNavigateToPost(item)} />
        )}>
      </Timeline>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  fetchPosts: (accessToken) => dispatch(fetchPosts(accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer)
