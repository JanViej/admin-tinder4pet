import {useSelector} from 'react-redux';

export const useApplicationFilter = () => {
  // const userData = useSelector(state => state.auth.data);
  const applications = useSelector(state => state.applications.data);

  const getApplicationWith = (status) => {
    let data = [...applications];
    if (status !== 'ALL') {
      data = applications.filter(item => item?.type === status);
    }
    return data;
  };
  return {getApplicationWith};
};
