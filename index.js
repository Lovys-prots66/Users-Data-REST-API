import { createServer } from "node:http"
import { loadEnvFile } from "node:process"
import mysql from "mysql2/promise";

loadEnvFile();


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

const con = await pool.getConnection();

con.release();

const NotFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.setHeader("Content-type", "application/json");
  res.write(JSON.stringify({"Message" : "Ressource not found"}));
  res.end();
}

const SuccessHandler = () => {

}

const toJSON = (res, item) => {
  res.write(JSON.stringify(item));
}

//import environment variables from .env
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

// create a server
const server = createServer( async (req, res) => {
    
    switch (req.method){
      
        case "GET":
          
          res.setHeader("Content-type", "application/json");

          if(req.url.match(/\/api\/users\/([0-9]+)/)){

              const userId = req.url.split('/').pop();
              const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);

              if(user){
                  res.statusCode = 200;
                  res.write(JSON.stringify(user));
                  res.end();
                  return;
              }else{
                NotFoundHandler(req, res);
                res.end();
                return;
              }
          }

          if(req.url !== "/api/users"){
            NotFoundHandler(req, res);
            return;
          }
          
          const [users] = await pool.query("SELECT * FROM users")
            .catch(error => {
              console.error("Error fetching users:", error);
              res.statusCode = 500;
            });

          res.write(JSON.stringify(users));
          res.end();

          break;

        case "POST":

          if(req.url = '/api/users'){
            let data = '';

            req.on("data", chunk => {
              data += chunk.toString();
            });

            req.on("end", async () => {
              if(data){
                try{
                  const user = JSON.parse(data);
                  await pool.query("INSERT INTO users (id, first_name, last_name, email, zip) VALUES (?, ?, ?, ?, ?)",
                    [user.id ,user.first_name, user.last_name, user.email, user.zip]
                  );

                  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [user.id]);
                  res.statusCode = 201;
                  res.end(JSON.stringify(rows));
                }catch(err){
                  res.statusCode = 409;
                  res.end(JSON.stringify({"message" : err.message.toString()}))
                }
              }
            })
          }
          

          break;
        
        case "PUT":
          
          if(req.url.match(/\/api\/users\/([0-9]+)/)){
            let id = parseInt(req.url.split("/")[3]);
            
            if(id){
              try{
                let data = '';
                req.on('data', chunk => {
                  data += chunk;
                });
  
                const user = JSON.parse(data);
                req.on('end', () => {
                 pool.query("UPDATE users SET author_id= ?, text = ?, added_at = ?, likes = ?, dislikes = ?, category = ? WHERE id = ?", 
                    [user.first_name, user.last_name, user.email, user.zip, id]
                  )});
                  res.statusCode = 201;
                  res.end(); 
                
              }catch(err){

                NotFoundHandler(req, res);
                res.end();
              }
              
            }
          }

          break;

        case "DELETE":

          if(req.url.match(/\/api\/users\/([0-9]+)/)){
            const id = parseInt(req.url.split("/")[3]);

            if(id){
              await pool.query("DELETE FROM users WHERE id = ?", [id]);
            }
          }

          break;
    }
    // if(req.url === "/"){
    //     res.writeHead(200, {"content-type" : "application/json"});
    // }
})

server.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}/api/users`);
})