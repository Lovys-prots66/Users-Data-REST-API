import { createServer } from "node:http"
import { loadEnvFile } from "node:process"
import mysql from "mysql2/promise";

import { sendError } from "./utils/sendError.js";
import { sendResult } from "./utils/sendResult.js";
import { parseBody } from "./utils/parseBody.js";

loadEnvFile();

async function connection(){

  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10
    });
  
    const connexion = await pool.getConnection();
    
    return connexion;
    
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  }

  
}

const con = await connection();
con.release();




//import environment variables from .env
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

// create a server
const server = createServer( async (req, res) => {
    
    switch (req.method){
      
        case "GET":
          
          if(req.url.match(/\/api\/users\/([0-9]+)/)){

            const userId = req.url.split('/').pop();
            const [user] = await con.query("SELECT * FROM users WHERE id = ?", [userId]);

            try {
              
              if(!user){
                sendError(res, 404, 'Ressource not found');
              }

              sendResult(res, 200, user, 'max-age=3600');

            } catch (error) {
              sendError(res, 500, error.message.toString());
              process.exit(1);
            }
          }

          if(req.url !== "/api/users"){
            return;
          }
          
          try {
            const [users] = await con.query("SELECT * FROM users");
            
            if(!users){
              sendError(res, 404, 'Ressources not found');
            }
            
            sendResult(res, 200, users, 'max-age=3600');

          } catch (error) {
            sendError(res, 500, error.message.toString());
            process.exit(1);
          }

          break;

        case "POST":

          if(req.url = '/api/users'){
            
            let data = await parseBody(req);

            if(data){
              try{

                if(!data.first_name || !data.last_name || !data.email || !data.zip){
                  sendError(res, 400, 'All fields required');
                }
                
                const [result] = await pool.query("INSERT INTO users (id, first_name, last_name, email, zip) VALUES (?, ?, ?, ?, ?)",
                  [data.id, data.first_name, data.last_name, data.email, data.zip]
                );

                sendResult(res, 201, result);

              }catch(err){
                sendError(res, 500, err.message.toString());
                process.exit(1);
              }
            }
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
                sendError(res, 500, err.message.toString());
                process.exit(1);
              }
              
            }
          }

          break;

        case "DELETE":

          if(req.url.match(/\/api\/users\/([0-9]+)/)){
            const id = parseInt(req.url.split("/")[3]);

            try {
              if(id){
                const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
              }
              
            } catch (error) {
              sendError(res, 500, error.message.toString());
              process.exit(1);              
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