var express = require("express");
var router = express.Router();
var pool = require("./db");

router.get("/allexpensesbydate", (req, res, next) => {
  const query = [req.query.month, req.query.year, req.query.email];
  pool.query(
    `SELECT expenses.* , category.category_name, to_char( date, 'DD/MM/YYYY') as formatted_date, date_part('month', date) as month, date_part('year', date) as year FROM expenses JOIN category ON expenses.category_id=category.category_id WHERE date_part('month', date) = $1 AND date_part('year', date) = $2 AND email = $3 ORDER BY date_created DESC`,
    query,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.get("/get/doughnutdata", (req, res, next) => {
  const values = [req.query.month, req.query.year, req.query.email];
  pool.query(
    `SELECT category.category_name ,SUM(expenses.amount) as total, category.fill FROM expenses JOIN category ON expenses.category_id=category.category_id WHERE date_part('month', date) = $1 AND date_part('year', date) = $2 AND email = $3 GROUP BY category.category_name, category.fill`,
    values,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.post("/post/expensetodb", (req, res, next) => {
  const values = [
    req.body.description,
    req.body.amount,
    req.body.date,
    req.body.category_id,
    req.body.email
  ];
  pool.query(
    `INSERT INTO expenses(description, amount, date, category_id, email, date_created)
             VALUES($1, $2, $3, $4, $5, NOW() )`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.put("/put/expense", (req, res, next) => {
  const values = [
    req.body.description,
    req.body.amount,
    req.body.date,
    req.body.category_id,
    req.body.expense_id,
    req.body.email
  ];
  pool.query(
    `UPDATE expenses SET description= $1, amount=$2, date=$3, category_id=$4, date_created=NOW()
              WHERE expense_id = $5 AND email= $6`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.delete("/delete/expense", (req, res, next) => {
  const expense_id = req.body.expense_id;
  pool.query(
    `DELETE FROM expenses WHERE expense_id = $1`,
    [expense_id],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.get("/get/categories", (req, res, next) => {
  pool.query(
    `SELECT * FROM category ORDER BY category_name`,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.get("/get/months", (req, res, next) => {
  pool.query(`SELECT * FROM months`, (q_err, q_res) => {
    res.json(q_res.rows);
  });
});

module.exports = router;
