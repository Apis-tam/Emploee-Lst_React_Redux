import express from "express";
import mongodb from "mongodb";

const router = express.Router();

const validate = data => {
  const errors = {};

  if (!data.email) errors.title = "Email filed can't be blank";
  if (!data.phone)
    errors.phone = "Name filed can't be blank";
 
  if (!data.name) errors.name = "Name filed can't be blank";
  if (!data.position) errors.position = "Position filed can't be blank";
  if (!data.task) errors.task = "This field can't be blank";
  
  if (data.position <= 0)
    errors.position = "Position must be only positove value";

  return errors;
};

router.get("/", (req, res) => {
  const db = req.app.get("db");
  db.collection("films")
    .find({})
    .toArray((err, films) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ films });
    });
});

router.get("/:_id", (req, res) => {
  const db = req.app.get("db");
  db.collection("films").findOne(
    { _id: new mongodb.ObjectId(req.params._id) },
    (err, film) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ film });
    }
  );
});

router.post("/", (req, res) => {
  const db = req.app.get("db");
  const errors = validate(req.body.film);

  if (Object.keys(errors).length === 0) {
    db.collection("films").insertOne(req.body.film, (err, r) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ film: r.ops[0] });
    });
  } else {
    res.status(400).json({ errors });
  }
});

router.put("/:_id", (req, res) => {
  const db = req.app.get("db");
  const { _id, ...filmData } = req.body.film;
  const errors = validate(filmData);

  if (Object.keys(errors).length === 0) {
    db.collection("films").findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params._id) },
      { $set: filmData },
      { returnOriginal: false },
      (err, r) => {
        if (err) {
          res.status(500).json({ errors: { global: err } });
          return;
        }

        res.json({ film: r.value });
      }
    );
  } else {
    res.status(400).json({ errors });
  }
});

router.delete("/:_id", (req, res) => {
  const db = req.app.get("db");

  db.collection("films").deleteOne(
    { _id: new mongodb.ObjectId(req.params._id) },
    err => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({});
    }
  );
});

export default router;
