import { useDispatch } from "react-redux";
import { AppDispatch } from "../data/store";

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
