const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(
      `<html>
        <head>
            <title>Assignment - 1</title>
        </head>
        <body>
            <main>
                <div style="margin: 0 auto">
                    <h1 style="text-align: center">Welcome to my server</h1>
                    <form action="/create-users" method="POST">
                        <input type="text" name="user"/>
                        <button type="submit">Click Here</button>
                    </form>
                </div>
            </main>
         </body>
      </html>`
    );
    return res.end();
  }

  if (url === "/users") {
    res.write(
      `<html>
        <head>
            <title>Assignment - 1</title>
        </head>
        <body>
            <main>
                <div style="margin: 0 auto">
                    <h1 style="text-align: center">Users</h1>
                     <ul>
                         <li>user-1</li>
                         <li>user-2</li>
                         <li>user-3</li>
                         <li>user-4</li>
                     </ul>
                </div>
            </main>
         </body>
      </html>`
    );
    return res.end();
  }

  if (url === "/create-users" && method === "POST") {
    console.log("hello");
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parserBody = Buffer.concat(body).toString();
      const user = parserBody.split("=")[1];
      fs.writeFileSync("test.txt", user);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
});

module.exports = server;
