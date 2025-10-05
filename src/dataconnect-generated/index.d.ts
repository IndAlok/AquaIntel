import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddFavoriteStationData {
  favoriteStation_insert: FavoriteStation_Key;
}

export interface AddFavoriteStationVariables {
  userId: UUIDString;
  dwlrStationId: UUIDString;
}

export interface DWLRStation_Key {
  id: UUIDString;
  __typename?: 'DWLRStation_Key';
}

export interface FavoriteStation_Key {
  userId: UUIDString;
  dwlrStationId: UUIDString;
  __typename?: 'FavoriteStation_Key';
}

export interface GetGroundwaterReadingsForStationData {
  groundwaterReadings: ({
    id: UUIDString;
    timestamp: TimestampString;
    waterLevel: number;
  } & GroundwaterReading_Key)[];
}

export interface GetGroundwaterReadingsForStationVariables {
  dwlrStationId: UUIDString;
}

export interface GroundwaterReading_Key {
  id: UUIDString;
  __typename?: 'GroundwaterReading_Key';
}

export interface ListDwlrStationsData {
  dWLRStations: ({
    id: UUIDString;
    name: string;
    latitude: number;
    longitude: number;
  } & DWLRStation_Key)[];
}

export interface SubscriptionType_Key {
  id: UUIDString;
  __typename?: 'SubscriptionType_Key';
}

export interface UpdateUserPreferencesData {
  user_update?: User_Key | null;
}

export interface UpdateUserPreferencesVariables {
  id: UUIDString;
  preferences?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface AddFavoriteStationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddFavoriteStationVariables): MutationRef<AddFavoriteStationData, AddFavoriteStationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddFavoriteStationVariables): MutationRef<AddFavoriteStationData, AddFavoriteStationVariables>;
  operationName: string;
}
export const addFavoriteStationRef: AddFavoriteStationRef;

export function addFavoriteStation(vars: AddFavoriteStationVariables): MutationPromise<AddFavoriteStationData, AddFavoriteStationVariables>;
export function addFavoriteStation(dc: DataConnect, vars: AddFavoriteStationVariables): MutationPromise<AddFavoriteStationData, AddFavoriteStationVariables>;

interface ListDwlrStationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDwlrStationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListDwlrStationsData, undefined>;
  operationName: string;
}
export const listDwlrStationsRef: ListDwlrStationsRef;

export function listDwlrStations(): QueryPromise<ListDwlrStationsData, undefined>;
export function listDwlrStations(dc: DataConnect): QueryPromise<ListDwlrStationsData, undefined>;

interface GetGroundwaterReadingsForStationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGroundwaterReadingsForStationVariables): QueryRef<GetGroundwaterReadingsForStationData, GetGroundwaterReadingsForStationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetGroundwaterReadingsForStationVariables): QueryRef<GetGroundwaterReadingsForStationData, GetGroundwaterReadingsForStationVariables>;
  operationName: string;
}
export const getGroundwaterReadingsForStationRef: GetGroundwaterReadingsForStationRef;

export function getGroundwaterReadingsForStation(vars: GetGroundwaterReadingsForStationVariables): QueryPromise<GetGroundwaterReadingsForStationData, GetGroundwaterReadingsForStationVariables>;
export function getGroundwaterReadingsForStation(dc: DataConnect, vars: GetGroundwaterReadingsForStationVariables): QueryPromise<GetGroundwaterReadingsForStationData, GetGroundwaterReadingsForStationVariables>;

interface UpdateUserPreferencesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserPreferencesVariables): MutationRef<UpdateUserPreferencesData, UpdateUserPreferencesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserPreferencesVariables): MutationRef<UpdateUserPreferencesData, UpdateUserPreferencesVariables>;
  operationName: string;
}
export const updateUserPreferencesRef: UpdateUserPreferencesRef;

export function updateUserPreferences(vars: UpdateUserPreferencesVariables): MutationPromise<UpdateUserPreferencesData, UpdateUserPreferencesVariables>;
export function updateUserPreferences(dc: DataConnect, vars: UpdateUserPreferencesVariables): MutationPromise<UpdateUserPreferencesData, UpdateUserPreferencesVariables>;

