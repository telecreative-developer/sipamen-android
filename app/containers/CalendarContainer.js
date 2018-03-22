import React, { PureComponent } from 'react'
import { Icon } from 'native-base'
import { View, Text, StyleSheet, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'
import Calendar from '../components/Calendar'

class CalendarContainer extends PureComponent {
  constructor() {
    super()
    this.state = {
      items: {
        '2018-03-19': [{time: '20:00 - 23:30', text: 'Event Pertama', description: 'Lorem ipsum dolor sit amet', place: 'Jakarta'}],
        '2018-03-20': [{time: '20:00 - 23:30', text: 'Event Kedua', description: 'Lorem ipsum dolor sit amet', place: 'Jakarta'}],
        '2018-03-21': [{time: '20:00 - 23:30', text: 'Event Ketiga', description: 'Lorem ipsum dolor sit amet', place: 'Jakarta'}]
      }
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

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <View style={styles.viewContainer}>
          <Text style={styles.textTitle}>{item.text}</Text>
        </View>
        <Text>{item.description}</Text>
        <View style={styles.viewContainer}>
          <View style={styles.viewContainerWithIcon}>
            <Icon name='pin' style={styles.icon} />
            <Text style={styles.place}>{item.place}</Text>
          </View>
          <View style={styles.viewContainerWithIcon}>
            <Icon name='time' style={styles.icon} />
            <Text>{item.time}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    )
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name
  }

  timeToString(time) {
    const date = new Date(time)
    return date.toISOString().split('T')[0]
  }

  render() {
    return (
      <Calendar
        handleBack={() => this.handleBack()}
        items={this.state.items}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)} />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
  },
  viewContainerWithIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTitle: {
    fontWeight: 'bold'
  },
  icon: {
    fontSize: 15,
    color: '#999999',
    marginRight: 3
  },
  place: {
    marginRight: 10
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
})

export default connect(null, mapDispatchToProps)(CalendarContainer)