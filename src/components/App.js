/**
 * Created by Moyu on 16/10/20.
 */
import React from 'react';
import { bindActionCreators } from 'redux'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import {Map} from 'immutable'

import Posts from './Posts'
import Article from './Article'
import ItemsBox from './ItemsBox'
import Header from './Header'
import BigPic from './BigPic'
import Pagination from './Pagination'
import Footer from './Footer'
import ArtNext from './ArtNext'
import utils from '../common/utils'

class App extends React.Component {
    constructor(props) {
        super(props);
        // this.getBigPicText.bind(this)
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {

        return this.props.location.pathname != nextProps.location.pathname
            || !Map(this.props.state).equals(Map(nextProps.state));
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        this.storeTagName(nextProps);
    }
    componentWillReceiveProps(nextProps) {

    }
    componentWillMount() {
        // this.storeTagName();
        const {actions} = this.props;
        const {pathname} = this.props.location;
        const {tagName} = this.props.params;
        const {remote} = this.props.state;
        const {theme} = remote;
        const {leftPic, icons} = theme;
        let {bgColor, smText, lgText} = leftPic;

        // !!icons && Array.isArray(icons) && actions.setIcons(icons)
    }
    componentDidUpdate(prevProps, prevState) {}
    componentWillUnmount() {}

    getBigPicText() {
        const {pathname} = this.props.location;
        const {tagName} = this.props.params;
        const {actions} = this.props;
        const {remote} = this.props.state;
        const {theme} = remote;
        const {leftPic, icons} = theme;
        let {bgColor, smText, lgText} = leftPic;

        
        if(utils.isTagsPath(pathname)) {
            lgText = tagName;
            smText = 'TAG';
        }
        return {
            lgText,
            smText
        }
    }

    static defaultProps = {

    }
    static propTypes = {

    }
    state = {

    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    render() {
        console.log('App', this.props)
        return (
            <div>
                {this.renderChild()}
            </div>
        )
    }

    data = {

    }

    renderFrame(childs) {
        return (
            <main>
                <section className="previews">
                    {
                        React.Children.map(childs, function(child, i) {
                                return React.cloneElement(child, {
                                    key: i
                                })
                            }
                        )
                    }
                </section>
            </main>
        )
    }
    
    renderChild() {
        const {children, location, state, params, actions} = this.props;
        let {remote} = state;
        const {db, theme, moka} = remote;
        let { title, summaryNumber, leftPic, icons, pageSize, profile, fillCovers, lazyLoadCover, iconTarget} = theme;
        const {main, index} = db;
        const {sorted, tagMap} = index;
        const {pathname} = location;
        let {hrefTitle, tagName, page} = params;
        
        if(!state.bigPic.bgUrl) {
            delete state.bigPic.bgUrl;
        }
        const bigPic = Object.assign({}, leftPic, state.bigPic, this.getBigPicText())

        let links = ["/posts"+(pageSize!=null?'/1':''), "/tags"]
        let start, end, prev, next;

        Array.isArray(fillCovers) && utils.fillCovers(main, fillCovers, lazyLoadCover)

        if(utils.isRootPath(pathname) || utils.isPostsPath(pathname)) {
            utils.setTitle('Posts - '+title);
            utils.setMainSummary(main, summaryNumber-0)
            if(utils.isRootPath(pathname)) {
                page = 1;
            }

            if(!!page && !isNaN(page) || page>0) {
                start = (page-1)*pageSize;
                end = page * pageSize
            } else {
                start = 0;
                end = Object.keys(main).length;
                page = 1;
            }
            if(start>0 && page>1) {
                prev = '/posts/'+(page-1)
            }
            if(end<=sorted.length) {
                next = '/posts/'+(page-0+1)
            }
            const posts = sorted.slice(start, end)
                .map(k => {
                    return {
                        hrefTitle: k,
                        summary: main[k].summary,
                        date: main[k].head.date,
                        cover: main[k].head.cover,
                        title: main[k].head.title
                    }
                }
            );
            return (
                this.renderFrame([
                    <BigPic {...bigPic}/>,
                    <div>
                        <Header active="0" links={links}/>
                        <div className="tab active">
                            <Posts posts={posts} hoverHandler={a=>actions.setBigPicBg(a)}/>
                            <Pagination prev={prev} next={next}/>
                            <Footer icons={icons} method={iconTarget}/>
                        </div>
                    </div>
                ])
            )
        } else if(utils.isTagsRootPath(pathname)) {
            utils.setTitle('Tags - '+title);
            const items = Object.keys(tagMap).map(tagName=>{
                const hrefTitles = tagMap[tagName];
                const x = hrefTitles.map(t=>main[t]).find(x=>{
                    return !!x.head.cover
                })
                return {
                    title: tagName,
                    text: hrefTitles.length+' Posts',
                    picUrl: !!x&&x.head.cover || '',
                    href: '/tags/'+tagName
                }
            })
            let texts;
            let showBack = false;
            if(!!this.state && utils.isTagsPath(this.state.pathname)) {
                texts = [this.state.tagName, 'Tags']
                links = ['/tags/'+this.state.tagName, '/tags']
                showBack = true;
                
            }

            return (
                this.renderFrame([
                    <BigPic {...bigPic} showBack={showBack}/>,
                    <div>
                        <Header active="1" links={links} texts={texts}/>
                        <div className="tab active">
                            <ItemsBox items={items} btnText="View All" hoverHandler={a=>actions.setBigPicBg(a)}/>
                            <Footer icons={icons} method={iconTarget}/>
                        </div>
                    </div>
                ])
            )
        } else if(utils.isTagsPath(pathname)) {
            utils.setTitle(tagName +' - '+title);
            const map = tagMap[tagName].reduce((p, n) => {
                p[n] = main[n];
                return p;
            }, {})
            utils.setMainSummary(map);
            const posts = Object.keys(map).map(t=>{
                return {
                    title: map[t].head.title,
                    date: map[t].head.date,
                    cover: map[t].head.cover,
                    summary: map[t].summary,
                    hrefTitle: t
                }
            })

            return (
                this.renderFrame([
                    <BigPic {...bigPic} showBack={true}/>,
                    <div>
                        <Header active="0" links={['/tags/'+tagName, '/tags']} texts={[tagName, 'Tags']} />
                        <div className="tab active">
                            <Posts posts={posts} hoverHandler={a=>actions.setBigPicBg(a)}/>
                            <Pagination prev={prev} next={next}/>
                            <Footer icons={icons} method={iconTarget}/>
                        </div>
                    </div>
                ])
            )
        } else if(utils.isArticlePath(pathname)) {

            let article = main[hrefTitle];
            if(profile) {
                profile.icons = icons;
            }

            let nextdata;
            const i = sorted.indexOf(hrefTitle)
            if(i>=0 && i!=sorted.length-1) {
                nextdata = {
                    title: main[sorted[i+1]].head.title,
                    cover: main[sorted[i+1]].head.cover,
                    href: '/article/'+sorted[i+1]
                }
                utils.setTitle(nextdata.title +' - '+title);
            }

            let tags = article.head.tags;
            if(!Array.isArray(tags)) {
                tags = [tags]
            }
            console.log(article.head);

            return (
                <main>
                    <Article 
                        title={article.head.title} date={article.head.date} showBack={true}
                        tags={tags} cover={article.head.cover} content={article.content}
                        profile={profile} method={iconTarget}
                    />
                    <ArtNext {...nextdata}/>
                </main>
            )
        } else {
            utils.setTitle('Archive - '+title);

            const items = sorted.map(href=>{
                const item = main[href];
                return {
                    picUrl: item.head.cover,
                    title: item.head.title,
                    text: item.head.date,
                    href: '/article/'+href
                }
            })

            return (
            <main>
            <section className="archives animated fadeIn">
                <Link className="nav nav--black" to="/">
                  <i className="fa fa-lg fa-arrow-left"></i>
                  <span>Back to Posts</span>
                </Link>
                <header className="archives__header">
                    <span>Archive</span>
                </header>
                
                <ItemsBox big={true} btnText="Read Post" items={items} />
            </section>
            </main>
            )
        }

    }

    storeTagName(props=this.props) {

        const {location, params, actions} = props;
        const {pathname} = location;
        const {tagName} = params;

        if(utils.isTagsPath(pathname)) {
            this.setState({
                pathname,
                tagName
            })
        } else if(!utils.isTagsRootPath(pathname)) {
            this.setState({
                pathname: null,
                tagName: null
            })
        }
    }
}

function MapStateToProps(state) {
    return {
        state
    }
}

function MapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(require('../reducers/actions'), dispatch)
    }
}

module.exports = connect(
    MapStateToProps,
    MapDispatchToProps
)(App)

