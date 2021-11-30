import { INIT_STATE } from '../../constant';
import { getType, hideRejectModal, showRejectModal } from '../actions';

export default function rejectModalReducers(state = INIT_STATE.rejectModal, action) {
  switch (action.type) {
    case getType(showRejectModal):
      return {
        isShow: true,
      };
    case getType(hideRejectModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}