import React from 'react'
import {
  TouchableNativeFeedback,
  StyleSheet,
  Dimensions,
  View,
  Image
} from 'react-native'
import {
  Container,
  Content,
  Text,
  Spinner,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Thumbnail,
  Form,
  Item,
  Label,
  Input,
  Button,
  Picker,
  Title
} from 'native-base'
import Modal from 'react-native-modal'
import moment from 'moment'
import PropTypes from 'prop-types'
import ImagePicker from 'react-native-image-picker'
import ThemeContainer from '../particles/ThemeContainer'
import DateTimePicker from 'react-native-modal-datetime-picker'
import defaultAvatar from '../assets/images/default-avatar.jpg'

const { width, height } = Dimensions.get('window')

const EditProfile = (props) => (
  <Container style={styles.container}>
    <DateTimePicker
      isVisible={props.visibleDatePicker}
      onConfirm={props.handlePickDate}
      onCancel={props.handleCancelPickDate} />
    <Header hasTabs style={styles.header}>
      <Left>
        <Icon name='md-arrow-back' style={styles.icon} onPress={props.handleBack} />
      </Left>
      <Body>
        <Title>Edit Profile</Title>
      </Body>
      <Right />
    </Header>
    <Content style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        {props.avatar !== null ? (
          <Thumbnail source={{uri: props.avatar}} />
        ) : (
          <Thumbnail source={defaultAvatar} />
        )}
        <TouchableNativeFeedback onPress={props.handlePickAvatar}>
          <View>
            <Text style={styles.valid}>Ganti Foto Profil</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <Form style={styles.form}>
        <Item stackedLabel>
          <Label>Nama Depan</Label>
          <Input onChangeText={props.onChangeFirstName} value={props.firstName} />
        </Item>
        <Item stackedLabel>
          <Label>Nama Belakang</Label>
          <Input onChangeText={props.onChangeLastName} value={props.lastName} />
        </Item>
        <View style={{marginHorizontal: 15, marginTop: 15}}>
          <Label>Jenis Kelamin</Label>
          <Picker mode='dropdown' selectedValue={props.gender} onValueChange={props.onChangeGender} >
            <Item label='Pria' value={1} />
            <Item label='Wanita' value={2} />
          </Picker>
        </View>
        <Item stackedLabel>
          <Label>Tempat Lahir</Label>
          <Input onChangeText={props.onChangeBOP} value={props.bop} />
        </Item>
        <Item style={styles.itemForm} stackedLabel onPress={props.onChangeBOD}>
          <Label>Tanggal lahir</Label>
          <Input disabled value={moment(props.bod).format('LL')} />
        </Item>
        <Item stackedLabel style={styles.itemForm}>
          <Label>Angkatan</Label>
          <Input onChangeText={props.onChangeForceOf} value={props.forceOf} />
        </Item>
      </Form>
      {props.loadingSaveProfile ? (
        <Button full style={styles.button}>
          <Spinner color='#FFFFFF' />
        </Button>
      ) : (
        <Button full style={styles.button} onPress={props.handleSaveProfile}>
          <Text style={styles.text}>SIMPAN</Text>
        </Button>
      )}
    </Content>
  </Container>
)

EditProfile.propTypes = {
  visibleDatePicker: PropTypes.bool,
  handlePickDate: PropTypes.func,
  handleCancelPickDate: PropTypes.func,
  handleBack: PropTypes.func,
  avatar: PropTypes.string,
  handlePickAvatar: PropTypes.func,
  onChangeFirstName: PropTypes.func,
  firstName: PropTypes.string,
  onChangeLastName: PropTypes.func,
  lastName: PropTypes.string,
  onChangeGender: PropTypes.func,
  gender: PropTypes.string,
  onChangeBOP: PropTypes.func,
  bop: PropTypes.string,
  onChangeBOD: PropTypes.func,
  bod: PropTypes.string,
  onChangeForceOf: PropTypes.func,
  forceOf: PropTypes.string,
  handleSaveProfile: PropTypes.func,
  loadingSaveProfile: PropTypes.bool
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#106538"
  },
  icon: {
    color: "#fff"
  },
  headerText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "SourceSansPro-SemiBold",
    fontSize: 16
  },
  flexHeaderSide: {
    flex: 1
  },
  flexHeader: {
    flex: 1,
    alignItems: "center"
  },
  container: {
    backgroundColor: "#fff"
  },
  content: {
    paddingHorizontal: 15
  },
  editProfile: {
    fontSize: 14,
    color: "#2f4f4f"
  },
  profileHeader: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 15
  },
  valid: {
    color: "#00008b",
    fontSize: 12,
    marginTop: 5
  },
  form: {
    marginTop: 5
  },
  itemForm: {
    marginTop: 10
  },
  button: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#106538",
    marginTop: 15,
    paddingHorizontal: "10%",
    borderColor: "#db4039"
  }
})

export default ThemeContainer(EditProfile)
