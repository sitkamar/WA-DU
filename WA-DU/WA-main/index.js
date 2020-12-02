
const bodyParser = require("body-parser");
const express = require("express");

        const app = express();


        app.use(express.static(__dirname + './../public'));
        app.use(bodyParser.urlencoded({ extended: true }));

        app.get("/", function (req, res) {
            res.sendFile(__dirname + "/public/index.html");
        });

        app.post("/", function (req, res) {
            const responseObj = { "response": { "amount": Number(req.body.amount), "cryptoCurr": req.body.crypto, "currency": req.body.money } };
            if (checkServerStatus()) {
                fetchRates(res, responseObj);
            } else {
                res.send(`Servers are down, try again later`);
            }
        });

        app.listen(8080);
    

    replaceLabelContent(content) {
        const CrToCu = `${content.response.cryptoCurr} to ${content.response.currency}`;
        const Rate = `${content.response.rate}`;
        const CuToCr = `${content.response.currency} to ${content.response.cryptoCurr}`;
    const Rate2 = `${Number(1 / content.response.rate).toFixed(7)}`;
        const conversion = `Value of ${content.response.amount} ${content.response.cryptoCurr}: ${Number(content.response.conversion).toFixed(7)}${content.response.currency}`;
        const Html = `<!DOCTYPE html>
<html lang="en">

<head>
    <title>MeagConverter</title>
</head>

<body>
    <h1>Mega Cryptocurrency convertor</h1>
    <form action="./" method="post">
        <div>
            <div>
                <table id="table">
                    <tr>
                        <th>Amount</th>
                        <th>Rate</th>
                    </tr>
                    <tr>
                        <th>${CrToCu}</th>
                        <th>${Rate}</th>
                    </tr>
                    <tr>
                        <th>${CuToCr}</th>
                        <th>${Rate2}</th>
                    </tr>
                </table>
            </div>
            <div>
                <label>${conversion}</label>
            </div>
        </div>
        <div>
            <input type="button" value="Back" onclick="window.history.back()" /> 
        </div>
    </form>
</body>
</html>`;
        res !== undefined ? res.send(Html) : console.log('Error');
    }


const https = require('https');
const main = require('./../index');
var res = undefined;


    fetchRates(resForInit, responseObj) {
        let crypto = responseObj.response.cryptoCurr;
        let curr = responseObj.response.currency;

        switch (crypto) {
            case 'BTC':
                crypto = 'bitcoin';
                break;
            case 'LTC':
                crypto = 'litecoin';
                break;
            case 'XMR':
                crypto = 'monero';
                break;
            case 'DGB':
                crypto = 'digibyte';
                break;
            default:
                return 'Error';
        }
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${curr}`;
        https.get(url, res => {
            let body = '';
            res.on('data', chunk => {
                body += chunk;
            })
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    let resRate = 'Error';
                    switch (crypto) {
                        case 'bitcoin':
                            resRate = json.bitcoin;
                            break;
                        case 'litecoin':
                            resRate = json.litecoin;
                            break;
                        case 'monero':
                            resRate = json.monero;
                            break;
                        case 'digibyte':
                            resRate = json.digibyte;
                            break;
                        default:
                            return 'Error';
                    }
                    switch (curr) {
                        case 'CZK':
                            resRate = resRate.czk;
                            break;
                        case 'EUR':
                            resRate = resRate.eur;
                            break;
                        case 'USD':
                            resRate = resRate.usd;
                            break;
                        default:
                            return 'Error';
                    }
                    if (rate === 'Error') return res.send(`Problem`);
                    responseObj.response.rate = rate;
                    const conversion = responseObj.response.amount * rate;
                    responseObj.response.conversion = conversion;
                    main.utils.replaceLabelContent(responseObj);
                } catch (err) {
                }
            }).on('error', error => {
                return 'Error';
            })
        })
    }






