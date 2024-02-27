import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from employee Where email = ? and password = ? ";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id, name: result[0].name, category: result[0].category},
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`, `tutor`, `warden` ) VALUES (?, ?, ?)"
    con.query(sql, [req.body.category, req.body.tutor, req.body.warden], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

router.delete('/delete_category/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from category where id = ? "
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end imag eupload 

router.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee 
    (name,email,password, address, image, category) 
    VALUES (?)`;

    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.address, 
        req.file.filename,
        req.body.category
    ]
    con.query(sql, [values], (err, result) => {
        if(err) return res.json({Status: false, Error: err})
        return res.json({Status: true})
    })
})

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee WHERE id != '1' ";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        set name = ?, email = ?, address = ?, category = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.address,
        req.body.category
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/department_count', (req, res) => {
    const sql = "select count(id) as department from department";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/student_count', (req, res) => {
    const sql = "select sum(id) as student from student";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})


router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})


router.get('/department', (req, res) => {
    const sql = "SELECT * FROM department";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_department', (req, res) => {
    const sql = "INSERT INTO department (`name`) VALUES (?)"
    con.query(sql, [req.body.department], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

router.delete('/delete_department/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from department where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_student',upload.single('image'), (req, res) => {
    const sql = `INSERT INTO student 
    (rollno,name,email,password, address, phone, image, department) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.rollno,
            req.body.name,
            req.body.email,
            hash,
            req.body.address, 
            req.body.phone, 
            req.file.filename,
            req.body.department
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.get('/student', (req, res) => {
    const sql = "SELECT * FROM student";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/student/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_student/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE student 
        set rollno = ?, name = ?, email = ?, address = ?, department = ?, phone = ? 
        Where id = ?`
    const values = [
        req.body.rollno,
        req.body.name,
        req.body.email,
        req.body.address,
        req.body.department,
        req.body.phone
    ]
   const dp = con.query(sql,[...values, id], (err, result) => {
    console.log(dp.sql);
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_student/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from student where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/pending_leave/', (req, res) => {
    const type = req.query.type;
    console.log(req.query);
    if(type === 'Tutor'){
        const sql = "SELECT t1.*,t2.*,t3.name AS catname, t1.id AS leave_id FROM student_leave t1 LEFT JOIN student t2 ON t2.id = t1.student_id LEFT JOIN category t3 ON t3.id = t1.category_id WHERE t1.tutor = ? AND t1.warden = ? AND t1.status = 'Pending' ";
        con.query(sql, ['true', 'true'], (err, result) => {
            if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
        })
    } else if(type === 'Warden') {
        const sql = "SELECT t1.*,t2.*,t3.name AS catname, t1.id AS leave_id FROM student_leave t1 LEFT JOIN student t2 ON t2.id = t1.student_id LEFT JOIN category t3 ON t3.id = t1.category_id WHERE t1.tutor = ? AND t1.warden = ? AND t1.status = 'Pending'";
        con.query(sql, ['0', 'true'], (err, result) => {
            if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
        })
    }  else {
        const sql = "SELECT t1.*,t2.*,t3.name AS catname, t1.id AS leave_id FROM student_leave t1 LEFT JOIN student t2 ON t2.id = t1.student_id LEFT JOIN category t3 ON t3.id = t1.category_id WHERE t1.status = 'Pending' ";
        con.query(sql, (err, result) => {
            if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
        })
    }
})

router.put('/status_leave/:id', (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    const type = req.body.type;
 
    if(type === 'Tutor'){
        if(status === 'Accepted'){
        const sql = `UPDATE student_leave 
                    set tutor = ?
                    Where id = ?`
        con.query(sql, ['0', id], (err, result) => {
            if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
        })
        } else {
            const sql = `UPDATE student_leave 
            set status = ? , tutor = ?
            Where id = ?`
            con.query(sql, [status ,'0', id], (err, result) => {
            if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
            })
        }
    } else if(type === 'Warden') {
        const sql = `UPDATE student_leave 
        set status = ? , warden = ?
        Where id = ?`
        con.query(sql, [status ,'0', id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
        })
    }  else {
        const sql = `UPDATE student_leave 
        set status = ? , tutor = ?,  warden = ?
        Where id = ?`
        con.query(sql, [status ,'0','0', id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
        })
    }
})

router.get('/completed_leave/', (req, res) => {
    const sql = "SELECT t1.*,t2.*,t3.name AS catname, t1.id AS leave_id FROM student_leave t1 LEFT JOIN student t2 ON t2.id = t1.student_id LEFT JOIN category t3 ON t3.id = t1.category_id WHERE t1.status != 'Pending' ";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

export { router as adminRouter };
