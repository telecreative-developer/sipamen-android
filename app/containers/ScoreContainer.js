import React from 'react'
import { connect } from 'react-redux'
import Score from '../components/Score'
import { fetchScores } from '../actions/scores'
import { BackHandler } from "react-native"
import { setNavigate } from "../actions/processor"

class ScoreContainer extends React.PureComponent {

  componentDidMount() {
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
    const { navigation, setNavigate } = await this.props
    await setNavigate()
    await navigation.goBack()
  }

  render() {
    const { scores } = this.props
    return (
      <Score
        handleBack={() => this.handleBack()}
        nad={scores.nad}
        nrk={scores.nrk}
      />
    )
  }
}

const mapStateToProps = state => ({
  scores: state.scores
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ScoreContainer)
