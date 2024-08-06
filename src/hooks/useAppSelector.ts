import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../data/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
