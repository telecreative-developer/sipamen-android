import React from 'react'
import {
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  View
} from 'react-native'
import {
  Container,
  Thumbnail,
  Text,
  Content,
  Header,
  Col,
  Item,
  Input,
  Tab,
  Tabs,
  Form,
  Label
} from 'native-base'
import PropTypes from 'prop-types'
import moment from 'moment'
import defaultAvatar from '../assets/images/default-avatar.jpg'
import ThemeContainer from '../particles/ThemeContainer'

const { height, width } = Dimensions.get('window')

const Profile = (props) => (
  <Container style={styles.container}>
    {props.children}
    <Content showsVerticalScrollIndicator={false}>
      <Tabs style={styles.tabs}>
        <Tab heading='Personal Details'>
          <View style={styles.profileHeader}>
            {props.avatar !== null ? (
              <Thumbnail large source={{uri: props.avatar}} />
            ) : (
              <Thumbnail large source={defaultAvatar} />
            )}
            <View style={styles.dataView}>
              <Text style={styles.name}>
                {props.userName}
              </Text>
              <Text style={styles.status}>{`SESPIMMEN ${props.forceOf}`}</Text>
            </View>
          </View>
          <Form>
            <Item stackedLabel style={styles.itemData}>
              <Label>Nama Lengkap</Label>
              <Input disabled value={props.userName} />
            </Item>
            <Item stackedLabel style={styles.itemData}>
              <Label>Jenis Kelamin</Label>
              <Input disabled value={props.gender === 1 ? 'Pria' : 'Wanita'} />
            </Item>
            <Item stackedLabel style={styles.itemData}>
              <Label>Angkatan</Label>
              <Input disabled value={`SESPIMMEN ${props.forceOf}`} />
            </Item>
            <Item stackedLabel style={styles.itemData}>
              <Label>Tempat Lahir</Label>
              <Input disabled value={props.birthOfPlace} />
            </Item>
            <Item stackedLabel style={styles.itemData}>
              <Label>Tanggal Lahir</Label>
              <Input disabled value={props.birthOfDate} />
            </Item>
          </Form>
        </Tab>
        <Tab heading='Status'>
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshing={props.refreshing}
            onRefresh={props.handleRefresh}
            data={props.posts}
            keyExtractor={(item, index) => index}
            renderItem={props.renderPosts} />
        </Tab>
      </Tabs>
    </Content>
  </Container>
)

Profile.propTypes = {
  posts: PropTypes.array,
  avatar: PropTypes.string,
  userName: PropTypes.string,
  forceOf: PropTypes.number,
  gender: PropTypes.number,
  birthOfPlace: PropTypes.string,
  birthOfDate: PropTypes.string,
  refreshing: PropTypes.bool,
  handleRefresh: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  profileHeader: {
    height: height / 6,
    width: width,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15
  },
  dataView: {
    flexDirection: "column",
    marginLeft: 15
  },
  name: {
    fontSize: 16,
    fontWeight: "bold"
  },
  status: {
    fontSize: 12
  },
  tabs: {
    backgroundColor: "#fff"
  },
  itemData: {
    marginTop: 10
  }
})

export default Profile
