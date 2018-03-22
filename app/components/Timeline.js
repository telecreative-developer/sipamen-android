import React from 'react'
import {
  StyleSheet,
  ToastAndroid,
  Dimensions,
  View,
  Image,
  FlatList,
} from 'react-native'
import {
  Container,
  Fab,
  Icon,
  Left,
  Body,
  Right,
  Header,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Grid,
  Col,
  Item,
  Input,
  Footer,
  ListItem
} from 'native-base'
import Modal from 'react-native-modal'
import moment from 'moment'
import PropTypes from 'prop-types'

const { height, width } = Dimensions.get("window")

const Timeline = (props) => (
  <Container style={styles.container}>
    {props.children}
    <FlatList
      showsVerticalScrollIndicator={false}
      refreshing={props.refreshing}
      onRefresh={props.handleRefresh}
      data={props.posts}
      keyExtractor={(item, index) => JSON.stringify(index)}
      renderItem={props.renderPosts} />
    <View>
      <Fab active style={styles.fab} position="bottomRight" onPress={props.handleShowCreatePostModal}>
        <Icon name='add' />
      </Fab>
    </View>
  </Container>
)

Timeline.propTypes = {
  posts: PropTypes.array,
  refreshing: PropTypes.bool,
  renderPosts: PropTypes.func,
  handleRefresh: PropTypes.func,
  handleShowCreatePostModal: PropTypes.func,
  handleShowCommentModal: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  fab: {
    flex: 1
  },
  input: {
    height: 30,
    fontSize: 12,
    padding: 0,
    backgroundColor: "#fff"
  },
  cardItemComment: {
    paddingTop: 0,
    paddingBottom: 5
  },
  thumbnailComment: {
    width: 30,
    height: 30
  },
  nameStatus: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold"
  },
  body: {
    flex: 0.8,
    paddingLeft: 10
  },
  left: {
    flex: 0.1
  },
  right: {
    flex: 0.1
  },
  modalFooter: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderTopWidth: 0.3
  },
  fab: {
    backgroundColor: "#106538"
  },
  inputStatus: {
    height: "auto",
    paddingLeft: 15
  },
  info: {
    fontSize: 10
  },
  paddingListItem: {
    paddingLeft: 7
  },
  leftAlign: {
    alignItems: "center"
  },
})

export default Timeline
