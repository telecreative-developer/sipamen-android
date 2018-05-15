import React from 'react'
import { connect } from 'react-redux'
import { ListItem, Text } from 'native-base'
import { setNavigate } from '../actions/processor'
import  AcademicTitleScores from '../components/AcademicTitleScores'
import {fetchAcademicTitleScores} from '../actions/academicscores'


class AcademicTitleScoresContainer extends React.PureComponent {
	componentWillUnmout() {
		this.props.setNavigate()
	}
	componentDidMount(props){
        this.props.fetchAcademicTitleScores(this.props.sessionPersistance.accessToken)
	}

	
	render() {
		return (
			<AcademicTitleScores
				title={this.props.navigation.state.params.title}
				handleBack={() => this.props.navigation.goBack()}
				scoreMenu={this.props.academictitlescores}
				renderItems={({item}) => (
					<ListItem button onPress={()=> this.props.navigation.navigate('DocumentViewer', {
						item,
						document_url: item.file_url,
						document_title: item.title
					})}>
						<Text>{item.title}</Text>
					</ListItem>
				)}
			/>
		)
	}
}

const mapStateToProps = state => ({
	academictitlescores: state.academictitlescores,
	sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
	fetchAcademicTitleScores: (accessToken) => dispatch(fetchAcademicTitleScores(accessToken)),
	setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AcademicTitleScoresContainer)
