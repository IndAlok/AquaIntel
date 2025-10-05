import { AddFavoriteStationData, AddFavoriteStationVariables, ListDwlrStationsData, GetGroundwaterReadingsForStationData, GetGroundwaterReadingsForStationVariables, UpdateUserPreferencesData, UpdateUserPreferencesVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddFavoriteStation(options?: useDataConnectMutationOptions<AddFavoriteStationData, FirebaseError, AddFavoriteStationVariables>): UseDataConnectMutationResult<AddFavoriteStationData, AddFavoriteStationVariables>;
export function useAddFavoriteStation(dc: DataConnect, options?: useDataConnectMutationOptions<AddFavoriteStationData, FirebaseError, AddFavoriteStationVariables>): UseDataConnectMutationResult<AddFavoriteStationData, AddFavoriteStationVariables>;

export function useListDwlrStations(options?: useDataConnectQueryOptions<ListDwlrStationsData>): UseDataConnectQueryResult<ListDwlrStationsData, undefined>;
export function useListDwlrStations(dc: DataConnect, options?: useDataConnectQueryOptions<ListDwlrStationsData>): UseDataConnectQueryResult<ListDwlrStationsData, undefined>;

export function useGetGroundwaterReadingsForStation(vars: GetGroundwaterReadingsForStationVariables, options?: useDataConnectQueryOptions<GetGroundwaterReadingsForStationData>): UseDataConnectQueryResult<GetGroundwaterReadingsForStationData, GetGroundwaterReadingsForStationVariables>;
export function useGetGroundwaterReadingsForStation(dc: DataConnect, vars: GetGroundwaterReadingsForStationVariables, options?: useDataConnectQueryOptions<GetGroundwaterReadingsForStationData>): UseDataConnectQueryResult<GetGroundwaterReadingsForStationData, GetGroundwaterReadingsForStationVariables>;

export function useUpdateUserPreferences(options?: useDataConnectMutationOptions<UpdateUserPreferencesData, FirebaseError, UpdateUserPreferencesVariables>): UseDataConnectMutationResult<UpdateUserPreferencesData, UpdateUserPreferencesVariables>;
export function useUpdateUserPreferences(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserPreferencesData, FirebaseError, UpdateUserPreferencesVariables>): UseDataConnectMutationResult<UpdateUserPreferencesData, UpdateUserPreferencesVariables>;
