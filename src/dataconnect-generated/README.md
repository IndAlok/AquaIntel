# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListDWLRStations*](#listdwlrstations)
  - [*GetGroundwaterReadingsForStation*](#getgroundwaterreadingsforstation)
- [**Mutations**](#mutations)
  - [*AddFavoriteStation*](#addfavoritestation)
  - [*UpdateUserPreferences*](#updateuserpreferences)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListDWLRStations
You can execute the `ListDWLRStations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listDwlrStations(): QueryPromise<ListDwlrStationsData, undefined>;

interface ListDwlrStationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDwlrStationsData, undefined>;
}
export const listDwlrStationsRef: ListDwlrStationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listDwlrStations(dc: DataConnect): QueryPromise<ListDwlrStationsData, undefined>;

interface ListDwlrStationsRef {
  ...
  (dc: DataConnect): QueryRef<ListDwlrStationsData, undefined>;
}
export const listDwlrStationsRef: ListDwlrStationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listDwlrStationsRef:
```typescript
const name = listDwlrStationsRef.operationName;
console.log(name);
```

### Variables
The `ListDWLRStations` query has no variables.
### Return Type
Recall that executing the `ListDWLRStations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListDwlrStationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListDwlrStationsData {
  dWLRStations: ({
    id: UUIDString;
    name: string;
    latitude: number;
    longitude: number;
  } & DWLRStation_Key)[];
}
```
### Using `ListDWLRStations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listDwlrStations } from '@dataconnect/generated';


// Call the `listDwlrStations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listDwlrStations();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listDwlrStations(dataConnect);

console.log(data.dWLRStations);

// Or, you can use the `Promise` API.
listDwlrStations().then((response) => {
  const data = response.data;
  console.log(data.dWLRStations);
});
```

### Using `ListDWLRStations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listDwlrStationsRef } from '@dataconnect/generated';


// Call the `listDwlrStationsRef()` function to get a reference to the query.
const ref = listDwlrStationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listDwlrStationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.dWLRStations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.dWLRStations);
});
```

## GetGroundwaterReadingsForStation
You can execute the `GetGroundwaterReadingsForStation` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getGroundwaterReadingsForStation(vars: GetGroundwaterReadingsForStationVariables): QueryPromise<GetGroundwaterReadingsForStationData, GetGroundwaterReadingsForStationVariables>;

interface GetGroundwaterReadingsForStationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGroundwaterReadingsForStationVariables): QueryRef<GetGroundwaterReadingsForStationData, GetGroundwaterReadingsForStationVariables>;
}
export const getGroundwaterReadingsForStationRef: GetGroundwaterReadingsForStationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getGroundwaterReadingsForStation(dc: DataConnect, vars: GetGroundwaterReadingsForStationVariables): QueryPromise<GetGroundwaterReadingsForStationData, GetGroundwaterReadingsForStationVariables>;

interface GetGroundwaterReadingsForStationRef {
  ...
  (dc: DataConnect, vars: GetGroundwaterReadingsForStationVariables): QueryRef<GetGroundwaterReadingsForStationData, GetGroundwaterReadingsForStationVariables>;
}
export const getGroundwaterReadingsForStationRef: GetGroundwaterReadingsForStationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getGroundwaterReadingsForStationRef:
```typescript
const name = getGroundwaterReadingsForStationRef.operationName;
console.log(name);
```

### Variables
The `GetGroundwaterReadingsForStation` query requires an argument of type `GetGroundwaterReadingsForStationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetGroundwaterReadingsForStationVariables {
  dwlrStationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetGroundwaterReadingsForStation` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetGroundwaterReadingsForStationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetGroundwaterReadingsForStationData {
  groundwaterReadings: ({
    id: UUIDString;
    timestamp: TimestampString;
    waterLevel: number;
  } & GroundwaterReading_Key)[];
}
```
### Using `GetGroundwaterReadingsForStation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getGroundwaterReadingsForStation, GetGroundwaterReadingsForStationVariables } from '@dataconnect/generated';

// The `GetGroundwaterReadingsForStation` query requires an argument of type `GetGroundwaterReadingsForStationVariables`:
const getGroundwaterReadingsForStationVars: GetGroundwaterReadingsForStationVariables = {
  dwlrStationId: ..., 
};

// Call the `getGroundwaterReadingsForStation()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getGroundwaterReadingsForStation(getGroundwaterReadingsForStationVars);
// Variables can be defined inline as well.
const { data } = await getGroundwaterReadingsForStation({ dwlrStationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getGroundwaterReadingsForStation(dataConnect, getGroundwaterReadingsForStationVars);

console.log(data.groundwaterReadings);

// Or, you can use the `Promise` API.
getGroundwaterReadingsForStation(getGroundwaterReadingsForStationVars).then((response) => {
  const data = response.data;
  console.log(data.groundwaterReadings);
});
```

### Using `GetGroundwaterReadingsForStation`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getGroundwaterReadingsForStationRef, GetGroundwaterReadingsForStationVariables } from '@dataconnect/generated';

// The `GetGroundwaterReadingsForStation` query requires an argument of type `GetGroundwaterReadingsForStationVariables`:
const getGroundwaterReadingsForStationVars: GetGroundwaterReadingsForStationVariables = {
  dwlrStationId: ..., 
};

// Call the `getGroundwaterReadingsForStationRef()` function to get a reference to the query.
const ref = getGroundwaterReadingsForStationRef(getGroundwaterReadingsForStationVars);
// Variables can be defined inline as well.
const ref = getGroundwaterReadingsForStationRef({ dwlrStationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getGroundwaterReadingsForStationRef(dataConnect, getGroundwaterReadingsForStationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.groundwaterReadings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.groundwaterReadings);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddFavoriteStation
You can execute the `AddFavoriteStation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addFavoriteStation(vars: AddFavoriteStationVariables): MutationPromise<AddFavoriteStationData, AddFavoriteStationVariables>;

interface AddFavoriteStationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddFavoriteStationVariables): MutationRef<AddFavoriteStationData, AddFavoriteStationVariables>;
}
export const addFavoriteStationRef: AddFavoriteStationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addFavoriteStation(dc: DataConnect, vars: AddFavoriteStationVariables): MutationPromise<AddFavoriteStationData, AddFavoriteStationVariables>;

interface AddFavoriteStationRef {
  ...
  (dc: DataConnect, vars: AddFavoriteStationVariables): MutationRef<AddFavoriteStationData, AddFavoriteStationVariables>;
}
export const addFavoriteStationRef: AddFavoriteStationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addFavoriteStationRef:
```typescript
const name = addFavoriteStationRef.operationName;
console.log(name);
```

### Variables
The `AddFavoriteStation` mutation requires an argument of type `AddFavoriteStationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddFavoriteStationVariables {
  userId: UUIDString;
  dwlrStationId: UUIDString;
}
```
### Return Type
Recall that executing the `AddFavoriteStation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddFavoriteStationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddFavoriteStationData {
  favoriteStation_insert: FavoriteStation_Key;
}
```
### Using `AddFavoriteStation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addFavoriteStation, AddFavoriteStationVariables } from '@dataconnect/generated';

// The `AddFavoriteStation` mutation requires an argument of type `AddFavoriteStationVariables`:
const addFavoriteStationVars: AddFavoriteStationVariables = {
  userId: ..., 
  dwlrStationId: ..., 
};

// Call the `addFavoriteStation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addFavoriteStation(addFavoriteStationVars);
// Variables can be defined inline as well.
const { data } = await addFavoriteStation({ userId: ..., dwlrStationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addFavoriteStation(dataConnect, addFavoriteStationVars);

console.log(data.favoriteStation_insert);

// Or, you can use the `Promise` API.
addFavoriteStation(addFavoriteStationVars).then((response) => {
  const data = response.data;
  console.log(data.favoriteStation_insert);
});
```

### Using `AddFavoriteStation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addFavoriteStationRef, AddFavoriteStationVariables } from '@dataconnect/generated';

// The `AddFavoriteStation` mutation requires an argument of type `AddFavoriteStationVariables`:
const addFavoriteStationVars: AddFavoriteStationVariables = {
  userId: ..., 
  dwlrStationId: ..., 
};

// Call the `addFavoriteStationRef()` function to get a reference to the mutation.
const ref = addFavoriteStationRef(addFavoriteStationVars);
// Variables can be defined inline as well.
const ref = addFavoriteStationRef({ userId: ..., dwlrStationId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addFavoriteStationRef(dataConnect, addFavoriteStationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.favoriteStation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.favoriteStation_insert);
});
```

## UpdateUserPreferences
You can execute the `UpdateUserPreferences` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserPreferences(vars: UpdateUserPreferencesVariables): MutationPromise<UpdateUserPreferencesData, UpdateUserPreferencesVariables>;

interface UpdateUserPreferencesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserPreferencesVariables): MutationRef<UpdateUserPreferencesData, UpdateUserPreferencesVariables>;
}
export const updateUserPreferencesRef: UpdateUserPreferencesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserPreferences(dc: DataConnect, vars: UpdateUserPreferencesVariables): MutationPromise<UpdateUserPreferencesData, UpdateUserPreferencesVariables>;

interface UpdateUserPreferencesRef {
  ...
  (dc: DataConnect, vars: UpdateUserPreferencesVariables): MutationRef<UpdateUserPreferencesData, UpdateUserPreferencesVariables>;
}
export const updateUserPreferencesRef: UpdateUserPreferencesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserPreferencesRef:
```typescript
const name = updateUserPreferencesRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserPreferences` mutation requires an argument of type `UpdateUserPreferencesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserPreferencesVariables {
  id: UUIDString;
  preferences?: string | null;
}
```
### Return Type
Recall that executing the `UpdateUserPreferences` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserPreferencesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserPreferencesData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserPreferences`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserPreferences, UpdateUserPreferencesVariables } from '@dataconnect/generated';

// The `UpdateUserPreferences` mutation requires an argument of type `UpdateUserPreferencesVariables`:
const updateUserPreferencesVars: UpdateUserPreferencesVariables = {
  id: ..., 
  preferences: ..., // optional
};

// Call the `updateUserPreferences()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserPreferences(updateUserPreferencesVars);
// Variables can be defined inline as well.
const { data } = await updateUserPreferences({ id: ..., preferences: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserPreferences(dataConnect, updateUserPreferencesVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserPreferences(updateUserPreferencesVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserPreferences`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserPreferencesRef, UpdateUserPreferencesVariables } from '@dataconnect/generated';

// The `UpdateUserPreferences` mutation requires an argument of type `UpdateUserPreferencesVariables`:
const updateUserPreferencesVars: UpdateUserPreferencesVariables = {
  id: ..., 
  preferences: ..., // optional
};

// Call the `updateUserPreferencesRef()` function to get a reference to the mutation.
const ref = updateUserPreferencesRef(updateUserPreferencesVars);
// Variables can be defined inline as well.
const ref = updateUserPreferencesRef({ id: ..., preferences: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserPreferencesRef(dataConnect, updateUserPreferencesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

