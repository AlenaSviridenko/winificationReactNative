import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
    NEW_PASSWORD_CHANGED,
    CONFIRM_PASSWORD_CHANGED,
    PASSWORD_UPDATE_FAILED,
    PASSWORD_UPDATE_SUCCESS,
    REGISTER_PROPERTY_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
    USER_PASSWORD_FORGOT_SUCCESS,
    USER_PASSWORD_FORGOT_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  newPassword: '',
  confirmNewPassword: '',
  user: {
    firstName: '',
    lastName: ''
  },
  error: '',
  modalError: '',
  modalMessage: '',
  message: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case NEW_PASSWORD_CHANGED:
      return { ...state, newPassword: action.payload };
    case CONFIRM_PASSWORD_CHANGED:
      return { ...state, confirmNewPassword: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '', modalError: '', modalMessage: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication failed. ' + action.payload, password: '', loading: false };
    case PASSWORD_UPDATE_SUCCESS:
      return { ...state, message: 'Password updated. ', password: '', newPassword: '', confirmNewPassword: '', error: '', loading: false };
    case PASSWORD_UPDATE_FAILED:
      return { ...state, error: 'Update failed. ' + action.payload, confirmNewPassword: '', password: '', loading: false };
    case LOGOUT_USER:
      return { ...state, ...INITIAL_STATE };
    case REGISTER_PROPERTY_CHANGED:
        return { ...state, user: {...state.user, [action.payload.prop]: action.payload.value}};
    case USER_PASSWORD_FORGOT_SUCCESS:
        return { ...state, user: {...state.user, [action.payload.prop]: action.payload.value}, modalError: '', modalMessage: 'Recovery email sent. Please check your inbox.'};
    case USER_PASSWORD_FORGOT_FAIL:
        return { ...state, modalError: action.payload};
    default:
      return state;
  }
};
