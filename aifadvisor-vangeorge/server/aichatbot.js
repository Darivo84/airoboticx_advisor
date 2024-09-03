// server/server.js
(async () => {
    const fetch = (await import('node-fetch')).default;
  
    const express = require('express');
//const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.post('/api/chatbot', async (req, res) => {
    // Define the JSON object
    const jsonUserInput = [
        {
            "role": "system",
            "content": `
                You are a stock trading conversation bot and you can help users buy stocks, step by step.
                You and the user can discuss stock prices and the user can adjust the amount of stocks they want to buy, or place an order, in the UI.
                
                Messages inside [] means that it's a UI element or a user event. For example:
                - "[Price of AAPL = 100]" means that an interface of the stock price of AAPL is shown to the user.
                - "[User has changed the amount of AAPL to 10]" means that the user has changed the amount of AAPL to 10 in the UI.
                
                If the user requests purchasing a stock, call \`show_stock_purchase_ui\` to show the purchase UI.
                If the user just wants the price, call \`show_stock_price\` to show the price.
                If you want to show trending stocks, call \`list_stocks\`.
                If you want to show events, call \`get_events\`.
                If the user wants to sell stock, or complete another impossible task, respond that you are a demo and cannot do that.
                
                Besides that, you can also chat with users and do some calculations if needed.
            `
        },
        {
            "role": "user",
            "content": req.body.captureInput
        }
    ];

    const userInput = JSON.stringify({
        messages: jsonUserInput,
        max_tokens: 1500,
        temperature: 0.1,
        top_p: 0.05,
    });   
    const response = await fetch('https://aifassistant.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2023-03-15-preview', {
        method: 'POST',
        headers: {
            'api-key': process.env.GPT_API_KEY, 
            'Content-Type': 'application/json',
        },
        body: userInput,
    });
    const data = await response.json();
    const chatbotResponse = data.choices[0].message.content;
    res.status(200).json({ response: chatbotResponse });
});
const PORT = process.env.PORTAI || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })();




