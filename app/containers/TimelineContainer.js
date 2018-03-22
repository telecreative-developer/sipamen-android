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

  handleShowCreatePostModal() {
    this.setState({visibleModalCreatePost: true})
  }

  handleCloseCreatePostModal() {
    this.setState({visibleModalCreatePost: false})
  }

  handleNavigateToPost(item) {
    const { setNavigate } = this.props
    setNavigate('Post', item)
  }

  async handleRefresh() {
    const { fetchPosts, sessionPersistance } = await this.props
    await this.setState({refreshing: true})
    await fetchPosts(sessionPersistance.accessToken)
    await this.setState({refreshing: false})
  }

  handlePickImage() {
    const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			storageOptions: {
				skipBackup: true
			}
		}

		ImagePicker.launchImageLibrary(options, response => {
			if (response.didCancel) {
				this.setState({imageBase64: this.state.imageBase64 })
			} else {
				this.setState({
					imageBase64: `data:image/png;base64,${response.data}`
				})
			}
		})
  }

  handleOpenCamera() {
    const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			storageOptions: {
				skipBackup: true
			}
		}

		ImagePicker.launchCamera(options, response => {
			if (response.didCancel) {
				this.setState({imageBase64: this.state.imageBase64 })
			} else {
				this.setState({
					imageBase64: `data:image/png;base64,${response.data}`
				})
			}
		})
  }

  handleSendPost() {
    const { sendPost, sendPostWithImage, sessionPersistance } = this.props
    const { post, imageBase64 } = this.state
    if(imageBase64 !== '') {
      sendPostWithImage(imageBase64, {
        post: post,
        id: sessionPersistance.id
      }, sessionPersistance.accessToken)
    }else{
      sendPost({
        post: post,
        id: sessionPersistance.id
      }, sessionPersistance.accessToken)
    }
  }

  handleSendComment() {
    const { sendComment, sessionPersistance } = this.props
    const { comment, post_id, userId } = this.state
    if(comment !== '') {
      sendComment(userId,
        `${sessionPersistance.first_name} ${sessionPersistance.last_name}`, {
        comment: comment,
        post_id: post_id,
        id: sessionPersistance.id,
      }, sessionPersistance.accessToken)
      this.setState({comment: ''})
    }
  }

  render() {
    const { posts, comments, sessionPersistance, loading } = this.props
    const { post, dataPost, comment, refreshing, visibleModalCreatePost, visibleModalComment } = this.state
    return (
      <Timeline
        posts={posts}
        refreshing={refreshing}
        handleRefresh={() => this.handleRefresh()}
        handleShowCreatePostModal={() => this.handleShowCreatePostModal()}
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
        <ModalCreatePost
          visibleModalCreatePost={visibleModalCreatePost}
          handleCloseModalCreatePost={() => this.handleCloseCreatePostModal()}
          handlePickImage={() => this.handlePickImage()}
          handleOpenCamera={() => this.handleOpenCamera()}
          onChangePost={(post) => this.setState({post})}
          handleSendPost={() => this.handleSendPost()}
          postEmpty={post !== '' ? false : true}
          loadingSendPost={loading.condition === true && loading.process_on === 'LOADING_SEND_POST' ? true : false}
          name={`${sessionPersistance.first_name} ${sessionPersistance.last_name}`}
          avatar={sessionPersistance.avatar_url}
          forceOf={sessionPersistance.force_of}
          post={post} />
      </Timeline>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  posts: state.posts,
  sessionPersistance: state.sessionPersistance,
  comments: state.comments
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  fetchPosts: (accessToken) => dispatch(fetchPosts(accessToken)),
  fetchComments: (idPost, accessToken) => dispatch(fetchComments(idPost, accessToken)),
  sendComment: (userId, userName, data, accessToken) => dispatch(sendComment(userId, userName, data, accessToken)),
  sendPost: (data, accessToken) => dispatch(sendPost(data, accessToken)),
  sendPostWithImage: (image, data, accessToken) => dispatch(sendPostWithImage(image, data, accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer)
