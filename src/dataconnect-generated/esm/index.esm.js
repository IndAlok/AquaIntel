import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'aquaintel',
  location: 'us-central1'
};

export const addFavoriteStationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddFavoriteStation', inputVars);
}
addFavoriteStationRef.operationName = 'AddFavoriteStation';

export function addFavoriteStation(dcOrVars, vars) {
  return executeMutation(addFavoriteStationRef(dcOrVars, vars));
}

export const listDwlrStationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListDWLRStations');
}
listDwlrStationsRef.operationName = 'ListDWLRStations';

export function listDwlrStations(dc) {
  return executeQuery(listDwlrStationsRef(dc));
}

export const getGroundwaterReadingsForStationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGroundwaterReadingsForStation', inputVars);
}
getGroundwaterReadingsForStationRef.operationName = 'GetGroundwaterReadingsForStation';

export function getGroundwaterReadingsForStation(dcOrVars, vars) {
  return executeQuery(getGroundwaterReadingsForStationRef(dcOrVars, vars));
}

export const updateUserPreferencesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserPreferences', inputVars);
}
updateUserPreferencesRef.operationName = 'UpdateUserPreferences';

export function updateUserPreferences(dcOrVars, vars) {
  return executeMutation(updateUserPreferencesRef(dcOrVars, vars));
}

