import {
  FilePdfOutlined,
  FilePptOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FileZipOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import theme from 'configs/theme/theme.json';

export const FILE_TYPES = [
  { value: 'pdf', Icon: FilePdfOutlined, color: theme.color.red },
  { value: 'ppt', Icon: FilePptOutlined, color: theme.color.pink },
  { value: 'pptx', Icon: FilePptOutlined, color: theme.color.pink },
  { value: 'doc', Icon: FileWordOutlined, color: theme.color.blue },
  { value: 'docx', Icon: FileWordOutlined, color: theme.color.blue },
  { value: 'xlsx', Icon: FileExcelOutlined, color: theme.color.green },
  { value: 'xls', Icon: FileExcelOutlined, color: theme.color.green },
  { value: 'csv', Icon: FileExcelOutlined, color: theme.color.green },
  { value: 'zip', Icon: FileZipOutlined, color: theme.color.violet },
  { value: 'zar', Icon: FileZipOutlined, color: theme.color.violet },
  { value: 'txt', Icon: FileTextOutlined, color: 'currentColor' },
  { value: 'mov', Icon: VideoCameraOutlined, color: 'currentColor' },
  { value: 'mp4', Icon: VideoCameraOutlined, color: 'currentColor' },
  { value: 'avi', Icon: VideoCameraOutlined, color: 'currentColor' },
  { value: 'flv', Icon: VideoCameraOutlined, color: 'currentColor' },
  { value: 'wmv', Icon: VideoCameraOutlined, color: 'currentColor' },
];

export const IMAGE_TYPES = ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff'];

export const getExtensionFile = (fileName = '') => {
  if (typeof fileName !== 'string' || fileName.indexOf('.') === -1) return '';
  if (fileName.match('maps.googleapis.com')) return 'jpg';
  return fileName.split('.').pop();
};

export const isImageFile = fileName => {
  const extension = getExtensionFile(fileName);
  // console.log(extension, 'extension');
  if (!extension) return false;
  return IMAGE_TYPES.includes(extension.toLocaleLowerCase());
};

export const makeFileList = (values) =>
  Array.isArray(values)
    ? values.map((value) =>
        value && value.url
          ? value
          : {
              uid: value,
              status: 'done',
              ...(typeof value === 'string' && {
                name: value,
                url: value,
              }),
            },
      )
    : [];

export const getPropertyFile = (property, item) => {
  return getExtensionFile(item.fileName || item.name || item.url)
    ? FILE_TYPES.find(
        file =>
          file.value.toLocaleLowerCase() ===
          getExtensionFile(item.fileName || item.name || item.url).toLocaleLowerCase(),
      )?.[property]
    : null;
};