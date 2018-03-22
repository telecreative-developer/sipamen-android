import React from 'react'
import { BackHandler } from 'react-native'
import CreatePost from '../components/CreatePost'
import { sendPost, sendPostWithImage } from '../actions/posts'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'
import ImagePicker from 'react-native-image-picker'

class CreatePostContainer extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      post: '',
      imageBase64: ''
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed)
  }

  backPressed = () => {
    this.handleBack()
    return true
  }

  async handleBack() {
    await this.props.navigation.goBack()
    await this.props.setNavigate()
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

  render() {
    const { sessionPersistance, loading } = this.props
    const { post } = this.state
    return (
      <CreatePost
        handleBack={() => this.handleBack()}
        handlePickImage={() => this.handlePickImage()}
        handleOpenCamera={() => this.handleOpenCamera()}
        onChangePost={(post) => this.setState({post})}
        handleSendPost={() => this.handleSendPost()}
        postEmpty={post !== '' ? false : true}
        loadingSendPost={loading.condition === true && loading.process_on === 'LOADING_SEND_POST' ? true : false}
        name={`${sessionPersistance.first_name} ${sessionPersistance.last_name}`}
        avatar={sessionPersistance.avatar_url}
        forceOf={sessionPersistance.force_of}
        post={post}  />
    )
  }
}

const mapStateToProps = state => ({
  sessionPersistance: state.sessionPersistance,
  loading: state.loading
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  sendPost: (data, accessToken) => dispatch(sendPost(data, accessToken)),
  sendPostWithImage: (image, data, accessToken) => dispatch(sendPostWithImage(image, data, accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostContainer)