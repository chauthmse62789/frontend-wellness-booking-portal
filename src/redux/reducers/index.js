import { combineReducers } from 'redux';
import bookings from './bookings'
import auth from './auth'
import modal from './modal'
import rejectModal from './rejectModal'
import approveModal from './approveModal'
export default combineReducers({
    bookings, auth, modal, rejectModal, approveModal
})