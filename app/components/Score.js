import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Card, CardItem, H1, Text, Header, Icon, Button, Left, Right, Body, Title } from 'native-base'
import PropTypes from 'prop-types'
import ThemeContainer from '../particles/ThemeContainer'

const Score = (props) => (
  <Container style={styles.container}>
    <Header>
      <Left>
        <Button transparent onPress={props.handleBack}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body>
        <Title>Data Nilai</Title>
      </Body>
      <Right />
    </Header>
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
  </Container>
)

Score.propTypes = {
  handleBack: PropTypes.func,
  nrk: PropTypes.string,
  nad: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  }
})

export default ThemeContainer(Score)
