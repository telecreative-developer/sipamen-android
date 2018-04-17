import React from 'react'
import { Image, Dimensions, Alert, TouchableNativeFeedback, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'
import Home from '../components/Home'

const dataMenus = [
  {
    icon: 'http://res.cloudinary.com/nandonrp/image/upload/v1516635388/tujuan_bsowjk.png',
    title: 'Standar Kompetensi Pendidikan',
    type: 'standar-kompetensi'
  },
  {
    icon: 'http://res.cloudinary.com/nandonrp/image/upload/v1516635389/lama_b28aym.png',
    title: 'Data Nilai',
    type: 'data-nilai'
  },
  {
    icon: 'http://res.cloudinary.com/nandonrp/image/upload/v1516635389/profil_rq80u1.png',
    title: 'Data Serdik',
    type: 'data-serdik'
  },
  {
    icon: 'http://res.cloudinary.com/nandonrp/image/upload/v1516635389/metode_sr1cbn.png',
    title: 'Kegiatan',
    type: 'kegiatan'
  },
  {
    icon: 'http://res.cloudinary.com/nandonrp/image/upload/v1516635389/tema_emveww.png',
    title: 'Handbook',
    type: 'handbook'
  },
  {
    icon: 'http://res.cloudinary.com/nandonrp/image/upload/v1516635389/lulusan_wbdoej.png',
    title: 'Kelompok Ujian',
    type: 'pok-uji'
  }
]

const { height } = Dimensions.get('window')

const bannerWidth = Dimensions.get('window').width

const bannerHeight = height / 2.8

class HomeContainer extends React.Component {

  async handleNavigateTo(item) {
    const { setNavigate, dataStandarKompetensi, pokUji } = this.props
    if(item.type === 'standar-kompetensi') {
      setNavigate('DocumentViewer', dataStandarKompetensi)
    }else if(item.type === 'data-nilai') {
      setNavigate('DocumentSection', {documentTitle: 'Data Nilai'})
    }else if(item.type === 'data-serdik') {
      setNavigate('DocumentList', {documentTitle: 'Data Serdik', documentSlug: 'data-serdik'})
    }else if(item.type === 'kegiatan') {
      setNavigate('Timeline', item)
    }else if(item.type === 'handbook') {
      setNavigate('DocumentList', {documentTitle: 'Handbook', documentSlug: 'handbook', download: true})
    }else if(item.type === 'pok-uji') {
      setNavigate('DocumentViewer', pokUji)
    }
  }

  handleNavigateInfo() {
    this.props.setNavigate('DocumentViewer', this.props.dataInfoSespimmen)
  }

  handleNavigateCalendar() {
    this.props.setNavigate('Calendar')
  }

  renderMenus = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />
    }

    return (
      <TouchableNativeFeedback onPress={() => this.handleNavigateTo(item)}>
        <View style={styles.item}>
          <Image source={{ uri: item.icon }} style={styles.menuBoxIcon} />
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

  renderBanners(banner, index) {
    return (
      <View key={index} style={styles.banner}>
        <Image style={styles.bannerImage} source={{uri: banner.banner_url}} />
      </View>
    )
  }

  render() {
    const { banners } = this.props
    return (
      <Home
        banners={banners.map((banner, index) => this.renderBanners(banner, index))}
        navigateInfo={() => this.handleNavigateInfo()}
        navigateCalendar={() => this.handleNavigateCalendar()}
        dataMenus={dataMenus}
        renderMenus={this.renderMenus} />
    )
  }
}

const mapStateToProps = state => ({
  sessionPersistance: state.sessionPersistance,
  dataStandarKompetensi: state.dataStandarKompetensi,
  pokUji: state.pokUji,
  banners: state.banners,
  dataInfoSespimmen: state.dataInfoSespimmen
})

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)