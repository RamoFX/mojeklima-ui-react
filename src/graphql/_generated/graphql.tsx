import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar type represents time data, represented as an ISO-8601 encoded UTC date string. */
  DateTime: any;
};

export type Account = {
  __typename?: 'Account';
  avatarUrl: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Maybe<Scalars['Int']>;
  locations: Array<Location>;
  name: Scalars['String'];
  pushSubscriptions: Array<PushSubscription>;
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export enum AccountRoleEnum {
  Admin = 'ADMIN',
  System = 'SYSTEM',
  User = 'USER'
}

export type Alert = {
  __typename?: 'Alert';
  comparator: Scalars['String'];
  createdAt: Scalars['DateTime'];
  criteria: Scalars['String'];
  id: Maybe<Scalars['Int']>;
  isEnabled: Scalars['Boolean'];
  location: Location;
  message: Scalars['String'];
  notifications: Array<Notification>;
  updateFrequency: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['Float'];
};

export enum ComparatorEnum {
  EqualTo = 'EQUAL_TO',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqualTo = 'GREATER_THAN_OR_EQUAL_TO',
  LessThan = 'LESS_THAN',
  LessThanOrEqualTo = 'LESS_THAN_OR_EQUAL_TO'
}

export type CreateAccountInput = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type CreateAlertInput = {
  comparator: ComparatorEnum;
  criteria: CriteriaEnum;
  isEnabled: Scalars['Boolean'];
  message: Scalars['String'];
  updateFrequency: Scalars['Int'];
  value: Scalars['Float'];
};

export enum CriteriaEnum {
  Humidity = 'HUMIDITY',
  Pressure = 'PRESSURE',
  Temperature = 'TEMPERATURE',
  WindSpeed = 'WIND_SPEED'
}

export type Location = {
  __typename?: 'Location';
  account: Account;
  alerts: Array<Alert>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Maybe<Scalars['Int']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeRole: Account;
  createAlert: Alert;
  createLocation: Location;
  deleteAccount: Scalars['String'];
  deleteAlert: Alert;
  deleteLocation: Location;
  login: Scalars['String'];
  notify: Notification;
  register: Scalars['String'];
  renewToken: Scalars['String'];
  resetPassword: Scalars['String'];
  seenAll: Scalars['String'];
  subscribeForPushNotifications: PushSubscription;
  toggleAlert: Alert;
  updateAlert: Alert;
  updateAvatar: Account;
  updateEmail: Account;
  updateLocation: Location;
  updateName: Account;
  updatePassword: Account;
};


export type MutationChangeRoleArgs = {
  id: Scalars['Int'];
  role: AccountRoleEnum;
};


export type MutationCreateAlertArgs = {
  comparator: Scalars['String'];
  criteria: Scalars['String'];
  isEnabled: Scalars['Boolean'];
  locationId: Scalars['Int'];
  message: Scalars['String'];
  updateFrequency: Scalars['Int'];
  value: Scalars['Float'];
};


export type MutationCreateLocationArgs = {
  description: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
};


export type MutationDeleteAlertArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteLocationArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  remember: Scalars['Boolean'];
};


export type MutationNotifyArgs = {
  accountId: Scalars['Int'];
  alertId: Scalars['Int'];
};


export type MutationRegisterArgs = {
  account: CreateAccountInput;
};


