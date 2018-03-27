import React from 'react'
import {
  StyleSheet,
  Dimensions,
  View
} from 'react-native'
import {
  Container,
  Thumbnail,
  Text,
  Content,
  Item,
  Input,
  Tab,
  Tabs,
  Form,
  Label,
  Card,
  CardItem,
  Body,
  H1
} from 'native-base'
import PropTypes from 'prop-types'
import defaultAvatar from '../assets/images/default-avatar.jpg'

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
        <Tab heading='Nilai'>
          <Content>
            <Card>
              <CardItem header>
                <Text>NRK</Text>
              </CardItem>
              <CardItem>
                <Body>
                <H1>{props.nrk}</H1>
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <Text>NAD</Text>
              </CardItem>
              <CardItem>
                <Body>
                <H1>{props.nad}</H1>
                </Body>
              </CardItem>
            </Card>
          </Content>
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
  handleRefresh: PropTypes.func,
  nrk: PropTypes.number,
  nad: PropTypes.number
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
