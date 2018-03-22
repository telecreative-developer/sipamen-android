import React, { Component } from 'react'
import { StyleSheet, Image, View, StatusBar, Dimensions, TouchableOpacity, TouchableHighlight, RegisteredStyle } from 'react-native'
import { Container,
  Button,
  Text,
  Item,
  Input,
  Icon,
  H2 } from 'native-base'
import logo from '../assets/images/logo.png'
import ThemeContainer from '../components/ThemeContainer'

const { width, height } = Dimensions.get('window')

class Register extends Component { 
  render() {
    const { navigate } = this.props.navigation
    return (
      <Container style={styles.container}>
        <View style={styles.formLogin}>
          <Image source={logo} style={styles.logo}/>
          <H2 style={styles.title}>Daftar Akun SESPIM</H2>
          <Item regular style={styles.item}>
            <Input placeholder='Nama Lengkap' style={styles.input}/>
          </Item>
          <Item regular style={styles.item}>
            <Input placeholder='Email' style={styles.input}/>
          </Item>
          <Item regular style={styles.item}>
            <Input placeholder='Kata Sandi' style={styles.input}/>
          </Item>
          <Item regular style={styles.item}>
            <Input placeholder='Ulangi Kata Sandi' style={styles.input}/>
          </Item>
          <Button full style={styles.button} onPress={() => navigate('Start')}> 
            <Text style={styles.buttonText}>Daftar</Text>
          </Button>
          <TouchableHighlight onPress={() => navigate('Login')}>
            <Text style={styles.register}>Sudah punya akun? <Text style={styles.registerNow}>Masuk</Text></Text>
          </TouchableHighlight>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  image: {
    width: 200,
    height: 200
  },
  text: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 12
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    fontFamily: 'SourceSansPro-SemiBold',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#106538',
    marginTop: 15,
    paddingHorizontal: '5%' 
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  formLogin: {
    width: width / 1.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    fontSize: 12
  },
  item: {
    marginTop: 10
  },
  buttonFacebook: {
    backgroundColor: '#3b5998'
  },
  icon: {
    fontSize: 16,
    marginRight: 0
  },
  register: {
    textAlign: 'center',
    marginVertical: 25,
    fontSize: 12
  },
  registerNow: {
    color: '#00008b',
    fontSize: 12
  },
  logo: {
    width: 150,
    height: 150
  }
})

export default (ThemeContainer(Register))