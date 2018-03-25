import React from 'react'
import POKUji from '../components/POKUji'
import { StyleSheet, BackHandler } from 'react-native'
import { ListItem, Text, Body } from 'native-base'
import { fetchPokUji } from '../actions/pokuji'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'

class POKUjiContainer extends React.PureComponent {
  componentDidMount() {
    const { sessionPersistance, fetchPokUji } = this.props
    fetchPokUji(sessionPersistance.accessToken)
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

  render() {
    const { pokUji } = this.props
    return (
      <POKUji
        sections={pokUji}
        keyExtractor={({item, index}) => index}
        handleBack={() => this.handleBack()}
        renderSectionHeader={({section}) => (
          <ListItem itemDivider>
            <Text>POK Uji : {section.title}</Text>
          </ListItem>
        )}
        renderItem={({item}) => (
          <ListItem>
            <Body style={styles.content}>
              <Text>Kode Naskah : {item.kodenaskahs[0].kode_naskah}</Text>
              <Text>No Urut : {item.no_urut}</Text>
            </Body>
          </ListItem>
        )} />
    )
  }
}

const mapStateToProps = state => ({
  pokUji: state.pokUji,
  sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  fetchPokUji: (accessToken) => dispatch(fetchPokUji(accessToken))
})

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(POKUjiContainer)
