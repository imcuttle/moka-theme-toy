
import React from 'react'
import {Map} from 'immutable'


class Search extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {}
	componentDidMount() {}
	componentWillReceiveProps(newProps) {}
	shouldComponentUpdate(newProps, newState, newContext) {
		return !Map(this.props).equals(Map(newProps))
	}
	componentWillUpdate(newProps, newState, newContext) {}
	componentDidUpdate(oldProps, oldState, oldContext) {}
	componentWillUnmount() {}
	static defaultProps = {}
    state = {}
    static propTypes = {}
    static contextTypes = {
    	router: React.PropTypes.object
    }
	render() {
		const {...props} = this.props
		const {router} = this.context

		return (
			<div className="search">
				<i className="fa fa-lg fa-search"></i>
				<input />
			</div>
		)
	}
}

export default Search;
