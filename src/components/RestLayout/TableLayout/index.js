import React, { Component } from 'react';
import { update, get } from 'lodash';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import I18n from 'i18next';
import { getRecordData, getValidData } from 'utils/tools';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import Text from '../../common/Text';
import { DropdownStyles, TableStyles } from './styles';

class RestTableLayout extends Component {
  searchInput = {};

  onChangePagination = (e, filters, sorter) => {
    const { resourceFilter, retrieveList } = this.props;
    const formatFilter = {};
    const formatSort =
      sorter && sorter.field && sorter.order
        ? `${sorter.field}${sorter.order === 'descend' ? ':DESC' : ':ASC'}`
        : null;

    Object.keys(filters).forEach((filter) => {
      const filterKey = filter;
      const $in = Array.isArray(filters[filter])
        ? filters[filter].filter((data) => typeof data !== 'object')
        : filters[filter];

      const searchFilter = Array.isArray(filters[filter])
        ? filters[filter].find((data) => typeof data === 'object')
        : '';

      update(formatFilter, filterKey, () => undefined);
      if ($in?.length) {
        update(formatFilter, filterKey, () => $in);
      }
      if (searchFilter) {
        update(formatFilter, filterKey, () => searchFilter);
      } else {
        update(formatFilter, filterKey, () => $in);
      }
    });
    retrieveList({
      offset: (e.current - 1) * e.pageSize,
      limit: e.pageSize,
      filter: { ...resourceFilter.filter, ...formatFilter },
      orderBy: formatSort,
    });
  };

  onChangeRecord = (record, item) => (value) => {
    this.props.updateRecord(
      record.id,
      {
        [item.props.source]: value,
      },
      true,
    );
  };

  handleSearch = (confirm) => {
    confirm();
  };

  handleReset = (dataIndex) => {
    const { resourceFilter, retrieveList } = this.props;
    const formatFilter = { ...resourceFilter.filter };
    update(formatFilter, dataIndex, () => undefined);
    retrieveList({
      ...resourceFilter,
      filter: { ...formatFilter },
    });
  };

  onBlur = (index, source) => (e) => {
    const { onEditHeaderSuccess } = this.props;
    onEditHeaderSuccess({ index, source, value: e.currentTarget.value });
  };

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  getColumnSearchProps = (dataIndex, header, hasSearch) => {
    const { resourceFilter } = this.props;
    const defaultValue = get(resourceFilter.filter, `${dataIndex}.$like`);
    return hasSearch
      ? {
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
            const filters =
              selectedKeys?.filter?.((data) => typeof data === 'string') || [];
            return (
              <DropdownStyles style={{ padding: 8 }}>
                <Input
                  ref={(node) => {
                    this.searchInput[dataIndex] = node;
                  }}
                  placeholder={`Search ${I18n.t(header)}`}
                  onChange={(e) =>
                    setSelectedKeys(
                      e.target.value
                        ? [...filters, { $like: e.target.value }]
                        : filters,
                    )}
                  onPressEnter={() => this.handleSearch(confirm)}
                  style={{ width: 188, marginBottom: 8, display: 'block' }}
                  defaultValue={defaultValue}
                />
                <Button
                  type="primary"
                  onClick={() => this.handleSearch(confirm)}
                  icon=<SearchOutlined style={{ color: 'white' }} />
                  size="small"
                  className="search-button"
                  style={{ width: 90, marginRight: 8 }}
                >
                  {I18n.t('button.search')}
                </Button>
                <Button
                  onClick={() => {
                    // setSelectedKeys([...filters]);
                    this.searchInput[dataIndex].setValue('', () => {
                      this.handleReset(dataIndex, filters);
                      confirm();
                    });
                  }}
                  size="small"
                  style={{ width: 90 }}
                >
                  {I18n.t('button.reset')}
                </Button>
              </DropdownStyles>
            );
          },
          filterIcon: (filtered) => (
            <SearchOutlined
              type="search"
              className={filtered || defaultValue ? 'highlightFilter' : ''}
              // style={{ color: filtered || defaultValue ? '#1890ff' : undefined }}
            />
          ),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => this.searchInput[dataIndex].select());
            }
          },
        }
      : {};
  };

  render() {
    const {
      resourceData,
      children,
      resource,
      // gotoEditPage,
      loading,
      onRowClick,
      customQuery,
      resourceFilter,
      // isScroll,
      expandedRowRender,
      expandIcon,
      expandable,
      setRowClassName,
      xScroll,
    } = this.props;
    this.columns = children
      .filter((e) => e)
      .map((item) => ({
        fixed: item.props.fixed,
        title:
          item.props.source === 'actionGroup'
            ? I18n.t('action')
            : // <HeaderTableWrapper
              //   onBlur={this.onBlur(index, item.props.source)}
              //   onKeyPress={this.onKeyPress}
              //   disabled={!item.props.isEditHeader}
              //   defaultValue={item.props.header ? I18n.t(item.props.header) : ''}
              // />
              I18n.t(item.props.header || ''),
        dataIndex: `${item.props.source}`,
        width: item.props.source === 'actionGroup' ? item.props.widthAction || 80 : item.props.width,
        align: item.props.align,
        key: getFilterKey(item),
        sorter: item.props.sorter
          ? (a, b) =>
              getRecordData(a, item.props.source) -
              getRecordData(b, item.props.source)
          : undefined,
        defaultSortOrder: getSorterOrder(
          resourceFilter.orderBy,
          item.props.source,
        ),
        filters: item.props.filters,
        filteredValue: (() =>
          get(resourceFilter.filter || {}, getFilterKey(item)) || [])(),
        filterMultiple: item.props.filterMultiple !== false,
        // onFilter: (value, record) =>
        //   `${getRecordData(record, item.props.source)}`.search(`${value}`) > -1,
        render:
          item.props.render ||
          ((obj, record) => {
            const RecordComponent = React.cloneElement(item, {
              table: true,
              record,
              loading:
                resourceData.itemLoading && resourceData.itemLoading[record.id],
              onChangeRecord: this.onChangeRecord(record, item),
              customQuery,
              modelResource: resource,
              ...getAction(this.props, item),
            });
            return (
              <div>
                {RecordComponent}
              </div>
            );
          }),
        filterIcon: (filtered) => (
          <FilterOutlined
            type="filter"
            className={
              filtered ||
              get(resourceFilter.filter || {}, `${item.props.source}`)
                ? 'highlightFilter'
                : ''
            }
            // style={{ color: filtered || defaultValue ? '#1890ff' : undefined }}
          />
        ),
        filterDropdown: item.props.filterDropdown
          ? item.props.filterDropdown(
              getFilterKey(item),
              resourceFilter,
              this.handleReset,
            )
          : undefined,
        ...this.getColumnSearchProps(
          item.props.source,
          item.props.header,
          item.props.hasSearch,
        ),
      }))
      .map((e) => getValidData(e));

    return (
      <TableStyles
        onRow={(record) => ({
          onClick: () => {
            onRowClick && onRowClick(record);
          },
        })}
        expandable={expandable}
        onChange={this.onChangePagination}
        pagination={false}
        columns={this.columns}
        loading={loading}
        expandedRowRender={expandedRowRender}
        expandIcon={expandIcon}
        dataSource={resourceData || []}
        rowKey="id"
        scroll={{ x: xScroll }}
        rowClassName={setRowClassName}
      />
    );
  }
}

