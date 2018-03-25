import React from 'react'
import { SectionList, StyleSheet } from 'react-native'
import { Container, Header, Left, Title, Button, Icon, Body, Right } from 'native-base'
import PropTypes from 'prop-types'
import ThemeContainer from '../particles/ThemeContainer'

const POKUji = (props) => (
  <Container style={styles.container}>
    <Header>
      <Left>
        <Button transparent onPress={props.handleBack}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body>
        <Title>POK Uji</Title>
      </Body>
      <Right />
    </Header>
    <SectionList
      sections={props.sections}
      renderItem={props.renderItem}
      renderSectionHeader={props.renderSectionHeader}
    />
  </Container>
)

POKUji.propTypes = {
  handleBack: PropTypes.func,
  sections: PropTypes.array,
  renderItem: PropTypes.func,
  renderSectionHeader: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  }
})

export default ThemeContainer(POKUji)