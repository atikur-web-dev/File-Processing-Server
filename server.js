import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  console.log(`📨 ${method} ${url}`);

  // Set headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  try {
    if (url === "/" && method === "GET") {
      res.writeHead(200);
      res.end(
        JSON.stringify({
          message: "🚀 File Processing Server is running!",
          repository:
            "https://github.com/atikur-web-dev/File-processing-server",
          endpoints: ["/api/info", "/api/system", "/api/files"],
          timestamp: new Date().toISOString(),
        })
      );
    } else if (url === "/api/info" && method === "GET") {
      res.writeHead(200);
      res.end(
        JSON.stringify({
          name: "File Processing Server",
          version: "1.0.0",
          author: "Atikur Rahman",
          github: "https://github.com/atikur-web-dev",
          coreModules: [
            "http",
            "fs",
            "path",
            "crypto",
            "stream",
            "events",
            "os",
            "url",
            "querystring",
            "util",
          ],
        })
      );
    } else if (url === "/api/system" && method === "GET") {
      res.writeHead(200);
      res.end(
        JSON.stringify({
          platform: os.platform(),
          architecture: os.arch(),
          cpus: os.cpus().length,
          memory: {
            total: Math.round(os.totalmem() / (1024 * 1024)) + " MB",
            free: Math.round(os.freemem() / (1024 * 1024)) + " MB",
          },
          uptime: Math.round(os.uptime() / 60) + " minutes",
        })
      );
    } else {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          error: "Endpoint not found",
          availableEndpoints: ["/", "/api/info", "/api/system"],
        })
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`
🎉 File Processing Server Started!

📍 Server: http://localhost:${PORT}
📊 API Info: http://localhost:${PORT}/api/info
🖥️ System: http://localhost:${PORT}/api/system

📂 Repository: https://github.com/atikur-web-dev/File-processing-server
👨💻 Developer: Atikur Rahman
    `);
});
