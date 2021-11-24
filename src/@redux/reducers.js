import { combineReducers } from 'redux';
import auth from './auth/slice';
import modal from './modal/slice';
import loading from './loading/slice';
import reference from './referenceData/slice';
import config from './config/slice';
import users from './users/slice';
import applications from './applications/slice';
import vets from './vets/slice';
import stores from './stores/slice';
// import here
import programPhases from './programPhases/slice';

export default () =>
  combineReducers({
    auth,
    modal,
    config,
    reference,
    loading,
    // add reducer here
    users,
    stores,
    vets,
    applications,
    programPhases,
  });
