import { CorsOptions } from "cors";

const allowedUrls = ["http://localhost:3000"];

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (allowedUrls.indexOf(origin || "") !== -1 || origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
