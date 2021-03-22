const { Router } = require("express");
const User = require("../models/User");
const AdminUser = require("../models/AdminUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const router = Router();

router.post(
  "/login",
  [
    check("email", "Некорректный email").normalizeEmail().isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные для пользователя",
        });
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (email === "digr98@gmail.com") {
        const adminUser = await AdminUser.findOne({ email });
        if (adminUser) {
          const isMatch = await bcrypt.compare(password, adminUser.password);

          if (!isMatch) {
            return res
              .status(400)
              .json({ message: "Неверные данные, попробуйте снова" }); // потом изменить
          }

          const token = jwt.sign(
            { userId: adminUser.id },
            config.get("jwtSecret"),
            {
              expiresIn: "89666h",
            }
          );

          return res.json({ token, userId: user.id, admin: true });
        } else {
          const hashedPassword = await bcrypt.hash(password, 12);

          const adminUser = new AdminUser({
            email: email,
            password: hashedPassword,
          });

          await adminUser.save();
          const token = jwt.sign(
            { userId: adminUser.id },
            config.get("jwtSecret"),
            {
              expiresIn: "1h",
            }
          );
          return res
            .status(201)
            .json({ token, userId: adminUser.id, admin: true });
        }
      }

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res
            .status(400)
            .json({ message: "Неверные данные, попробуйте снова" }); // потом изменить
        }

        const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
          expiresIn: "89666h",
        });

        return res.json({ token, userId: user.id });
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({ email: email, password: hashedPassword });

        await user.save();
        const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
          expiresIn: "1h",
        });
        res.status(201).json({ token, userId: user.id });
        // res.json({ token, userId: user.id });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.get("/profile", async (req, res) => {
  const token = req.query.params;
  const decoded = jwt.verify(token, config.get("jwtSecret"));
  req.user = decoded;
  const user = await User.findOne({
    _id: req.user.userId,
  });
  res.json(user);
});

module.exports = router;
