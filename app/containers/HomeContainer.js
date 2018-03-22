import React from 'react'
import { Image, Dimensions, TouchableNativeFeedback, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'
import Home from '../components/Home'

const bannerImages = [
  'http://www.sayangi.com/homeapps/uploads/2017/03/Siswa-Sespimmen.jpg',
  'http://www.rmolsumut.com/images/berita/2017/04/159546_04450005042017_sespimti.jpg',
  'http://kabarmedan.com/wp-content/uploads/2017/09/Sespim-4.jpg'
]

const dataMenus = [
  {
    key: 'Tujuan Pendidikan',
    icon: 'http://res.cloudinary.com/nandonrp/image/upload/v1516635388/tujuan_bsowjk.png'
  },
  {
    key: 'Profil Lulusan',
    icon: 'http://res.cloudinary.com/nandonrp/image/upload/v1516635389/profil_rq80u1.png'
  },
  {
    key: 'Tema Pendidikan',
    icon: 'http://res.cloudinary.com/nandonrp/image/upload/v1516635389/tema_emveww.png'
  },
  {
    key: 'Lama Pendidikan',
    icon: 'http://res.cloudinary.com/nandonrp/image/upload/v1516635389/lama_b28aym.png'
  },
  {
    key: 'Metode Pembelajaran',
    icon: 'http://res.cloudinary.com/nandonrp/image/upload/v1516635389/metode_sr1cbn.png'
  },
  {
    key: 'Kompetensi Lulusan',
    icon: 'http://res.cloudinary.com/nandonrp/image/upload/v1516635389/lulusan_wbdoej.png'
  },
]

const { height, width } = Dimensions.get('window')

const bannerWidth = Dimensions.get('window').width

const bannerHeight = 270

class HomeContainer extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps !== this.props) {
      return true
    }

    if(nextState !== this.state) {
      return true
    }

    return false
  }

  handleNavigateScore() {
    this.props.setNavigate('Calendar')
  }

  handleNavigateCalender() {
    this.props.setNavigate('Calendar')
  }

  renderMenus = ({ item, index }) => {
    const { setNavigate } = this.props
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />
    }

    return (
      <TouchableNativeFeedback onPress={() => setNavigate('FullPost', item)}>
        <View style={styles.item}>
          <Image source={{ uri: item.icon }} style={styles.menuBoxIcon} />
          <Text style={styles.itemText}>{item.key}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

  renderBanners(image, index) {
    return (
      <View key={index} style={styles.banner}>
        <Image style={styles.bannerImage} source={{uri: image}} />
      </View>
    )
  }

  render() {
    return (
      <Home
        banners={bannerImages.map((image, index) => this.renderBanners(image, index))}
        navigateScore={() => this.handleNavigateScore()}
        navigateCalender={() => this.handleNavigateCalender()}
        dataMenus={dataMenus}
        renderMenus={this.renderMenus} />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#000'
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    height: height / 6,
  },
  itemText: {
    fontSize: 10,
    textAlign: 'center',
  },
  bannerImage: {
    width: bannerWidth,
    height: bannerHeight,
    opacity: 0.6
  },
  menuBoxIcon: {
    width: 50,
    height: 50,
    marginBottom: 10
  },
  icon: {
    fontSize: 14,
    color: '#2f2f4f',
    marginRight: 0
  },
})

export default connect(null, mapDispatchToProps)(HomeContainer)