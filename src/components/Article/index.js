/**
 * Created by Moyu on 16/10/20.
 */
import React from 'react';
import {Link} from 'react-router'
import {Map} from 'immutable'


class Article extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !Map(this.props).equals(Map(nextProps));
    }

    static defaultProps = {
        showBack: false,
        tags: [],
        method: "_blank"
    }
    componentWillMount() {
        document.body.scrollTop = 0;
    }
    componentWillUpdate(nextProps, nextState, nextContext) {

    }
    componentDidUpdate(prevProps, prevState)  {
        // setTimeout(() => {
        //     document.body.scrollTop = document.body.clientHeight;
        // }, 10)
    }

    render() {
        const {title, showBack, date, tags, cover, content, profile, method} = this.props;

        return (
            <article className="animated fadeIn">
                <header className="section-padding--lg mast">
                {
                    !!showBack &&
                    <Link className="nav nav--white" to="/">
                      <i className="fa fa-lg fa-arrow-left"></i>
                      <span>Back to Posts</span>
                    </Link>
                }
                    <figure className="absolute-bg mast__img" style={{backgroundImage: cover&&"url("+cover+")"}}></figure>
                    <div className="mast__container">
                        <span>
                            <time>{date}</time>
                        </span>
                        <h1>{title}</h1>
                        <ul className="tags">
                            {tags && tags.map(tag => 
                                <li key={tag}>
                                    <Link to={"/tags/"+tag}>{tag}</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </header>
                <section className="section-padding post animated fadeIn" dangerouslySetInnerHTML={{__html: content}}></section>
                {
                    !!profile &&
                    <section className="profile">
                        <div className="profile__card">
                            <div className="profile__img">
                                <figure className="absolute-bg" style={{backgroundImage: profile.image&&"url("+profile.image+")"}}></figure>
                            </div>
                            <div className="profile__container">
                                <p dangerouslySetInnerHTML={{__html: profile.contentHtml}}></p>
                                <ul className="profile__social">
                                    {
                                        Array.isArray(profile.icons) &&
                                        profile.icons.map(icon=>
                                            <li key={icon.key}>
                                                <a target={method} className={"fa fa-lg fa-"+icon.key} href={icon.url}></a>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </section>
                }
            </article>
        )
    }
}


export default Article;