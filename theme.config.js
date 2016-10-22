/**
 * Created by Moyu on 16/10/14.
 */

module.exports = {
    apiRoot: "moka_api",
    skipRegExp: "/[^\.(md|markdown)]$/",
    //http://momentjs.com/
    timeFormat: 'DD MMM YYYY',

    marked: {
        options: {
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        },
        setup: function (renderer) {
            
        }
    },
    
    themeBuild: "build",
}