export type MutationRenewTokenArgs = {
  remember: Scalars['Boolean'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationSubscribeForPushNotificationsArgs = {
  auth: Scalars['String'];
  endpoint: Scalars['String'];
  p256dh: Scalars['String'];
  userAgent: Scalars['String'];
};


export type MutationToggleAlertArgs = {
  id: Scalars['Int'];
  isEnabled: Scalars['Boolean'];
};


export type MutationUpdateAlertArgs = {
  comparator?: InputMaybe<Scalars['String']>;
  criteria?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  message?: InputMaybe<Scalars['String']>;
  updateFrequency?: InputMaybe<Scalars['Int']>;
  value?: InputMaybe<Scalars['Float']>;
};


export type MutationUpdateEmailArgs = {
  email: Scalars['String'];
};


export type MutationUpdateLocationArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateNameArgs = {
  name: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  password: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  alert: Alert;
  createdAt: Scalars['DateTime'];
  id: Maybe<Scalars['Int']>;
  seen: Scalars['Boolean'];
};

export type PushSubscription = {
  __typename?: 'PushSubscription';
  account: Account;
  auth: Scalars['String'];
  createdAt: Scalars['DateTime'];
  endpoint: Scalars['String'];
  id: Maybe<Scalars['Int']>;
  p256dh: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userAgent: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  alert: Alert;
  allAlerts: Array<Alert>;
  allAlertsCount: Scalars['Int'];
  allNotifications: Array<Notification>;
  hasUnseen: Scalars['Boolean'];
  location: Location;
  locationAlerts: Array<Alert>;
  locationAlertsCount: Scalars['Int'];
  locations: Array<Location>;
  locationsCount: Scalars['Int'];
  me: Account;
  suggestions: Array<Suggestion>;
  weather: Weather;
};


export type QueryAccountArgs = {
  id: Scalars['Int'];
};


export type QueryAlertArgs = {
  id: Scalars['Int'];
};


export type QueryLocationArgs = {
  id: Scalars['Int'];
};


export type QueryLocationAlertsArgs = {
  locationId: Scalars['Int'];
};


export type QueryLocationAlertsCountArgs = {
  locationId: Scalars['Int'];
};


export type QuerySuggestionsArgs = {
  query: Scalars['String'];
};


export type QueryWeatherArgs = {
  locationId: Scalars['Int'];
};

export type Suggestion = {
  __typename?: 'Suggestion';
  countryCode: Maybe<Scalars['String']>;
  formatted: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  region: Maybe<Scalars['String']>;
};

export type UpdateAccountInput = {
  email: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  password: InputMaybe<Scalars['String']>;
};

export type Weather = {
  __typename?: 'Weather';
  humidity: Scalars['Int'];
  pressure: Scalars['Int'];
  temperature: Scalars['Float'];
  windSpeed: Scalars['Float'];
};

export type CreateAlertMutationVariables = Exact<{
  locationId: Scalars['Int'];
  comparator: Scalars['String'];
  criteria: Scalars['String'];
  value: Scalars['Float'];
  updateFrequency: Scalars['Int'];
  message: Scalars['String'];
}>;


export type CreateAlertMutation = { __typename?: 'Mutation', createAlert: { __typename?: 'Alert', id: number | null, isEnabled: boolean, message: string, updateFrequency: number, criteria: string, comparator: string, value: number, createdAt: any, updatedAt: any } };

export type DeleteAlertMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteAlertMutation = { __typename?: 'Mutation', deleteAlert: { __typename?: 'Alert', id: number | null, isEnabled: boolean, message: string, updateFrequency: number, criteria: string, comparator: string, value: number, createdAt: any, updatedAt: any } };

export type ToggleAlertMutationVariables = Exact<{
  id: Scalars['Int'];
  isEnabled: Scalars['Boolean'];
}>;


export type ToggleAlertMutation = { __typename?: 'Mutation', toggleAlert: { __typename?: 'Alert', id: number | null, isEnabled: boolean, message: string, updateFrequency: number, criteria: string, comparator: string, value: number, createdAt: any, updatedAt: any } };

export type UpdateAlertMutationVariables = Exact<{
  id: Scalars['Int'];
  isEnabled: InputMaybe<Scalars['Boolean']>;
  updateFrequency: InputMaybe<Scalars['Int']>;
  message: InputMaybe<Scalars['String']>;
  value: InputMaybe<Scalars['Float']>;
  comparator: InputMaybe<Scalars['String']>;
  criteria: InputMaybe<Scalars['String']>;
}>;


export type UpdateAlertMutation = { __typename?: 'Mutation', updateAlert: { __typename?: 'Alert', id: number | null, isEnabled: boolean, message: string, updateFrequency: number, criteria: string, comparator: string, value: number, createdAt: any, updatedAt: any } };

export type AlertsQueryVariables = Exact<{
  locationId: Scalars['Int'];
}>;


export type AlertsQuery = { __typename?: 'Query', locationAlerts: Array<{ __typename?: 'Alert', id: number | null, isEnabled: boolean, message: string, criteria: string, comparator: string, value: number, updateFrequency: number, createdAt: any, updatedAt: any }> };

export type AllAlertsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAlertsQuery = { __typename?: 'Query', allAlerts: Array<{ __typename?: 'Alert', id: number | null, isEnabled: boolean, message: string, criteria: string, comparator: string, value: number, updateFrequency: number, createdAt: any, updatedAt: any }> };

export type AllAlertsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAlertsCountQuery = { __typename?: 'Query', allAlertsCount: number };

export type CreateLocationMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
}>;


export type CreateLocationMutation = { __typename?: 'Mutation', createLocation: { __typename?: 'Location', id: number | null, name: string, description: string, latitude: number, longitude: number, createdAt: any, updatedAt: any } };

export type DeleteLocationMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteLocationMutation = { __typename?: 'Mutation', deleteLocation: { __typename?: 'Location', id: number | null, name: string, description: string, latitude: number, longitude: number, createdAt: any, updatedAt: any } };

export type UpdateLocationMutationVariables = Exact<{
  id: Scalars['Int'];
  name: InputMaybe<Scalars['String']>;
  description: InputMaybe<Scalars['String']>;
  latitude: InputMaybe<Scalars['Float']>;
  longitude: InputMaybe<Scalars['Float']>;
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', updateLocation: { __typename?: 'Location', id: number | null, name: string, description: string, latitude: number, longitude: number, createdAt: any, updatedAt: any } };

export type LocationQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type LocationQuery = { __typename?: 'Query', location: { __typename?: 'Location', id: number | null, name: string, description: string, latitude: number, longitude: number, createdAt: any, updatedAt: any, alerts: Array<{ __typename?: 'Alert', id: number | null, isEnabled: boolean, message: string, updateFrequency: number, criteria: string, comparator: string, value: number, createdAt: any, updatedAt: any }> } };

export type LocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationsQuery = { __typename?: 'Query', locations: Array<{ __typename?: 'Location', id: number | null, name: string, description: string, latitude: number, longitude: number, createdAt: any, updatedAt: any }> };

export type NotifyMutationVariables = Exact<{
  accountId: Scalars['Int'];
  alertId: Scalars['Int'];
}>;


export type NotifyMutation = { __typename?: 'Mutation', notify: { __typename?: 'Notification', id: number | null, seen: boolean, createdAt: any } };

export type SeenAllMutationVariables = Exact<{ [key: string]: never; }>;


export type SeenAllMutation = { __typename?: 'Mutation', seenAll: string };

export type AllNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllNotificationsQuery = { __typename?: 'Query', allNotifications: Array<{ __typename?: 'Notification', id: number | null, seen: boolean, createdAt: any, alert: { __typename?: 'Alert', message: string, criteria: string, location: { __typename?: 'Location', name: string } } }> };

export type HasUnseenQueryVariables = Exact<{ [key: string]: never; }>;


export type HasUnseenQuery = { __typename?: 'Query', hasUnseen: boolean };

export type SuggestionsQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SuggestionsQuery = { __typename?: 'Query', suggestions: Array<{ __typename?: 'Suggestion', latitude: number, longitude: number, formatted: string, countryCode: string | null, region: string | null }> };

export type WeatherQueryVariables = Exact<{
  locationId: Scalars['Int'];
}>;


export type WeatherQuery = { __typename?: 'Query', weather: { __typename?: 'Weather', temperature: number, humidity: number, pressure: number, windSpeed: number } };

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: string };

export type RenewTokenMutationVariables = Exact<{
  remember: Scalars['Boolean'];
}>;


export type RenewTokenMutation = { __typename?: 'Mutation', renewToken: string };

export type UpdateAvatarMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateAvatarMutation = { __typename?: 'Mutation', updateAvatar: { __typename?: 'Account', role: string, name: string, avatarUrl: string | null, email: string, createdAt: any, updatedAt: any } };

export type UpdateEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type UpdateEmailMutation = { __typename?: 'Mutation', updateEmail: { __typename?: 'Account', role: string, name: string, avatarUrl: string | null, email: string, createdAt: any, updatedAt: any } };

export type UpdateNameMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type UpdateNameMutation = { __typename?: 'Mutation', updateName: { __typename?: 'Account', role: string, name: string, avatarUrl: string | null, email: string, createdAt: any, updatedAt: any } };

export type UpdatePasswordMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'Account', role: string, name: string, avatarUrl: string | null, email: string, createdAt: any, updatedAt: any } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Account', role: string, name: string, avatarUrl: string | null, email: string, createdAt: any, updatedAt: any } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  remember: Scalars['Boolean'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: string };

