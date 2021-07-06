import dotenv from 'dotenv'
dotenv.config()
import Express from "express"
import Jwt from 'jsonwebtoken'
import bodyParser from "body-parser"
import axios from "axios"
import mysql from 'mysql'
import { OAuth2Client } from 'google-auth-library'




const app = Express()
const cliant = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(Express.json());       // to support JSON-encoded bodies
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static('../client/build'))


app.get('/', (req, res) => {
    res.sendFile('../client/build/index.html')
})


app.listen(5000, () => console.log("server started at port 5000"))



app.get("/news", authenticateToken, (req, res) => {

    axios.get("https://newsapi.org/v2/top-headlines?country=in&pageSize=30&apiKey=" + process.env.NEWSAPI_KEY).then(
        (resp) => res.send(resp.data)
    )

})


var connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'twitter'
});

connection.connect((err) => {
    if (!err) console.log("connected to surver")
    else console.log("connection failed")
});





// app.post('/login', (req, res) => {
//     //console.log(req)

//     let { username, password } = req.body
//     password = md5(password)

//     console.log(username)
//     console.log(password)

//     connection.query("SELECT password FROM people WHERE userid='" + username + "'", (error, results, fields) => {
//         if (error) console.log(error)
//         else
//             if (results.length == 0) {
//                 res.status(401).send(null)
//             }
//             else if (results[0].password == password) {

//                 const user = {
//                     "username": username
//                 }

//                 const accesstoken = Jwt.sign(user, "696969")

//                 res.status(200).send({
//                     token: accesstoken
//                 })
//             }
//             else res.status(403).send(null)
//         //console.log(results[0].password)
//         //console.log(fields)
//     })

//     //res.status(200).send()
// })



app.post("/login/google", (req, res) => {
    //console.log(req.body)
    const token = req.body.token
    const ticket = cliant.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID

    }).then((ticket) => {
        const { name, email, picture } = ticket.getPayload()
        //console.log(email)

        findOrCreateUser(name, email, picture)
        const user = {
            "username": email
        }

        const accesstoken = Jwt.sign(user, "696969")

        res.status(200).send({
            token: accesstoken
        })

    })



})

function findOrCreateUser(name, email, picture) {
    connection.query("SELECT * FROM people WHERE email='" + email + "'", (error, results, fields) => {
        if (results.length == 0) {
            console.log("new user")
            connection.query("INSERT INTO people VALUES('" + email + "','" + name + "','" + picture + "')", (error, results, fields) => {
                if (error) throw error
                else console.log("Successfully added new user")
            })

        }
        else console.log("user alrady exists")
    })
}



function authenticateToken(req, res, next) {

    try {
        const token = JSON.parse(req.headers.authorization.split(' ')[1]).token
        Jwt.verify(token, "696969", (err, user) => {
            console.log(user)
            if (err) res.status(403).send(null)
            else next()
        })

    } catch (error) {
        console.log("error")
        res.status(404).send(null)
    }




}




// app.post("/register", (req, res) => {
//     let { username, password } = req.body
//     password = md5(password)
//     console.log(username)
//     console.log(password)
//     connection.query("INSERT INTO people VALUES('" + username + "','" + password + "')", (error, results, fields) => {
//         if (error) res.status(400).send("ERROR")
//         else res.status(200).send("SUCCESSFULLY REGISTERED")
//     })

// })

app.get("/gettwits", authenticateToken, (req, res) => {
    connection.query("SELECT * FROM tweets", (err, results, fields) => {
        res.send(results)
    })
})

app.post("/posttwit", (req, res) => {

    try {
        const token = JSON.parse(req.headers.authorization.split(' ')[1]).token
        Jwt.verify(token, "696969", (err, user) => {
            console.log(user)
            if (err) res.status(403).send(null)

            var email = user.username


            //console.log(email)


            connection.query("SELECT * FROM people WHERE email='" + email + "'", (error, results, fields) => {

                if (error) {
                    console.log(error)
                    res.status(400).send(null)

                }
                //console.log(results)
                const name = results[0].name
                const picture = results[0].picture
                const content = req.body.content

                connection.query("INSERT INTO tweets (name ,emaill ,content ,picture) VALUES('" + name + "','" + email + "','" + content + "','" + picture + "')", (error, results, fields) => {
                    if (error) {
                        console.log(error)
                        res.status(400).send(null)
                    }
                    else {
                        console.log("success")
                        res.send("Success")
                    }



                })







            })



            // console.log(name)
            // console.log(picture)





        })

    } catch (error) {
        console.log(error)
        res.status(404).send(null)
    }

})
