import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { useGetAccessTokenMutation } from "../redux/api/userApi/userApi";
import { setUser } from "../redux/features/authSlice";

const useAuthObserver = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const [setEmail] = useGetAccessTokenMutation();
  //Auth observer

  const unsubscribe = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        dispatch(setUser(JSON.parse(JSON.stringify(currentUser))));
        const { data: res } = await setEmail(currentUser?.email);
        res && localStorage.setItem("token", res?.token);
      } else {
        localStorage.removeItem("token");
        dispatch(setUser(null));
      }
    });
  };
  return [unsubscribe, auth];
};

export default useAuthObserver;
