/**
 * Created by Moyu on 16/10/21.
 */
import React from 'react';
import {Map} from 'immutable'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !Map(this.props).equals(Map(nextProps));
    }
    componentWillUpdate(nextProps, nextState, nextContext) {}
    componentWillReceiveProps(nextProps) {}
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState) {}
    componentWillUnmount() {}
    static defaultProps = {
        links: ['/posts', '/tags'],
        active: 0
    }
    render() {
        const {active, texts} = this.props;

        return (
            <header style={{position: 'relative'}}>
                <ul className="tabs">
                    <li onClick={this.switchHeader.bind(this, 0)} className={"tabs__item "+(active==0?"active":"")}>{texts && texts[0]||'Posts'}</li>
                    <li onClick={this.switchHeader.bind(this, 1)} className={"tabs__item "+(active==1?"active":"")}>{texts && texts[1]||'Tags'}</li>
                </ul>
                {/*<div className="searchbox"><input type="text" placeholder="Search..."/></div>*/}
            </header>
        )
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    switchHeader(i) {
        const {router} = this.context;
        const {links} = this.props;
        router.push(links[i-0]);
    }
}

export default Header;