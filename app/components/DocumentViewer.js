import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Container, Header, Title, Subtitle, Left, Button, Icon, Body, Right } from 'native-base'
import PdfViewer from 'react-native-pdf'
import PropTypes from 'prop-types'
import ThemeContainer from '../particles/ThemeContainer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const { width, height } = Dimensions.get('window')

const DocumentViewer = (props) => (
  <Container>
    {!props.documentFullscreen && (
      <Header>
        <Left>
          <Button transparent onPress={props.handleBack}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>{props.documentTitle}</Title>
          {props.documentSubtitle && (
            <Subtitle>{props.documentSubtitle}</Subtitle>
          )}
        </Body>
        <Right>
          <Button transparent onPress={props.handleTap} onPress={props.zoomIn}>
            <MaterialIcons name='zoom-in' style={styles.icon} />
          </Button>
          <Button transparent onPress={props.handleTap} onPress={props.zoomOut}>
            <MaterialIcons name='zoom-out' style={styles.icon} />
          </Button>
          <Button transparent onPress={props.handleTap}>
            <MaterialIcons name='fullscreen' style={styles.icon} />
          </Button>
          {props.download && (
            <Button transparent onPress={props.handleDownload}>
              <Icon name='cloud-download' />
            </Button>
          )}
        </Right>
      </Header>
    )}
    <PdfViewer
      scale={props.scale}
      onPageSingleTap={props.handleTap}
      source={{uri: props.fileSource}}
      style={styles.pdf} />
  </Container>
)

DocumentViewer.propTypes = {
  fileSoruce: PropTypes.string,
  documentFullscreen: PropTypes.bool,
  documentTitle: PropTypes.string,
  documentSubtitle: PropTypes.string,
  download: PropTypes.bool,
  handleDownload: PropTypes.func,
  zoomIn: PropTypes.func,
  zoomOut: PropTypes.func,
  handleTap: PropTypes.func,
  handleBack: PropTypes.func,
  scale: PropTypes.number
}

const styles = StyleSheet.create({
  pdf: {
    flex:1,
    width: width,
    height: height
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 28
  }
})

export default ThemeContainer(DocumentViewer)