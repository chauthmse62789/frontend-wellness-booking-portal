import { INIT_STATE } from '../../constant';
import { getType, hideApproveModal, showAppoveModal } from '../actions';

export default function rejectModalReducers(state = INIT_STATE.approveModal, action) {
  switch (action.type) {
    case getType(showAppoveModal):
      return {
        isShow: true,
      };
    case getType(hideApproveModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}