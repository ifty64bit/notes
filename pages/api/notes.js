import mysql from 'mysql'

const connection = mysql.createConnection({
    host     : 'db4free.net',
    user     : 'iftyislam',
    password : 'iftyislam',
    database : 'iftyislam'
});

export const config = {
    api: {
      externalResolver: true,
    },
  }
  
export default function handler(req, res) {
    if (req.method == "GET")
    {
        console.log("HIT ON GET");
        //connection.connect();
        connection.query("SELECT * FROM notes", (err, _res) => {
            if (err) {
                console.log(err);
                res.send("Error Geting Notes");
            }
            else {
                res.json(_res);
            }
        });
    }
    else if (req.method == "POST")
    {
        console.log("HIT ON POST");
        //connection.connect();
        connection.query(`INSERT INTO notes (title,note) VALUES ('${req.body.title}', '${req.body.note}')`, (err, _res) => {
            if (err) {
                console.log(err);
                res.send("Error Saving Notes");
            }
            else {
                res.json(_res);
            }
        });
    }
    else if (req.method == "PATCH")
    {
        console.log("HIT ON PATCH");
        //connection.connect();
        connection.query(`UPDATE notes SET title='${req.body.title}', note='${req.body.note}' WHERE id='${req.body.id}';`, (err, _res) => {
            if (err) {
                console.log(err);
                res.send("Error Updating Notes");
            }
            else {
                res.json(_res);
            }
        });
    }
    else if (req.method == "DELETE")
    {
        console.log("HIT ON DELETE");
        console.log(req.body.id);
        connection.query(`DELETE FROM notes WHERE id='${req.body.id}';`, (err, _res) => {
            if (err) {
                console.log(err);
                res.send("Error Deleting Notes");
            }
            else {
                res.json(_res);
            }
        })
    }
    else {
        
    };
  }