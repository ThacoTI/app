/*const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// Rota do webhook
app.post('/webhook', (req, res) => {
    const notificationData = req.body;
    console.log('Notificação recebida:', notificationData);
    res.status(200).send('Recebido');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});*/


/*const express = require('express');
const app = express();
app.use(express.json());

// Função para salvar dados no banco
async function salvarDadosPix(endToEndId, txid, evento) {
    console.log(`Salvando no banco: ${endToEndId}, ${txid}, ${evento}`);
}

// Rota de Webhook para o caminho `/webhook-pix/pix`
app.post('/webhook-pix/', async (req, res) => {
    const pixEventos = req.body.pix || []; // Array de eventos Pix recebidos

    for (const evento of pixEventos) {
        const endToEndId = evento.endToEndId;
        const txid = evento.txid;

        // Salva os dados no banco
        await salvarDadosPix(endToEndId, txid, evento);
    }

    res.status(200).send('Notificações de Pix processadas');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});*/

/*const express = require("express");
const fs = require("fs");
const https = require("https");
const logger = require("morgan");
const path = require("path");

const httpsOptions = {
  cert: fs.readFileSync("certificate.crt"),
  key: fs.readFileSync("private.key"),
  ca: fs.readFileSync("certificate-chain-prod.crt"),
  minVersion: "TLSv1.2",
  requestCert: true,
  rejectUnauthorized: true,
};

const app = express();
const httpsServer = https.createServer(httpsOptions, app);
const PORT = 443;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoint para configuração do webhook
app.post("/webhook", (request, response) => {
  if (request.socket.authorized) {
    response.status(200).send("Webhook configurado com sucesso");
  } else {
    response.status(401).send("Não autorizado");
  }
});

// Endpoint para recepção do webhook
app.post("/webhook/pix", (request, response) => {
  if (request.socket.authorized) {
    const notificationData = request.body;
    console.log("Notificação recebida:", notificationData);

    // Processa a notificação do Pix
    response.status(200).send("Notificação processada");
  } else {
    response.status(401).send("Não autorizado");
  }
});

httpsServer.listen(PORT, () => {
  console.log(`Servidor HTTPS rodando na porta ${PORT}`);
});*/
const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require("path");
const EfiPay = require("sdk-node-apis-efi");
const options = require("./teste");

// Ativação de mTLS
options["validateMtls"] = false;

const app = express();
const PORT = 443;

// Configurações HTTPS
const httpsOptions = {
  cert: fs.readFileSync("certificate.crt"),
  key: fs.readFileSync("private.key"),
  ca: fs.readFileSync("certificate-chain-prod.crt"),
  minVersion: "TLSv1.2",
  requestCert: true,
  rejectUnauthorized: true,
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do webhook
app.post("/configurar-webhook", (req, res) => {
  const efipay = new EfiPay(options);
  const body = { webhookUrl: "https://3195-2804-248-fc47-e00-65a5-8d-d454-250.ngrok-free.app/webhook/pix" };
  const params = { chave: "31b69432-67c3-41a6-a4cf-2bef6f6477eb" };

  efipay.pixConfigWebhook(params, body)
    .then((resposta) => res.send("Webhook configurado: " + JSON.stringify(resposta)))
    .catch((error) => res.status(500).send("Erro ao configurar webhook: " + JSON.stringify(error)));
});
function validarAssinatura(body, signature, secretKey) {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(JSON.stringify(body));
  const calculatedSignature = hmac.digest('hex');
  return calculatedSignature === signature;
}
function salvarPagamentos(pagamentos) {
  fs.writeFileSync('pagamentos.json', JSON.stringify(pagamentos, null, 2));
}

// Função para carregar os pagamentos de um arquivo JSON
function carregarPagamentos() {
  try {
    return JSON.parse(fs.readFileSync('pagamentos.json'));
  } catch (err) {
    return [];
  }
}
// Endpoint de recepção de notificações Pix
app.post('/webhook/pix', (req, res) => {
  if (req.socket.authorized) {
    const { body, headers } = req;
    const signature = headers['x-efipay-signature'];
    const secretKey = options.secretKey;

    if (validarAssinatura(body, signature, secretKey)) {
      const novoPagamento = {
        tid: body.tid,
        status: body.status,
        // ... outros dados
      };

      // Carregar os pagamentos existentes
      let pagamentos = carregarPagamentos();

      // Adicionar o novo pagamento
      pagamentos.push(novoPagamento);

      // Salvar os pagamentos no arquivo
      salvarPagamentos(pagamentos);

      res.status(200).send('Notificação processada');
    } else {
      console.error('Assinatura inválida');
      res.status(401).send('Assinatura inválida');
    }
  } else {
    res.status(401).send('Não autorizado');
  }
});

// Inicializar o servidor HTTPS
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
