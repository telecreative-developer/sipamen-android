import React from 'react'
import { StyleSheet, Dimensions, View, BackHandler } from 'react-native'
import { Header, Text, Left, Body, Right, Container, Button, Icon } from 'native-base'
import Pdf from 'react-native-pdf'
import { API_SERVER } from '../lib/server'
import { setNavigate } from '../actions/processor'
import { connect } from 'react-redux'

class FullPost extends React.Component {

  backPressed = () => {
    this.props.navigation.goBack()
    return true
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed)
  }

  componentWillUnmount() {
    this.props.setNavigate('', '')
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed)
  }

  render() {
    const source = {
      uri: `${API_SERVER}${this.props.navigation.state.params.file}`,
      cache: true
    }

    return (
      <Container>
        <Header hasTabs style={styles.header}>
          <Left style={styles.flexHeaderSide}>
            <Icon name="md-arrow-back" style={styles.icon} onPress={() => this.props.navigation.goBack()} />
          </Left>
          <Body style={styles.flexHeader}>
            <Text style={styles.headerText}>{this.props.navigation.state.params.title}</Text>
          </Body>
          <Right style={styles.flexHeaderSide} />
        </Header>
        <View style={styles.container}>
          <Pdf fitWidth={true} source={source} style={styles.pdf} />
        </View>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    sessionPersistance: state.sessionPersistance,
    navigate: state.navigate,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNavigate: (link, data) => dispatch(setNavigate(link, data))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 0,
  },
  header: {
    backgroundColor: '#106538',
  },
  icon: {
    color: '#fff'
  },
  headerText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 16
  },
  flexHeaderSide: {
    flex: 0.3,
  },
  flexHeader: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(FullPost)