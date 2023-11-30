import { useContext } from 'react';

import { StoreContext } from '@/core/store/StoreContext';

export const useMobXStore = () => useContext(StoreContext);
