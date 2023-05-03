import { call, put, takeLatest } from 'redux-saga/effects';
import { setAppDone } from './app.actions';

function* setAppStateFlow({ payload }) {
  try {
    yield put(setAppDone(payload));
  }
  catch(error) {
    console.trace('[APP ERROR]: ');
  }
}

export default function* () {
  yield takeLatest('APP_SET', setAppStateFlow);
}