import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// Local
// Components
import {
  getUserInfoThunk,
  getUserCollectionThunk,
} from "store/session/sessionThunks";
import { useAppDispatch, useAppSelector } from "hooks/store";
import { getFeaturesThunk } from "store/landing/landingThunks";
// Components
import Hero from "./components/Hero";
import FeatureProducts from "./components/Featured/FeatureProducts";
// import FeatureBoxes from './Featured/FeatureBoxes';
import LatestProducts from "./components/LatestProducts";

const Landing = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const loggedInUser = useAppSelector((state) => state.session.user);

  console.log("logged in user", loggedInUser);

  useEffect(() => {
    (async () => {
      dispatch(getFeaturesThunk(""));
    })();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        dispatch(getUserInfoThunk({ token: "", userId: user.sub }));
      }
      if (loggedInUser) {
        dispatch(getUserCollectionThunk({ token: "", userId: user.id }));
      }
    };

    fetchData();
  }, [user]);
  return (
    <main>
      <Hero isAuthenticated={isAuthenticated} login={loginWithRedirect} />
      {/* Temporary comment to hide DropBoxes see issue #86
      <FeatureBoxes />
      */}
      <FeatureProducts />
      <LatestProducts isAuthenticated={isAuthenticated} />
    </main>
  );
};

export default Landing;
