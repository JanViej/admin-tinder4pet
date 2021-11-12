import { notification } from 'antd';
import { refreshTokenApi } from 'api/user';
import I18n from 'i18next';

export const checkError = async (res) => {
  try {
    if (res.code === 401) {
      localStorage.removeItem('sessionToken');
      if (localStorage.getItem('refreshToken')) {
        const response = await refreshTokenApi({
          isNotAdminUrl: true,
          refreshToken: localStorage.getItem('refreshToken'),
        });
        if (response?.accessToken && response?.refreshToken) {
          localStorage.setItem('sessionToken', response?.accessToken);
          localStorage.setItem('refreshToken', response?.refreshToken);
          // window.location.reload();
        }
      } else {
        notification.error({
          message: I18n.t('error.title'),
          description: res.message || I18n.t('error.description'),
        });
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('fullName');
        localStorage.removeItem('userId');
        window.location.href = '/';
      }
    }
  } catch (error) {
    notification.error({
      message: I18n.t('error.title'),
      description: error.message || I18n.t('error.description'),
    });
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
  }
}

export async function apiWrapper(
  config = { isShowProgress: true, isShowSuccessNoti: false },
  apiFunc,
  ...params
) {
  try {
    const response = await apiFunc(...params);
    config?.isShowSuccessNoti &&
      notification.success({
        message: I18n.t('success.title'),
        description:
          response.message ||
          config.successDescription ||
          I18n.t('success.description'),
      });
    return response;
  } catch (err) {
    notification.destroy();
    err.code !== 401 && notification.error({
      message: I18n.t('error.title'),
      description: err.message || I18n.t('error.description'),
    });
    checkError(err);
    throw err;
  }
}