export type SubscribeForPushNotificationsMutationVariables = Exact<{
  userAgent: Scalars['String'];
  endpoint: Scalars['String'];
  p256dh: Scalars['String'];
  auth: Scalars['String'];
}>;


export type SubscribeForPushNotificationsMutation = { __typename?: 'Mutation', subscribeForPushNotifications: { __typename?: 'PushSubscription', id: number | null, createdAt: any, updatedAt: any } };


export const CreateAlertDocument = gql`
    mutation CreateAlert($locationId: Int!, $comparator: String!, $criteria: String!, $value: Float!, $updateFrequency: Int!, $message: String!) {
  createAlert(
    locationId: $locationId
    isEnabled: true
    comparator: $comparator
    criteria: $criteria
    value: $value
    updateFrequency: $updateFrequency
    message: $message
  ) {
    id
    isEnabled
    message
    updateFrequency
    criteria
    comparator
    value
    createdAt
    updatedAt
  }
}
    `;
export type CreateAlertMutationFn = Apollo.MutationFunction<CreateAlertMutation, CreateAlertMutationVariables>;

/**
 * __useCreateAlertMutation__
 *
 * To run a mutation, you first call `useCreateAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAlertMutation, { data, loading, error }] = useCreateAlertMutation({
 *   variables: {
 *      locationId: // value for 'locationId'
 *      comparator: // value for 'comparator'
 *      criteria: // value for 'criteria'
 *      value: // value for 'value'
 *      updateFrequency: // value for 'updateFrequency'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useCreateAlertMutation(baseOptions?: Apollo.MutationHookOptions<CreateAlertMutation, CreateAlertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAlertMutation, CreateAlertMutationVariables>(CreateAlertDocument, options);
      }
export type CreateAlertMutationHookResult = ReturnType<typeof useCreateAlertMutation>;
export type CreateAlertMutationResult = Apollo.MutationResult<CreateAlertMutation>;
export type CreateAlertMutationOptions = Apollo.BaseMutationOptions<CreateAlertMutation, CreateAlertMutationVariables>;
export const DeleteAlertDocument = gql`
    mutation DeleteAlert($id: Int!) {
  deleteAlert(id: $id) {
    id
    isEnabled
    message
    updateFrequency
    criteria
    comparator
    value
    createdAt
    updatedAt
  }
}
    `;
export type DeleteAlertMutationFn = Apollo.MutationFunction<DeleteAlertMutation, DeleteAlertMutationVariables>;

/**
 * __useDeleteAlertMutation__
 *
 * To run a mutation, you first call `useDeleteAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAlertMutation, { data, loading, error }] = useDeleteAlertMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAlertMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAlertMutation, DeleteAlertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAlertMutation, DeleteAlertMutationVariables>(DeleteAlertDocument, options);
      }
export type DeleteAlertMutationHookResult = ReturnType<typeof useDeleteAlertMutation>;
export type DeleteAlertMutationResult = Apollo.MutationResult<DeleteAlertMutation>;
export type DeleteAlertMutationOptions = Apollo.BaseMutationOptions<DeleteAlertMutation, DeleteAlertMutationVariables>;
export const ToggleAlertDocument = gql`
    mutation ToggleAlert($id: Int!, $isEnabled: Boolean!) {
  toggleAlert(id: $id, isEnabled: $isEnabled) {
    id
    isEnabled
    message
    updateFrequency
    criteria
    comparator
    value
    createdAt
    updatedAt
  }
}
    `;
export type ToggleAlertMutationFn = Apollo.MutationFunction<ToggleAlertMutation, ToggleAlertMutationVariables>;

/**
 * __useToggleAlertMutation__
 *
 * To run a mutation, you first call `useToggleAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleAlertMutation, { data, loading, error }] = useToggleAlertMutation({
 *   variables: {
 *      id: // value for 'id'
 *      isEnabled: // value for 'isEnabled'
 *   },
 * });
 */
