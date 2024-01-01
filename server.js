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

app.listen(process.env.PORT_NO, () => {
    console.log(`Listening on port ${process.env.PORT_NO}`);
});

const url = "https://identity.ktu.edu.gh/Account/Login";

app.get("/", async (req, res) => {
  res.cookie("name", "user");
  res.render("capHomePage", {verifToken: "Hello"});
    // try {
    //     // Get Page from server
    //     const response = await axios.get(url);
    //     // Extract cookie
    //     const cookieVal = response.headers["set-cookie"][0].split("=")[1];

    //     // Use cheerio to extract hidden input value
    //     const $ = cheerio.load(response.data);
    //     const verifToken = $("input[name='__RequestVerificationToken']").attr("value");

    //     // Set multiple cookies
    //     res.cookie(".AspNetCore.Antiforgery.X0e-rIfhNrk", cookieVal, {
    //       secure: true,
    //       // domain: "identity.ktu.edu.gh",
    //       httpOnly: true,
    //     });

    //     res.cookie(".AspNetCore.Antiforgery.X0e-rIfhNrk", cookieVal, {
    //       secure: true,
    //       httpOnly: true,
    //     });
        
    //     // Render homepage with values
    //     res.render("capHomePage", {
    //         verifToken
    //     });
    // } catch (err) {
    //     console.log(err.message);
    // }
});

app.post("/", async (req, res) => {
  const headers = req.headers;
    const cookie = headers.cookie;
    // const {Username, Password, button, RememberLogin, _RequestVerificationToken} = req.body;
    console.log(headers);

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