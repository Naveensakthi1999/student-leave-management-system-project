import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const router = express.Router()

router.post("/student_login", (req, res) => {
    const sql = "SELECT * from student Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response) {
                const email = result[0].email;
                const token = jwt.sign(
                    { role: "student", email: email, id: result[0].id, name: result[0].name},
                    "jwt_secret_key",
                    { expiresIn: "1d" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id });
            }
        })
        
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
  });

  router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
  })

  router.post('/add_leave', (req, res) => {

    const sql = "SELECT * from category Where id = ?"
    con.query(sql, [req.body.leave.category_id], (err, result) => {
         if(err) return res.json({Status: false, Error: "Query Error"})
         const sql1 = `INSERT INTO student_leave 
        (category_id, 
          from_date, 
          to_date , 
          student_id, 
          tutor , 
        warden ) 
        VALUES (?, ?, ?, ? ,?, ?) `
      con.query(sql1, 
            [req.body.leave.category_id, 
            req.body.leave.from, 
            req.body.leave.to, 
            req.body.leave.student_id,
            result[0].tutor,
            result[0].warden
          ], (err, result) => {
                if(err) return res.json({Status: false, Error: "Query Error"})
                return res.json({Status: true})
            })
     })
})

router.get('/leave/:s_id', (req, res) => {
  const id = req.params.s_id;
  const sql = "SELECT t1.*, t2.name FROM student_leave t1 LEFT JOIN category t2 ON t1.category_id = t2.id WHERE t1.student_id = ? ";
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.put('/cancel_leave/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE student_leave 
      set status = ?
      Where id = ?`
  const values = [
      'Cancelled',
  ]
 con.query(sql,[...values, id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  export {router as StudentRouter}