export function useToggleAlertMutation(baseOptions?: Apollo.MutationHookOptions<ToggleAlertMutation, ToggleAlertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleAlertMutation, ToggleAlertMutationVariables>(ToggleAlertDocument, options);
      }
export type ToggleAlertMutationHookResult = ReturnType<typeof useToggleAlertMutation>;
export type ToggleAlertMutationResult = Apollo.MutationResult<ToggleAlertMutation>;
export type ToggleAlertMutationOptions = Apollo.BaseMutationOptions<ToggleAlertMutation, ToggleAlertMutationVariables>;
export const UpdateAlertDocument = gql`
    mutation UpdateAlert($id: Int!, $isEnabled: Boolean, $updateFrequency: Int, $message: String, $value: Float, $comparator: String, $criteria: String) {
  updateAlert(
    id: $id
    isEnabled: $isEnabled
    updateFrequency: $updateFrequency
    message: $message
    value: $value
    comparator: $comparator
    criteria: $criteria
  ) {
    id
    isEnabled
    message
    updateFrequency
    criteria
    comparator
    value
    createdAt
    updatedAt
  }
}
    `;
export type UpdateAlertMutationFn = Apollo.MutationFunction<UpdateAlertMutation, UpdateAlertMutationVariables>;

/**
 * __useUpdateAlertMutation__
 *
 * To run a mutation, you first call `useUpdateAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAlertMutation, { data, loading, error }] = useUpdateAlertMutation({
 *   variables: {
 *      id: // value for 'id'
 *      isEnabled: // value for 'isEnabled'
 *      updateFrequency: // value for 'updateFrequency'
 *      message: // value for 'message'
 *      value: // value for 'value'
 *      comparator: // value for 'comparator'
 *      criteria: // value for 'criteria'
 *   },
 * });
 */
export function useUpdateAlertMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAlertMutation, UpdateAlertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAlertMutation, UpdateAlertMutationVariables>(UpdateAlertDocument, options);
      }
export type UpdateAlertMutationHookResult = ReturnType<typeof useUpdateAlertMutation>;
export type UpdateAlertMutationResult = Apollo.MutationResult<UpdateAlertMutation>;
export type UpdateAlertMutationOptions = Apollo.BaseMutationOptions<UpdateAlertMutation, UpdateAlertMutationVariables>;
export const AlertsDocument = gql`
    query Alerts($locationId: Int!) {
  locationAlerts(locationId: $locationId) {
    id
    isEnabled
    message
    criteria
    comparator
    value
    updateFrequency
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useAlertsQuery__
 *
 * To run a query within a React component, call `useAlertsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlertsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlertsQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useAlertsQuery(baseOptions: Apollo.QueryHookOptions<AlertsQuery, AlertsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AlertsQuery, AlertsQueryVariables>(AlertsDocument, options);
      }
