/**
 * Created by Moyu on 16/10/20.
 */


const initState = {
    bgColor: '#000',
    bgUrl: '',
    lgText: 'LGTEXT',
    smText: 'SMTEXT'
}

function BigPic(state=initState, action) {
    const stateClone = Object.assign({}, state);
    switch (action.type) {
        case 'SET_BIGPIC_BG':
            stateClone.bgUrl = action.bgUrl;
            break;
        case 'SET_BIGPIC_COLOR':
            stateClone.bgColor = action.bgColor;
            break;
        case 'SET_BIGPIC_LGTEXT':
            stateClone.lgText = action.text;
            break;
        case 'SET_BIGPIC_SMTEXT':
            stateClone.smText = action.text;
            break;
    }
    return stateClone;
}

module.exports = BigPic