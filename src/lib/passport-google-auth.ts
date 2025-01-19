import { Profile, Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";

// logic to save user or check if user exists in record to proceed.
const saveUser = (user: Profile) => {
  return new Promise((resolve, reject) => {
    resolve("Successful");
  });
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/api/users/auth/redirect", // this is the endpoint, registered on google while creating the app. This endpoint would exist on the application for verifying the authentication
    },
    async (_accessToken, _refreshToken, profile, cb: any) => {
      console.log("profile", profile); // this is the user profile returned by google

      try {
        await saveUser(profile);
        return cb(null, profile);
      } catch (e: any) {
        throw new Error(e);
      }
    }
  )
);

// passport.serializeUser stores user object passed in the cb method above in req.session.passport
passport.serializeUser((user, cb) => {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// passport.deserializeUser stores the user object in req.user
passport.deserializeUser(function (
  user: any,
  cb: (arg0: null, arg1: any) => any
) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// for broader explanation of serializeUser and deserializeUser visit https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize

// An article that explains the concept of process.nextTick https://nodejs.dev/learn/understanding-process-nexttick

export default passport;
