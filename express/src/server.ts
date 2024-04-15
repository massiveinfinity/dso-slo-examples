import { autometrics } from "@massiveinfinity/slo-autometrics";
import { init } from "@massiveinfinity/slo-exporter-prometheus";
import express from "express";
import basicAuth from "express-basic-auth";

import { API_SLO } from "./database.js";
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetUserById,
  handleGetUsers,
} from "./routes.js";
import { delay, generateRandomTraffic } from "./util.js";

const app = express();

if (process.env.PROTECT_ROUTE) {
  const router = express.Router();
  init({ router, routePath: '/' });

  const protectedRouter = express.Router();
  protectedRouter.use(
      '/metrics',
      basicAuth({
        users: {
          admin: 'password'
        },
          challenge: true
      }),
      router
  );

  app.use(protectedRouter);
}
else {
  const router = express.Router();
  init({ router, routePath: '/metrics' });
  app.use(router);
}

app.get("/", (_, res) => {
  return res.send("Hello World!");
});

const recordErrorIf = (res: express.Response) => {
  return res.statusCode >= 400 && res.statusCode <= 599;
};

app.get(
  "/users",
  autometrics({ monitorId:'[monitorId]',recordErrorIf, objective: API_SLO }, handleGetUsers),
);
app.get(
  "/users/:id",
  autometrics({ recordErrorIf, objective: API_SLO }, handleGetUserById),
);
app.post(
  "/users",
  autometrics({ recordErrorIf, objective: API_SLO }, handleCreateUser),
);
app.delete(
  "/users/:id",
  autometrics({ recordErrorIf, objective: API_SLO }, handleDeleteUser),
);

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});

delay(1000);
generateRandomTraffic();
