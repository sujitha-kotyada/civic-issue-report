const http = require('http');
const ports = [4000, 5173, 5174];
(async () => {
  for (const p of ports) {
    await new Promise((res) => {
      const req = http.request({ host: '127.0.0.1', port: p, path: '/', method: 'GET', timeout: 3000 }, (r) => {
        console.log(`${p}: ${r.statusCode}`);
        res();
      });
      req.on('error', (e) => { console.log(`${p}: error: ${e.message}`); res(); });
      req.on('timeout', () => { console.log(`${p}: timeout`); req.destroy(); res(); });
      req.end();
    });
  }
})();