export function useAlertsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AlertsQuery, AlertsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AlertsQuery, AlertsQueryVariables>(AlertsDocument, options);
        }
export type AlertsQueryHookResult = ReturnType<typeof useAlertsQuery>;
export type AlertsLazyQueryHookResult = ReturnType<typeof useAlertsLazyQuery>;
export type AlertsQueryResult = Apollo.QueryResult<AlertsQuery, AlertsQueryVariables>;
export const AllAlertsDocument = gql`
    query AllAlerts {
  allAlerts {
    id
    isEnabled
    message
    criteria
    comparator
    value
    updateFrequency
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useAllAlertsQuery__
 *
 * To run a query within a React component, call `useAllAlertsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAlertsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllAlertsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllAlertsQuery(baseOptions?: Apollo.QueryHookOptions<AllAlertsQuery, AllAlertsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllAlertsQuery, AllAlertsQueryVariables>(AllAlertsDocument, options);
      }
export function useAllAlertsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllAlertsQuery, AllAlertsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllAlertsQuery, AllAlertsQueryVariables>(AllAlertsDocument, options);
        }
export type AllAlertsQueryHookResult = ReturnType<typeof useAllAlertsQuery>;
export type AllAlertsLazyQueryHookResult = ReturnType<typeof useAllAlertsLazyQuery>;
export type AllAlertsQueryResult = Apollo.QueryResult<AllAlertsQuery, AllAlertsQueryVariables>;
export const AllAlertsCountDocument = gql`
    query AllAlertsCount {
  allAlertsCount
}
    `;

/**
 * __useAllAlertsCountQuery__
 *
 * To run a query within a React component, call `useAllAlertsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAlertsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllAlertsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllAlertsCountQuery(baseOptions?: Apollo.QueryHookOptions<AllAlertsCountQuery, AllAlertsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllAlertsCountQuery, AllAlertsCountQueryVariables>(AllAlertsCountDocument, options);
      }
export function useAllAlertsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllAlertsCountQuery, AllAlertsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllAlertsCountQuery, AllAlertsCountQueryVariables>(AllAlertsCountDocument, options);
        }
export type AllAlertsCountQueryHookResult = ReturnType<typeof useAllAlertsCountQuery>;
export type AllAlertsCountLazyQueryHookResult = ReturnType<typeof useAllAlertsCountLazyQuery>;
export type AllAlertsCountQueryResult = Apollo.QueryResult<AllAlertsCountQuery, AllAlertsCountQueryVariables>;
export const CreateLocationDocument = gql`
    mutation CreateLocation($name: String!, $description: String!, $latitude: Float!, $longitude: Float!) {
  createLocation(
    name: $name
    description: $description
    latitude: $latitude
    longitude: $longitude
  ) {
    id
    name
    description
    latitude
    longitude
    createdAt
    updatedAt
  }
}
    `;
export type CreateLocationMutationFn = Apollo.MutationFunction<CreateLocationMutation, CreateLocationMutationVariables>;

/**
 * __useCreateLocationMutation__
 *
 * To run a mutation, you first call `useCreateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLocationMutation, { data, loading, error }] = useCreateLocationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *   },
 * });
 */
export function useCreateLocationMutation(baseOptions?: Apollo.MutationHookOptions<CreateLocationMutation, CreateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLocationMutation, CreateLocationMutationVariables>(CreateLocationDocument, options);
      }
export type CreateLocationMutationHookResult = ReturnType<typeof useCreateLocationMutation>;
export type CreateLocationMutationResult = Apollo.MutationResult<CreateLocationMutation>;
export type CreateLocationMutationOptions = Apollo.BaseMutationOptions<CreateLocationMutation, CreateLocationMutationVariables>;
export const DeleteLocationDocument = gql`
    mutation DeleteLocation($id: Int!) {
  deleteLocation(id: $id) {
    id
    name
    description
    latitude
    longitude
    createdAt
    updatedAt
  }
}
    `;
export type DeleteLocationMutationFn = Apollo.MutationFunction<DeleteLocationMutation, DeleteLocationMutationVariables>;

/**
 * __useDeleteLocationMutation__
 *
 * To run a mutation, you first call `useDeleteLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLocationMutation, { data, loading, error }] = useDeleteLocationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLocationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLocationMutation, DeleteLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLocationMutation, DeleteLocationMutationVariables>(DeleteLocationDocument, options);
      }
export type DeleteLocationMutationHookResult = ReturnType<typeof useDeleteLocationMutation>;
export type DeleteLocationMutationResult = Apollo.MutationResult<DeleteLocationMutation>;
export type DeleteLocationMutationOptions = Apollo.BaseMutationOptions<DeleteLocationMutation, DeleteLocationMutationVariables>;
export const UpdateLocationDocument = gql`
    mutation UpdateLocation($id: Int!, $name: String, $description: String, $latitude: Float, $longitude: Float) {
  updateLocation(
    id: $id
    name: $name
    description: $description
    latitude: $latitude
    longitude: $longitude
  ) {
    id
    name
    description
    latitude
    longitude
    createdAt
    updatedAt
  }
}
    `;
export type UpdateLocationMutationFn = Apollo.MutationFunction<UpdateLocationMutation, UpdateLocationMutationVariables>;

/**
 * __useUpdateLocationMutation__
 *
 * To run a mutation, you first call `useUpdateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLocationMutation, { data, loading, error }] = useUpdateLocationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *   },
 * });
 */
