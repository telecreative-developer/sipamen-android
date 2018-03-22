import React from 'react'
import { ImageBackground, Dimensions, View, Text, StyleSheet } from 'react-native'
import { Container, Content, Button, Header, Left, Body, Right, Icon, H1 } from 'native-base'
import moment from 'moment'
import ThemeContainer from '../particles/ThemeContainer'

const { width, height } = Dimensions.get('window')

const Event = (props) => (
  <Container style={styles.container}>
    <Content>
      <ImageBackground source={{uri: 'http://op3global.com/wp-content/uploads/2017/10/event-manegment.jpg'}} style={{height: height / 3}}>
        <Header hasTabs style={{backgroundColor: 'transparent'}}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body />
        </Header>
      </ImageBackground>
      <View style={styles.containerTitle}>
        <View style={styles.viewTitle}>
          <View style={styles.contentLeft}>
            <Icon name='calendar' style={styles.iconCalendar} />
          </View>
          <View style={styles.contentRight}>
            <H1>Lorem ipsum dolor sit amet</H1>
            <View style={styles.descWithIcon}>
              <Icon name='pin' style={styles.icon} />
              <Text>Jakarta, Indonesia</Text>
            </View>
            <View style={styles.descWithIcon}>
              <Icon name='calendar' style={styles.icon} />
              <Text>{moment('2018-02-01').format('LL')}</Text>
            </View>
            <View style={styles.descWithIcon}>
              <Icon name='time' style={styles.icon} />
              <Text>11.00 PM - 12.00 PM</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.containerContent}>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
    </Content>
  </Container>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  containerTitle: {
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1
  },
  iconCalendar: {
    fontSize: 70
  },
  containerContent: {
    margin: 15
  },
  description: {
    fontSize: 15,
    lineHeight: 25
  },
  contentLeft: {
    marginLeft: 15,
    marginVertical: 15
  },
  contentRight: {
    margin: 15, width: '70%'
  },
  viewTitle: {
    flexDirection: 'row'
  },
  descWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3
  },
  icon: {
    fontSize: 15,
    color: '#999999',
    marginRight: 5
  }
})

export default ThemeContainer(Event)