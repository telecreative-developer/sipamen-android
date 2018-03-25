import React from 'react'
import { BackHandler } from 'react-native'
import { ListItem, Text, Body, Button, Spinner, Right, Left, Icon } from 'native-base'
import DocumentList from '../components/DocumentList'
import { downloadDocument } from '../actions/documents'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'

class DocumentListContainer extends React.PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed)
  }

  backPressed = () => {
    this.handleBack()
    return true
  }

  async handleBack() {
    await this.props.navigation.goBack()
    await this.props.setNavigate()
  }

  render() {
    const { params } = this.props.navigation.state
    const { navigate } = this.props.navigation
    const { downloadDocument }  = this.props
    return (
      <DocumentList
        documentTitle={params.documentTitle}
        handleBack={() => this.handleBack()}
        documentData={params.documentData}
        renderDocuments={({item, index}) => (
          <ListItem onPress={() => navigate('DocumentViewer', item)}>
            <Body>
              <Text>{item.document_title}</Text>
            </Body>
            {params.download && (
              <Right>
                <Button transparent onPress={() => downloadDocument(index, item.document_url)}>
                  <Icon name='download' style={{color: '#106538'}} />
                </Button>
              </Right>
            )}
          </ListItem>
        )}
      />
    )
  }
}

const mapStateToProps = state => ({
  loadingDownload: state.loadingDownload,
  successDownload: state.successDownload
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  downloadDocument: (index, document_url) => dispatch(downloadDocument(index, document_url))
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentListContainer)