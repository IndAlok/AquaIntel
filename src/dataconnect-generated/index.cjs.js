const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'aquaintel',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const addFavoriteStationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddFavoriteStation', inputVars);
}
addFavoriteStationRef.operationName = 'AddFavoriteStation';
exports.addFavoriteStationRef = addFavoriteStationRef;

exports.addFavoriteStation = function addFavoriteStation(dcOrVars, vars) {
  return executeMutation(addFavoriteStationRef(dcOrVars, vars));
};

const listDwlrStationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListDWLRStations');
}
listDwlrStationsRef.operationName = 'ListDWLRStations';
exports.listDwlrStationsRef = listDwlrStationsRef;

exports.listDwlrStations = function listDwlrStations(dc) {
  return executeQuery(listDwlrStationsRef(dc));
};

const getGroundwaterReadingsForStationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGroundwaterReadingsForStation', inputVars);
}
getGroundwaterReadingsForStationRef.operationName = 'GetGroundwaterReadingsForStation';
exports.getGroundwaterReadingsForStationRef = getGroundwaterReadingsForStationRef;

exports.getGroundwaterReadingsForStation = function getGroundwaterReadingsForStation(dcOrVars, vars) {
  return executeQuery(getGroundwaterReadingsForStationRef(dcOrVars, vars));
};

const updateUserPreferencesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserPreferences', inputVars);
}
updateUserPreferencesRef.operationName = 'UpdateUserPreferences';
exports.updateUserPreferencesRef = updateUserPreferencesRef;

exports.updateUserPreferences = function updateUserPreferences(dcOrVars, vars) {
  return executeMutation(updateUserPreferencesRef(dcOrVars, vars));
};
