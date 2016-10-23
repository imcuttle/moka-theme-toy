/**
 * Created by Moyu on 16/10/20.
 */
import fetch from 'isomorphic-fetch'


module.exports = {
    remotePromise() {
        return Promise.all([
            'moka_api/db.json', 'moka_api/moka.config.json', 'moka_api/theme.config.json'
        ].map(r=>fetch(r).then(res=>res.json())))
        .then(reses=>{
            return {
                db: reses[0],
                moka: reses[1],
                theme: reses[2]
            }
        })
    },

    isTagsPath(pathname) {
        return /^\/?tags\/.+$/.test(pathname)
    },

    isTagsRootPath(pathname) {
        return /^\/?tags\/?$/.test(pathname)
    },

    isTagsPagesPath(pathname) {
        return /^\/?tags\/pages\/\d+$/.test(pathname);
    },

    isRootPath(pathname) {
        return pathname === '/'
    },
    
    isPostsPath(pathname) {
        return /^\/?posts\/?$/.test(pathname) || /^\/?posts\/\d+$/.test(pathname)
    },

    isArticlePath(pathname) {
        return /^\/?article\/.+$/.test(pathname)
    },

    isArchivePath(pathname) {
        return /^\/?archive\/?$/.test(pathname)
    },
    
    getSummary(html, summaryNum=100) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.innerText.slice(0, summaryNum)
    },
    getInnerText(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.innerText;
    },

    setMainSummary(main, num=100) {
        Object.keys(main).forEach(href => {
            const item = main[href]
            // if(!item.innerText) {
            //     item.innerText = this.getInnerText(item.content);
            // }
            if(!item.summary) {
                item.summary = this.getInnerText(item.content).slice(0, num)
            }
        })
    },

    setTitle(title) {
        document.title = title;
    },

    fillCovers(main, covers, lazy) {
        if(covers.length===0) {
            return;
        }
        let c = 0;
        Object.keys(main).forEach((href, i) => {
            const item = main[href]
            // if(!item.innerText) {
            //     item.innerText = this.getInnerText(item.content);
            // }
            if(!item.head.cover) {
                let match = item.content.match(/<img src="(.+?)".*?>/);
                item.head.cover = match && match.length>1 && match[1] || covers[c++%covers.length]
                if(!lazy) {
                    new Image().src=item.head.cover
                }
            }
        })
    }
}