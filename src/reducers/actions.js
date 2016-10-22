/**
 * Created by Moyu on 16/10/20.
 */

const type = (type, obj) => {
    return Object.assign({}, {
        type: type,
        ...obj
    })
}

/* BigPic start */
export const setBigPicColor = (bgColor) => {
    return type('SET_BIGPIC_COLOR', {bgColor})
}

export const setBigPicBg = (bgUrl) => {
    return type('SET_BIGPIC_BG', {bgUrl})
}
export const setBigPicSmText = (text) => {
    return type('SET_BIGPIC_SMTEXT', {text})
}
export const setBigPicLgText = (text) => {
    return type('SET_BIGPIC_LGTEXT', {text})
}
/* BigPic end */

export const setIcons = (icons) => {
    return type('SET_ICONS_ARRAY', {icons})
}