/**
 * Created by Moyu on 16/10/20.
 */
import {Set} from 'immutable'

const initState = []

function icons(state=initState, action) {
    let stateClone = Object.assign([], state);
    switch (action.type) {
        case 'SET_ICONS_ARRAY':
            stateClone = action.icons;
            break;
    }
    return stateClone;
}

module.exports = icons