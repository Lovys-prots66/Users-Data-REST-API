import { createServer } from "node:http"
import { loadEnvFile } from "node:process"

loadEnvFile();

let posts = [
  {
    id: 1,
    title: "The Rise of Modern JavaScript Frameworks",
    content:
      "JavaScript has evolved from a simple scripting language into the backbone of modern web development. Frameworks like React, Vue, and Svelte have transformed how developers architect interfaces, manage state, and scale massive applications. Learning a framework is now essential for building dynamic and maintainable user experiences.",
    author: "Skull Vlass",
    tags: ["JavaScript", "Web Development", "Frontend"],
    created_at: "2025-12-01T21:00:00Z"
  },

  {
    id: 2,
    title: "Why API Design Matters More Than Ever",
    content:
      "APIs form the foundation of communication between distributed systems. With microservices and mobile-first architectures, a poorly designed API can compromise performance and reliability. Good API design emphasizes clarity, consistency, and long-term maintainability.",
    author: "John Doe",
    tags: ["API", "Backend", "Architecture"],
    created_at: "2025-12-01T21:05:00Z"
  },

  {
    id: 3,
    title: "Mastering CSS Layouts in 2025",
    content:
      "CSS now offers powerful layout tools such as Grid, Flexbox, container queries, and :has(). Mastering these techniques enables developers to build responsive, efficient, and scalable designs without relying heavily on external frameworks.",
    author: "Dev Writer",
    tags: ["CSS", "Design", "Frontend"],
    created_at: "2025-12-01T21:10:00Z"
  }
];

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
const server = createServer((req, res) => {
  
  const message = {};
  
    switch (req.method){
      

        case "GET":
          
          res.setHeader("Content-type", "application/json");
          if(req.url.match(/\/api\/posts\/([0-9]+)/)){

              const postId = req.url.split('/').pop();
              const user = posts.find(post => post.id == Number(postId));

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

          if(req.url !== "/api/posts"){
            NotFoundHandler(req, res);
            return;
          }
          
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
        
        case "PUT":
          
          if(req.url.match(/\/api\/posts\/([0-9]+)/)){
            let id = req.url.split("/")[3];
            
            if(id){
              let data = '';
              req.on('data', chunk => {
              data += chunk;
              });

              req.on('end', () => {
                posts[id - 1] = JSON.parse(data);
                res.statusCode = 201;
                res.writeHead();
                res.end(); 
              });
              
            }else{
              NotFoundHandler(req, res);
              res.end();
            }
          }

          break;

        case "DELETE":

          if(req.url.match(/\/api\/posts\/([0-9]+)/)){
            let id = parseInt(req.url.split("/")[3]);

            if(id){
              posts = posts.filter(post => post.id !== id);
              res.statusCode = 200;
              res.end();
            }
          }

          break;
    }
    // if(req.url === "/"){
    //     res.writeHead(200, {"content-type" : "application/json"});
    // }
})

server.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}/api/posts`);
})