export function useUpdateLocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLocationMutation, UpdateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLocationMutation, UpdateLocationMutationVariables>(UpdateLocationDocument, options);
      }
export type UpdateLocationMutationHookResult = ReturnType<typeof useUpdateLocationMutation>;
export type UpdateLocationMutationResult = Apollo.MutationResult<UpdateLocationMutation>;
export type UpdateLocationMutationOptions = Apollo.BaseMutationOptions<UpdateLocationMutation, UpdateLocationMutationVariables>;
export const LocationDocument = gql`
    query Location($id: Int!) {
  location(id: $id) {
    id
    name
    description
    latitude
    longitude
    createdAt
    updatedAt
    alerts {
      id
      isEnabled
      message
      updateFrequency
      criteria
      comparator
      value
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useLocationQuery__
 *
 * To run a query within a React component, call `useLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLocationQuery(baseOptions: Apollo.QueryHookOptions<LocationQuery, LocationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LocationQuery, LocationQueryVariables>(LocationDocument, options);
      }
export function useLocationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LocationQuery, LocationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LocationQuery, LocationQueryVariables>(LocationDocument, options);
        }
export type LocationQueryHookResult = ReturnType<typeof useLocationQuery>;
export type LocationLazyQueryHookResult = ReturnType<typeof useLocationLazyQuery>;
export type LocationQueryResult = Apollo.QueryResult<LocationQuery, LocationQueryVariables>;
export const LocationsDocument = gql`
    query Locations {
  locations {
    id
    name
    description
    latitude
    longitude
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useLocationsQuery__
 *
 * To run a query within a React component, call `useLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLocationsQuery(baseOptions?: Apollo.QueryHookOptions<LocationsQuery, LocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LocationsQuery, LocationsQueryVariables>(LocationsDocument, options);
      }
export function useLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LocationsQuery, LocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LocationsQuery, LocationsQueryVariables>(LocationsDocument, options);
        }
export type LocationsQueryHookResult = ReturnType<typeof useLocationsQuery>;
export type LocationsLazyQueryHookResult = ReturnType<typeof useLocationsLazyQuery>;
export type LocationsQueryResult = Apollo.QueryResult<LocationsQuery, LocationsQueryVariables>;
export const NotifyDocument = gql`
    mutation Notify($accountId: Int!, $alertId: Int!) {
  notify(accountId: $accountId, alertId: $alertId) {
    id
    seen
    createdAt
  }
}
    `;
export type NotifyMutationFn = Apollo.MutationFunction<NotifyMutation, NotifyMutationVariables>;

/**
 * __useNotifyMutation__
 *
 * To run a mutation, you first call `useNotifyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotifyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notifyMutation, { data, loading, error }] = useNotifyMutation({
 *   variables: {
 *      accountId: // value for 'accountId'
 *      alertId: // value for 'alertId'
 *   },
 * });
 */
export function useNotifyMutation(baseOptions?: Apollo.MutationHookOptions<NotifyMutation, NotifyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotifyMutation, NotifyMutationVariables>(NotifyDocument, options);
      }
export type NotifyMutationHookResult = ReturnType<typeof useNotifyMutation>;
export type NotifyMutationResult = Apollo.MutationResult<NotifyMutation>;
export type NotifyMutationOptions = Apollo.BaseMutationOptions<NotifyMutation, NotifyMutationVariables>;
export const SeenAllDocument = gql`
    mutation SeenAll {
  seenAll
}
    `;
export type SeenAllMutationFn = Apollo.MutationFunction<SeenAllMutation, SeenAllMutationVariables>;

/**
 * __useSeenAllMutation__
 *
 * To run a mutation, you first call `useSeenAllMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSeenAllMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [seenAllMutation, { data, loading, error }] = useSeenAllMutation({
 *   variables: {
 *   },
 * });
 */
export function useSeenAllMutation(baseOptions?: Apollo.MutationHookOptions<SeenAllMutation, SeenAllMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SeenAllMutation, SeenAllMutationVariables>(SeenAllDocument, options);
      }
export type SeenAllMutationHookResult = ReturnType<typeof useSeenAllMutation>;
export type SeenAllMutationResult = Apollo.MutationResult<SeenAllMutation>;
export type SeenAllMutationOptions = Apollo.BaseMutationOptions<SeenAllMutation, SeenAllMutationVariables>;
export const AllNotificationsDocument = gql`
    query AllNotifications {
  allNotifications {
    id
    seen
    createdAt
    alert {
      message
      criteria
      location {
        name
      }
    }
  }
}
    `;

