import { all } from 'redux-saga/effects';
import app from './app/app.saga';

export default function* root() {
  yield all([
    app()
  ]);
}