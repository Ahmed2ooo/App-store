// import cors from "cors"
// import env from "dotenv"
// import { v1Router } from "./v1Router.js"
// import { dbconnection } from "./dbconnection.js"
// import express from "express"; 
// import path from "path";
// import { fileURLToPath } from "url";

// env.config()  
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const publicPath = path.join(__dirname, "../../public");
 
// export const bootstrap = async(app)=>{
//     app.use(cors())
//     app.use(express.static(publicPath));

//     app.get("/", (req, res) => {
//     res.send("welcome Vercel!");
//   });
//     app.get("/pp", (req, res) => {
//       res.sendFile(path.join(publicPath, "pp.html"));
//     });
//     app.use("/api/v1/",v1Router)
//     app.use((error,req,res,next)=>{
//         const status = error.status || 500
//         const message = error.message || 'Internal server Error'
//         res.status(status).json({status,message})
//     })
//     await dbconnection();
//     app.listen(process.env.PORT,()=>{
//         console.log(`server is runing ${process.env.PORT}`)
//     })
// }
import cors from "cors"
import env from "dotenv"
import { v1Router } from "./v1Router.js"
import { dbconnection } from "./dbconnection.js"
import express from "express"; 
import path from "path";
import { fileURLToPath } from "url";

env.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../../public");

export const bootstrap = async (app) => {
  const allowedOrigins = [
    "https://بتحط رابط vercel تبع react ", 
    "http://localhost:3000",             
  ];

  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.use(express.static(publicPath));

  app.get("/", (req, res) => {
    res.send("welcome Vercel!");
  });

  app.get("/pp", (req, res) => {
    res.sendFile(path.join(publicPath, "pp.html"));
  });

  app.use("/api/v1/", v1Router);

  app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Internal server Error';
    res.status(status).json({ status, message });
  });

  await dbconnection();
  app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
};