/**
 * __useAllNotificationsQuery__
 *
 * To run a query within a React component, call `useAllNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<AllNotificationsQuery, AllNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllNotificationsQuery, AllNotificationsQueryVariables>(AllNotificationsDocument, options);
      }
export function useAllNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllNotificationsQuery, AllNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllNotificationsQuery, AllNotificationsQueryVariables>(AllNotificationsDocument, options);
        }
export type AllNotificationsQueryHookResult = ReturnType<typeof useAllNotificationsQuery>;
export type AllNotificationsLazyQueryHookResult = ReturnType<typeof useAllNotificationsLazyQuery>;
export type AllNotificationsQueryResult = Apollo.QueryResult<AllNotificationsQuery, AllNotificationsQueryVariables>;
export const HasUnseenDocument = gql`
    query HasUnseen {
  hasUnseen
}
    `;

/**
 * __useHasUnseenQuery__
 *
 * To run a query within a React component, call `useHasUnseenQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasUnseenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasUnseenQuery({
 *   variables: {
 *   },
 * });
 */
export function useHasUnseenQuery(baseOptions?: Apollo.QueryHookOptions<HasUnseenQuery, HasUnseenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasUnseenQuery, HasUnseenQueryVariables>(HasUnseenDocument, options);
      }
export function useHasUnseenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasUnseenQuery, HasUnseenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasUnseenQuery, HasUnseenQueryVariables>(HasUnseenDocument, options);
        }
export type HasUnseenQueryHookResult = ReturnType<typeof useHasUnseenQuery>;
export type HasUnseenLazyQueryHookResult = ReturnType<typeof useHasUnseenLazyQuery>;
export type HasUnseenQueryResult = Apollo.QueryResult<HasUnseenQuery, HasUnseenQueryVariables>;
export const SuggestionsDocument = gql`
    query Suggestions($query: String!) {
  suggestions(query: $query) {
    latitude
    longitude
    formatted
    countryCode
    region
  }
}
    `;

/**
 * __useSuggestionsQuery__
 *
 * To run a query within a React component, call `useSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuggestionsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSuggestionsQuery(baseOptions: Apollo.QueryHookOptions<SuggestionsQuery, SuggestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SuggestionsQuery, SuggestionsQueryVariables>(SuggestionsDocument, options);
      }
export function useSuggestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SuggestionsQuery, SuggestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SuggestionsQuery, SuggestionsQueryVariables>(SuggestionsDocument, options);
        }
export type SuggestionsQueryHookResult = ReturnType<typeof useSuggestionsQuery>;
export type SuggestionsLazyQueryHookResult = ReturnType<typeof useSuggestionsLazyQuery>;
export type SuggestionsQueryResult = Apollo.QueryResult<SuggestionsQuery, SuggestionsQueryVariables>;
export const WeatherDocument = gql`
    query Weather($locationId: Int!) {
  weather(locationId: $locationId) {
    temperature
    humidity
    pressure
    windSpeed
  }
}
    `;

/**
 * __useWeatherQuery__
 *
 * To run a query within a React component, call `useWeatherQuery` and pass it any options that fit your needs.
 * When your component renders, `useWeatherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWeatherQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useWeatherQuery(baseOptions: Apollo.QueryHookOptions<WeatherQuery, WeatherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WeatherQuery, WeatherQueryVariables>(WeatherDocument, options);
      }
export function useWeatherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WeatherQuery, WeatherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WeatherQuery, WeatherQueryVariables>(WeatherDocument, options);
        }
export type WeatherQueryHookResult = ReturnType<typeof useWeatherQuery>;
export type WeatherLazyQueryHookResult = ReturnType<typeof useWeatherLazyQuery>;
export type WeatherQueryResult = Apollo.QueryResult<WeatherQuery, WeatherQueryVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount {
  deleteAccount
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const RenewTokenDocument = gql`
    mutation RenewToken($remember: Boolean!) {
  renewToken(remember: $remember)
}
    `;
export type RenewTokenMutationFn = Apollo.MutationFunction<RenewTokenMutation, RenewTokenMutationVariables>;

/**
 * __useRenewTokenMutation__
 *
 * To run a mutation, you first call `useRenewTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenewTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renewTokenMutation, { data, loading, error }] = useRenewTokenMutation({
 *   variables: {
 *      remember: // value for 'remember'
 *   },
 * });
 */
export function useRenewTokenMutation(baseOptions?: Apollo.MutationHookOptions<RenewTokenMutation, RenewTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenewTokenMutation, RenewTokenMutationVariables>(RenewTokenDocument, options);
      }
export type RenewTokenMutationHookResult = ReturnType<typeof useRenewTokenMutation>;
export type RenewTokenMutationResult = Apollo.MutationResult<RenewTokenMutation>;
export type RenewTokenMutationOptions = Apollo.BaseMutationOptions<RenewTokenMutation, RenewTokenMutationVariables>;
export const UpdateAvatarDocument = gql`
    mutation UpdateAvatar {
  updateAvatar {
    role
    name
    avatarUrl
    email
    createdAt
    updatedAt
  }
}
    `;
