import actions from 'store/actions';
import {bindActionCreators} from 'redux';

import {useAppDispatch} from 'hooks/useStore';

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
};
