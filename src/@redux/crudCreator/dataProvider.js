import { keyBy, omit } from 'lodash';
import { getValidData } from '../../utils/tools';

export const PRIMARY_KEY = 'id';

export const convertRequestParams = (
  type,
  params,
  // resource
  options = { primaryKey: PRIMARY_KEY },
) => {
  const formatedParams = {
    // ...params,
    ...omit(params, ['offset']),
    filter: params.filter,
    // pageSize: params.limit,
    page: params.offset / params.limit + 1,
    ...!params.q?.trim?.()?.isEmpty?.() && {
      q: params.q?.trim(),
    },
    count: undefined,
  };

  const filter = getValidData(formatedParams.filter, true);
  switch (type) {
    case 'GET_ALL':
      return {
        ...formatedParams,
        filter:
          Object.keys(filter).length > 0 ? JSON.stringify(filter) : undefined,
      };
    case 'GET_BY_ID':
      return {
        ...params,
        [PRIMARY_KEY]: Number(params[options.primaryKey]),
      };
    case 'EDIT':
      delete formatedParams.id;
      delete formatedParams.filter;
      delete formatedParams.q;
      delete formatedParams.count;

      return getValidData(formatedParams);
    case 'CREATE':
      return getValidData(formatedParams);
    case 'DELETE':
    default:
      return {};
  }
};

export const convertResponseData = (
  type,
  response,
  options = { primaryKey: PRIMARY_KEY },
) => {
  switch (type) {
    case 'GET_ALL':
      return {
        data: keyBy(
          response?.items.map((data) => ({
            ...data,
            id: data[options.primaryKey || PRIMARY_KEY],
            backupId: data[PRIMARY_KEY],
          })),
          options.primaryKey || PRIMARY_KEY,
        ),
        ids: response?.items.map(
          (data) => data[options.primaryKey || PRIMARY_KEY],
        ),
        total: response?.meta?.totalItems,
        numberOfPages: response?.meta?.totalPages,
      };
    case 'GET_BY_ID':
    case 'CREATE':
      return response
        ? {
            ...response,
            id: response[options.primaryKey || PRIMARY_KEY],
            backupId: response[PRIMARY_KEY],
          }
        : null;
    case 'EDIT':
      return response && response
        ? {
            ...response,
            id: response[options.primaryKey || PRIMARY_KEY],
            backupId: response[PRIMARY_KEY],
          }
        : null;
    case 'DELETE':
    default:
      return response;
  }
};