export type UpdateAvatarMutationFn = Apollo.MutationFunction<UpdateAvatarMutation, UpdateAvatarMutationVariables>;

/**
 * __useUpdateAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAvatarMutation, { data, loading, error }] = useUpdateAvatarMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdateAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAvatarMutation, UpdateAvatarMutationVariables>(UpdateAvatarDocument, options);
      }
export type UpdateAvatarMutationHookResult = ReturnType<typeof useUpdateAvatarMutation>;
export type UpdateAvatarMutationResult = Apollo.MutationResult<UpdateAvatarMutation>;
export type UpdateAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>;
export const UpdateEmailDocument = gql`
    mutation UpdateEmail($email: String!) {
  updateEmail(email: $email) {
    role
    name
    avatarUrl
    email
    createdAt
    updatedAt
  }
}
    `;
export type UpdateEmailMutationFn = Apollo.MutationFunction<UpdateEmailMutation, UpdateEmailMutationVariables>;

/**
 * __useUpdateEmailMutation__
 *
 * To run a mutation, you first call `useUpdateEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmailMutation, { data, loading, error }] = useUpdateEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmailMutation, UpdateEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmailMutation, UpdateEmailMutationVariables>(UpdateEmailDocument, options);
      }
export type UpdateEmailMutationHookResult = ReturnType<typeof useUpdateEmailMutation>;
export type UpdateEmailMutationResult = Apollo.MutationResult<UpdateEmailMutation>;
export type UpdateEmailMutationOptions = Apollo.BaseMutationOptions<UpdateEmailMutation, UpdateEmailMutationVariables>;
export const UpdateNameDocument = gql`
    mutation UpdateName($name: String!) {
  updateName(name: $name) {
    role
    name
    avatarUrl
    email
    createdAt
    updatedAt
  }
}
    `;
export type UpdateNameMutationFn = Apollo.MutationFunction<UpdateNameMutation, UpdateNameMutationVariables>;

/**
 * __useUpdateNameMutation__
 *
 * To run a mutation, you first call `useUpdateNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNameMutation, { data, loading, error }] = useUpdateNameMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNameMutation, UpdateNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNameMutation, UpdateNameMutationVariables>(UpdateNameDocument, options);
      }
export type UpdateNameMutationHookResult = ReturnType<typeof useUpdateNameMutation>;
export type UpdateNameMutationResult = Apollo.MutationResult<UpdateNameMutation>;
export type UpdateNameMutationOptions = Apollo.BaseMutationOptions<UpdateNameMutation, UpdateNameMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($password: String!) {
  updatePassword(password: $password) {
    role
    name
    avatarUrl
    email
    createdAt
    updatedAt
  }
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    role
    name
    avatarUrl
    email
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!, $remember: Boolean!) {
  login(email: $email, password: $password, remember: $remember)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      remember: // value for 'remember'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($name: String!, $email: String!) {
  register(account: {name: $name, email: $email})
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($email: String!) {
  resetPassword(email: $email)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SubscribeForPushNotificationsDocument = gql`
    mutation SubscribeForPushNotifications($userAgent: String!, $endpoint: String!, $p256dh: String!, $auth: String!) {
  subscribeForPushNotifications(
    userAgent: $userAgent
    endpoint: $endpoint
    p256dh: $p256dh
    auth: $auth
  ) {
    id
    createdAt
    updatedAt
  }
}
    `;
export type SubscribeForPushNotificationsMutationFn = Apollo.MutationFunction<SubscribeForPushNotificationsMutation, SubscribeForPushNotificationsMutationVariables>;

/**
 * __useSubscribeForPushNotificationsMutation__
 *
 * To run a mutation, you first call `useSubscribeForPushNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeForPushNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeForPushNotificationsMutation, { data, loading, error }] = useSubscribeForPushNotificationsMutation({
 *   variables: {
 *      userAgent: // value for 'userAgent'
 *      endpoint: // value for 'endpoint'
 *      p256dh: // value for 'p256dh'
 *      auth: // value for 'auth'
 *   },
 * });
 */
export function useSubscribeForPushNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeForPushNotificationsMutation, SubscribeForPushNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeForPushNotificationsMutation, SubscribeForPushNotificationsMutationVariables>(SubscribeForPushNotificationsDocument, options);
      }
export type SubscribeForPushNotificationsMutationHookResult = ReturnType<typeof useSubscribeForPushNotificationsMutation>;
export type SubscribeForPushNotificationsMutationResult = Apollo.MutationResult<SubscribeForPushNotificationsMutation>;
export type SubscribeForPushNotificationsMutationOptions = Apollo.BaseMutationOptions<SubscribeForPushNotificationsMutation, SubscribeForPushNotificationsMutationVariables>;