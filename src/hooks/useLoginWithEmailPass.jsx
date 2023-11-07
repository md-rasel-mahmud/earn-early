import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/firebase.config";

import { useGetAccessTokenMutation } from "../redux/api/userApi/userApi";

const useLoginWithEmailPass = () => {
  const auth = getAuth(app);
  const [setEmail, { data: resToken, isLoading }] = useGetAccessTokenMutation();

  const loginWithEmailPass = async (email, pass) => {
    await signInWithEmailAndPassword(auth, email, pass).then(
      (userCredential) => {
        const user = userCredential.user;
        if (user) {
          setEmail(email);
        }
      }
    );
  };
  return [loginWithEmailPass, resToken, isLoading];
};

export default useLoginWithEmailPass;
