// const corsOptions = {
// origin: [process.env.APP_URL_PROD, process.env.FRONT_URL],
// origin: '*',
// };

const corsOptions = {
  origin: process.env.FRONT_URL_PROD,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export default corsOptions;
