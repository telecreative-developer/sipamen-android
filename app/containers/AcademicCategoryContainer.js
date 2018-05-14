import React from 'react'
import { connect } from 'react-redux'
import { ListItem, Text } from 'native-base'
import { setNavigate } from '../actions/processor'
import  AcademicCategory from '../components/AcademicCategory'

const scoreMenu = [
	{
		menu: 'NKK'
	},
	{
		menu: 'NKK HPL'
	},
	{
		menu: 'NKK KKL'
	},
	{
		menu: 'LAPGAS'
	}
]

class AcademicCategoryContainer extends React.PureComponent {
	componentWillUnmout() {
		this.props.setNavigate()
	}

	render() {
		return (
			<AcademicCategory
				title="Data Kategori"
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

const mapStateToProps = state => ({
	academiccategories: state.academiccategories,
})

const mapDispatchToProps = dispatch => ({
	setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AcademicCategoryContainer)
