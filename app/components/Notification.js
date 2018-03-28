import React from 'react'
import { StyleSheet, FlatList, View, Image } from 'react-native'
import { Container, Tabs, Tab, Content, Body, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import moment from 'moment'
import box from '../assets/images/box.png'

const Notification = (props) => (
  <Container style={styles.container}>
    <Content>
      <Tabs style={styles.tabs}>
        <Tab heading='Timeline'>
          <FlatList
            refreshing={props.loadingNotifications}
            onRefresh={props.onRefreshNotifications}
            data={props.notifications.filter(notification => notification.type === 'comment')}
            keyExtractor={(item, index) => JSON.stringify(index)}
            renderItem={props.renderTimelineNotifications} />
          <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
            <Image source={box} style={{width: 100, height: 100, opacity: 0.3}}/>
            <Text style={{fontWeight: 'bold', opacity: 0.3, fontSize: 16}}>Belum ada konten</Text>
          </View>
        </Tab>
        <Tab heading='Acara'>
          <FlatList
            refreshing={props.loadingNotifications}
            onRefresh={props.onRefreshNotifications}
            data={props.generalNotifications.filter(notification => notification.type === 'event')}
            keyExtractor={(item, index) => JSON.stringify(index)}
            renderItem={props.renderEventNotifications} />
        </Tab>
        <Tab heading='Pengumuman'>
          <FlatList
            refreshing={props.loadingNotifications}
            onRefresh={props.onRefreshNotifications}
            data={props.generalNotifications.filter(notification => notification.type === 'announcement')}
            keyExtractor={(item, index) => JSON.stringify(index)}
            renderItem={props.renderAnnouncementNotifications} />
        </Tab>
      </Tabs>
    </Content>
  </Container>
)

Notification.propTypes = {
  loadingNotifications: PropTypes.bool,
  onRefreshNotifications: PropTypes.func,
  notifications: PropTypes.array,
  renderNotifications: PropTypes.element
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  }
})

export default Notification
