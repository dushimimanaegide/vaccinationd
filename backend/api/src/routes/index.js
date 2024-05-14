import express from"express"
import partenerRouter from "./partenersRouters.js";
import classRouter from "./classesRouters.js";
import eventApplicationRouter from "./eventApplicationRouter.js";
import testmonyRouter from "./testmonyRouter.js";
import serviceRouter from"./servicesRouter.js"
import authRouter from "./usersRouter.js";
import teamRouter from "./teamcrud.js";
import programRouter from "./programsRouter.js";
import eventRouter from "./eventsRouters.js";
import appRouter from "./application.js"
import machineRouter from "./machines.js";
import portfolioRouter from "./portfolioRouter.js";
import contactRouter from "./contacts.js";
const mainRouter=express.Router();
     mainRouter.use(express.json());
     mainRouter.use("/apply",appRouter)
     mainRouter.use("/service",serviceRouter)
     mainRouter.use("/auth",authRouter)
     mainRouter.use("/event",eventRouter)
     mainRouter.use("/program",programRouter)
     mainRouter.use("/testmony",testmonyRouter)
     mainRouter.use("/machine",machineRouter)
     mainRouter.use("/eventApplication",eventApplicationRouter)
     mainRouter.use("/portfolio",portfolioRouter)
     mainRouter.use("/class",classRouter)
     mainRouter.use("/contacts",contactRouter)
     mainRouter.use("/team",teamRouter)
     mainRouter.use("/partners",partenerRouter)
///partners/getAllPartners
     export default mainRouter;