const getFilterKey = (item) => {
  return item && item.props && item.props.hasSearch
    ? item.props.source
    : item.props.filterKey || `${item.props.source}.$in`;
};

const getSorterOrder = (orderBy, source) => {
  if (orderBy === `${source}:ASC`) return 'ascend';
  if (orderBy === `${source}:DESC`) return 'descend';
  return undefined;
};

export const showTotal = (total, range) => (
  <Text type="button" className="txtTotal">
    {` ${range.join(' - ')}/${total} `}
    {/* <IntlMessages id={total > 1 ? 'text.records' : 'text.record'} /> */}
  </Text>
);
export const getAction = (props, item) => {
  switch (item?.props?.source) {
    case 'edit':
      return { gotoEditPage: item.props.gotoEditPage || props.gotoEditPage };
    case 'delete':
      return { deleteItem: item.props.deleteItem || props.deleteItem };
    case 'show':
      return { gotoShowPage: item.props.gotoShowPage || props.gotoShowPage };
    case 'actionGroup':
    default:
      return {
        gotoShowPage: props.gotoShowPage,
        deleteItem: props.deleteItem,
        gotoEditPage: props.gotoEditPage,
      };
  }
};

// const getFilteredValue = (resourceFilter, source) => {
//   const sourceFilter = getRecordData(resourceFilter, source);
//   if (!sourceFilter) return [];
//   return sourceFilter.$in
//     ? [...sourceFilter.$in, { searchText: sourceFilter.$link }]
//     : [{ searchText: sourceFilter.$link }];
// };

RestTableLayout.propTypes = {
  children: PropTypes.node,
  retrieveList: PropTypes.func,
  // gotoEditPage: PropTypes.func,
  resourceData: PropTypes.array,
  resourceFilter: PropTypes.object,
  loading: PropTypes.bool,
  updateRecord: PropTypes.func,
  onRowClick: PropTypes.func,
  customQuery: PropTypes.func,
  onEditHeaderSuccess: PropTypes.func,
  // isScroll: PropTypes.bool,
  resource: PropTypes.string,
  expandedRowRender: PropTypes.any,
  expandIcon: PropTypes.any,
  expandable: PropTypes.any,
  setRowClassName: PropTypes.func,
  xScroll: PropTypes.any,
};

RestTableLayout.defaultProps = {
  onEditHeaderSuccess: () => {},
  expandedRowRender: null,
  xScroll: true,
  // isScroll: true,
};

export default RestTableLayout;
