import React from 'react'
import Profile from '../components/Profile'
import { connect } from 'react-redux'
import moment from 'moment'
import { fetchMyPosts } from '../actions/posts'
import TimelineCard from '../particles/TimelineCard'
import { setNavigate } from '../actions/processor'

class ProfileContainer extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      refreshing: false
    }
  }

  async componentWillMount() {
    const { fetchMyPosts, sessionPersistance } = await this.props
    await this.setState({refreshing: true})
    await fetchMyPosts(sessionPersistance.id, sessionPersistance.accessToken)
    await this.setState({refreshing: false})
  }

  handleNavigateToPost(item) {
    const { sessionPersistance, setNavigate } = this.props
    setNavigate('Post', item)
  }

  async handleRefresh() {
    const { fetchMyPosts, sessionPersistance } = await this.props
    await this.setState({refreshing: true})
    await fetchMyPosts(sessionPersistance.id, sessionPersistance.accessToken)
    await this.setState({refreshing: false})
  }

  render() {
    const { myPosts, sessionPersistance } = this.props
    const { refreshing } = this.state
    return (
      <Profile
        posts={myPosts}
        refreshing={refreshing}
        handleRefresh={() => this.handleRefresh()}
        avatar={sessionPersistance.avatar_url}
        userName={`${sessionPersistance.first_name} ${sessionPersistance.last_name}`}
        forceOf={sessionPersistance.force_of}
        gender={sessionPersistance.gender}
        birthOfPlace={sessionPersistance.bop}
        birthOfDate={moment(sessionPersistance.bod).format('LL')}
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
      </Profile>
    )
  }
}

const mapStateToProps = state => ({
  myPosts: state.myPosts,
  sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  fetchMyPosts: (id, accessToken) => dispatch(fetchMyPosts(id, accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
