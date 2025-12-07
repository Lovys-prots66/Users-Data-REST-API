import { createServer } from "node:http"
import { loadEnvFile } from "node:process"
import mysql from "mysql2/promise";
import { error } from "node:console";
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

          if(req.url.match(/\/api\/posts\/([0-9]+)/)){

              const postId = req.url.split('/').pop();
              const [post] = await pool.query("SELECT * FROM posts WHERE id = ?", [postId]);

              if(post){
                  res.statusCode = 200;
                  res.write(JSON.stringify(post));
                  res.end();
                  return;
              }else{
                NotFoundHandler(req, res);
                res.end();
                return;
              }
          }

          if(req.url !== "/api/posts"){
            NotFoundHandler(req, res);
            return;
          }
          
          const [posts] = await pool.query("SELECT * FROM posts").catch(error => {
            console.error("Error fetching posts:", error);
            res.statusCode = 500;
          })
          res.write(JSON.stringify(posts));
          res.end()

          break;

        case "POST":

          if(req.url == "/api/posts"){
            let data = '';
  
            req.on('data', (chunk) => {
              data += chunk;
            });
  
            req.on('end', () => {
              posts.push(JSON.parse(data));
              res.statusCode = 201;
              toJSON(res, {"Message" : "Ressource added successfully"});
              res.end();
            })
          }

          break;
        
        // case "PUT":
          
        //   if(req.url.match(/\/api\/posts\/([0-9]+)/)){
        //     let id = req.url.split("/")[3];
            
        //     if(id){
        //       let data = '';
        //       req.on('data', chunk => {
        //       data += chunk;
        //       });

        //       req.on('end', () => {
        //         posts[id - 1] = JSON.parse(data);
        //         res.statusCode = 201;
        //         res.writeHead();
        //         res.end(); 
        //       });
              
        //     }else{
        //       NotFoundHandler(req, res);
        //       res.end();
        //     }
        //   }

        //   break;

        // case "DELETE":

        //   if(req.url.match(/\/api\/posts\/([0-9]+)/)){
        //     let id = parseInt(req.url.split("/")[3]);

        //     if(id){
        //       posts = posts.filter(post => post.id !== id);
        //       res.statusCode = 200;
        //       res.end();
        //     }
        //   }

        //   break;
    }
    // if(req.url === "/"){
    //     res.writeHead(200, {"content-type" : "application/json"});
    // }
})

server.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}/api/posts`);
})