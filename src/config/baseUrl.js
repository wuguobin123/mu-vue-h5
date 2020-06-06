let baseUrl = "";

switch (process.env.NODE_ENV) {
  case "development":
    baseUrl = "http://10.0.254.182:7900/";
    break;
  case "production":
    baseUrl = "http://10.0.254.182:7900/";
    // baseUrl = "https://gw.baiyue100.com/";
    break;
}

export default baseUrl;
