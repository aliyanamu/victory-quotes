require("dotenv").config();

let hashPass = require("../helpers/hashPass");

const jwt = require("jsonwebtoken"),
  User = require("../models/users");

module.exports = {
  signdulu: (req, res) => {
    console.log("signin body", req.body);

    User.findOne({
      email: req.body.email
    }).then(user => {
      console.log("Successfully enter");
      if (user === null) {
        console.log("User now is :", user);
        User.create({
          name: req.body.name,
          password: req.body.password,
          email: req.body.email
        })
          .then(() => {
            jwt.sign(
              {
                email: req.body.email,
                password: req.body.password
              },
              process.env.Secret,
              (err, token) => {
                if (!err) {
                  res.status(200).json({
                    message: "succesfully get token",
                    token: token
                  });
                } else {
                  res.status(404).json({
                    message: "token not found"
                  });
                }
              }
            );
          })
          .catch(err => {
            res.status(500).json({
              message:
                "email has to be unique valid email and password min. length is 6"
            });
          });
      } else if (user) {
        res.status(500).json({
          message: "email is already registered. please login first to enter"
        });
      } else {
        res.status(404).json({
          message: "user not found"
        });
      }
    });
  },

  checkdulu: (req, res, next) => {
    console.log("check body", req.body);

    User.findOne({
      email: req.body.email,
      password: hashPass(req.body.password)
    })
      .then(user => {
        console.log("User now is :", user);
        jwt.sign(
          {
            email: req.body.email,
            password: req.body.password
          },
          process.env.Secret,
          (err, token) => {
            if (!err) {
              res.status(200).json({
                message: "succesfully get token",
                token: token
              });
            } else {
              res.status(404).json({
                message: "token not found"
              });
            }
          }
        );
      })
      .catch(err => {
        res.status(404).json({
          message: "username or password wrong"
        });
      });
  }
};
//     if (!token) {
//       res.status(403).json({ error: "Please login first" });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         res.status(500).json(err);
//       } else {
//         User.findById(decoded.id)
//           .then(user => {
//             if (user) {
//               req.decoded = decoded;
//               next();
//             } else {
//               res.status(401).json({ error: "Please provide a valid token" });
//             }
//           })
//           .catch(err => {
//             res.status(500).json(err);
//           });
//       }
//     });
//   }
