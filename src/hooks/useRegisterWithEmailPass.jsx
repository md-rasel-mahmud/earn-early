import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice";
import { usePostUserMutation } from "../redux/api/userApi/userApi";

const useRegisterWithEmailPass = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const [postUser, { data: resUser, isLoading }] = usePostUserMutation();

  const registerWithEmailPass = async (email, pass, name, imgLink, data) => {
    await createUserWithEmailAndPassword(auth, email, pass).then(
      (userCredential) => {
        const user = userCredential.user;

        if (user) {
          updateProfile(user?.auth?.currentUser, {
            displayName: name,
            photoURL: imgLink,
          }).then(() => {
            postUser(data);
          });

          dispatch(
            setUser({
              email: user?.email,
              name,
              imgLink,
            })
          );
        }
      }
    );
  };
  return [registerWithEmailPass, resUser, isLoading];
};

export default useRegisterWithEmailPass;
