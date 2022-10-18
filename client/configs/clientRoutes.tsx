export const CLIENT_DOMAIN = "localhost";
export const CLIENT_PORT = "3000";
export const CLIENT_ROOTPAGE = `http://${CLIENT_DOMAIN}:${CLIENT_PORT}`;

export const routes = {
  discover: `/`,
  learningGroups: "/learning-groups",
  articles: "/articles",
  privateTutors: "/private-tutors",
  aboutUs: "/aboutUs",
  contact: "/contact",
  TOS: "/tos",
  profile: {
    overview: "/profile/overview",
    personalDetails: "/profile/personal-details",
    privacySettings: "/profile/privacy-settings",
    notificationsCenter: "/profile/notifications-center",
    previewYourProfile: "/profile/preview",
  },
};

export const socials = {
  facebook: "/",
  instagram: "/",
  twitter: "/",
};
