import { INIT_STATE } from '../../constant';
import { getType, showConfirm, hideConfirm} from '../actions';

export default function modalReducers(state = INIT_STATE.confirm, action) {
    switch (action.type) {
        case getType(showConfirm):
            return {
                isShow: true,
                data: action.payload
            };
        case getType(hideConfirm):
            return {
                isShow: false
            };
        default:
            return state;
    }
}