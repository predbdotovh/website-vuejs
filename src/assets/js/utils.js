const appName = "PREdb";

const utils = {
  setPageTitle(title) {
    if (title) {
      document.title = title + " - " + appName;
    } else {
      document.title = appName;
    }
  },
};

export default utils;
