import config from "./config.json";

// @ts-ignore
const google = window.gapi;

const { clientId, apiKey } = config;

const discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

const scope = "https://www.googleapis.com/auth/drive.file";

export const handleSignIn = async () => {
  await google.auth2.getAuthInstance().signIn();
};

export const handleSignOut = async () => {
  await google.auth2.getAuthInstance().signOut();
};

export const isSignedIn = () => {
  return google.auth2.getAuthInstance().isSignedIn.get();
};

const updateSigninStatus = (isSignedIn: boolean) => {
  if (isSignedIn) {
    console.log("Signed in");
  } else {
    console.log("Not signed in");
  }
};

export const initClient: () => Promise<void> = () =>
  new Promise((resolve, reject) => {
    google.load("client", async () => {
      try {
        await google.client.init({
          apiKey,
          clientId,
          discoveryDocs,
          scope,
        });

        // Listen for sign-in state changes.
        google.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(google.auth2.getAuthInstance().isSignedIn.get());

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
