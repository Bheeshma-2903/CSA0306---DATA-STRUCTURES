// Employee Directory (BST) - zero-dependency Node.js server with a small REST API.
const http = require("http"), fs = require("fs"), path = require("path");
const PORT = process.env.PORT || 3000;
const DATA = path.join(__dirname, "data.json"), PUB = path.join(__dirname, "public");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css" };
// each row is [id, name, department, salary], stored in preorder so the tree shape is preserved
const valid = r => Array.isArray(r) && r.length <= 100000 && r.every(x => Array.isArray(x) && x.length === 4 &&
  Number.isFinite(x[0]) && typeof x[1] === "string" && typeof x[2] === "string" && Number.isFinite(x[3]));

http.createServer((req, res) => {
  const send = (c, b, t = "application/json") => { res.writeHead(c, { "Content-Type": t }); res.end(b); };
  const url = req.url.split("?")[0];
  if (url === "/api/employees") {
    if (req.method === "GET") {
      try { return send(200, JSON.stringify({ saved: true, rows: JSON.parse(fs.readFileSync(DATA)) })); }
      catch (e) { return send(200, JSON.stringify({ saved: false, rows: [] })); }
    }
    if (req.method === "PUT") {
      let body = "";
      req.on("data", c => { body += c; if (body.length > 5e7) req.destroy(); });
      req.on("end", () => {
        try {
          const rows = JSON.parse(body);
          if (!valid(rows)) return send(400, '{"error":"invalid employee data"}');
          fs.writeFileSync(DATA, JSON.stringify(rows)); send(200, '{"ok":true}');
        } catch (e) { send(400, '{"error":"bad json"}'); }
      });
      return;
    }
    return send(405, '{"error":"method not allowed"}');
  }
  const file = path.join(PUB, url === "/" ? "index.html" : path.normalize(url));
  if (!file.startsWith(PUB)) return send(403, "Forbidden", "text/plain");
  fs.readFile(file, (e, d) => e ? send(404, "Not found", "text/plain")
    : send(200, d, types[path.extname(file)] || "application/octet-stream"));
}).listen(PORT, () => console.log("Employee Directory running at http://localhost:" + PORT));
