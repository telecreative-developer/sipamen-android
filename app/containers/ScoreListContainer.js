import React from 'react'
import { connect } from 'react-redux'
import { ListItem, Text } from 'native-base'
import { setNavigate } from '../actions/processor'
import ScoreList from '../components/ScoreList'

const scoreMenu = [
	{
		menu: 'Akademik'
	},
	{
		menu: 'Kepribadian'
	},
	{
		menu: 'Kesehatan Jasmani'
	},
	{
		menu: 'Nilai Kegiatan Khusus'
	},
	{
		menu: 'Nilai Gabungan'
	}
]

class ScoreListContainer extends React.PureComponent {
	componentWillUnmout() {
		this.props.setNavigate()
	}

	render() {
		return (
			<ScoreList
				title="Data Nilai"
				handleBack={() => this.props.navigation.goBack()}
				scoreMenu={scoreMenu}
				renderItems={({ item }) => (
					<ListItem>
						<Text>{item.menu}</Text>
					</ListItem>
				)}
			/>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

export default connect(null, mapDispatchToProps)(ScoreListContainer)
