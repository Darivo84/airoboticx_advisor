require('dotenv').config();
const express = require("express");
const WebSocket = require('ws');
const { Pool } = require('pg');
const cors = require("cors");

const app = express();
const port = 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', (ws) => {
//   console.log('New client connected');
//   ws.send('Welcome to the WebSocket server!');

//   const sendDatabaseData = async () => {
//     try {
//       const result = await pool.query('SELECT * FROM public.aa_pred_intraday LIMIT 50');
//       ws.send(JSON.stringify(result.rows));
//     } catch (err) {
//       ws.send(JSON.stringify({ error: 'Database error' }));
//     }
//   };

//   sendDatabaseData();

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.send('Welcome to the WebSocket server!');

  const sendDatabaseData = async () => {
    try {
      const result = await pool.query('SELECT * FROM public.aa_pred_intraday LIMIT 50');
      ws.send(JSON.stringify(result.rows));
    } catch (err) {
      ws.send(JSON.stringify({ error: 'Database error' }));
    }
  };

  // Send data initially upon connection
  sendDatabaseData();

  // Optionally, set up an interval to send updated data periodically
  const intervalId = setInterval(sendDatabaseData, 10000); // every 10 seconds

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId); // Clear the interval when client disconnects
  });
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${ port }`);
});