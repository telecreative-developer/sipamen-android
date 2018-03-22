import React from 'react'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { login } from '../actions/login'
import Splash from '../components/Splash'

class SplashContainer extends React.PureComponent {
  async componentDidMount() {
    const session = await AsyncStorage.getItem('session')
		const data = await JSON.parse(session)
		setTimeout(() => {
			if (data !== null) {
				try {
					this.props.login(data.email, data.password)
					this.props.navigation.dispatch(
						NavigationActions.reset({
							index: 0,
							actions: [NavigationActions.navigate({routeName: 'ComponentPage'})]
						})
					)
				} catch (e) {
					this.props.navigation.dispatch(
						NavigationActions.reset({
							index: 0,
							actions: [NavigationActions.navigate({routeName: 'ComponentPage'})]
						})
					)
				}
			} else {
				this.props.navigation.navigate('Login')
			}
		}, 2000)
	}
  
  render() {
    return (
      <Splash />
    )
  }
}

const mapDispatchToProps = dispatch => ({
	login: (email, password) => dispatch(login(email, password))
})

export default connect(null, mapDispatchToProps)(SplashContainer)