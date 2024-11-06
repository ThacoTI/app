/*const express = require('express');
const fs = require('fs');
const axios = require('axios');
const app = express();
app.use(express.json());

const autoload = `${__dirname}/vendor/autoload.php`;
if (!fs.existsSync(autoload)) {
    console.error(`Autoload file not found or on path ${autoload}.`);
    process.exit(1);
}

// Lê o arquivo json com suas credenciais
const options = JSON.parse(fs.readFileSync(`${__dirname}/credentials.json`, 'utf8'));

app.post('/cobrança', async (req, res) => {
    const body = {
        calendario: {
            expiracao: parseInt(req.body.expiracao, 10)
        },
        devedor: {
            cpf: req.body.cpf,
            nome: req.body.nome_cliente
        },
        valor: {
            original: req.body.valor // Ex: 0.01
        },
        chave: "31b69432-67c3-41a6-a4cf-2bef6f6477eb", // Chave pix da conta Efí do recebedor
        infoAdicionais: [
            {
                nome: "Produto/Serviço", // Nome do campo string (Nome) ≤ 50 characters
                valor: req.body.descricao // Dados do campo string (Valor) ≤ 200 characters
            }
        ]
    };

    try {
        const apiResponse = await axios.post('https://api.efipay.com.br/v2/cob', body, {
            headers: {
                'Authorization': `Bearer ${options.token}`, // Adicione o token de autenticação se necessário
                'Content-Type': 'application/json'
            }
        });

        const pix = apiResponse.data;

        if (pix.txid) {
            const params = {
                id: pix.loc.id
            };

            // Gera QRCode
            const qrcodeResponse = await axios.get(`https://api.efipay.com.br/v2/qrcode/${params.id}`);
            const qrcode = qrcodeResponse.data;

            const returnData = {
                code: 200,
                pix: pix,
                qrcode: qrcode
            };

            res.json(returnData);
        } else {
            res.json(pix);
        }
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});*/

/*const express = require('express');
const axios = require('axios');
const fs = require('fs');
const https = require('https');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const certificado = fs.readFileSync("C:/Users/samys/OneDrive/Documentos/GitHub/projeto_chacara/homologacao-625703-teste.p12");
const credenciais = {
  client_id: "Client_Id_b68f6e6f2227dcd14402e5f25247d9e6e64344bd",
  client_secret: "Client_Secret_97a367ae5d9d9383178cf427c988b898fbb091ab",
};

const auth = Buffer.from(`${credenciais.client_id}:${credenciais.client_secret}`).toString("base64");
const agent = new https.Agent({
  pfx: certificado,
  passphrase: "",
});

app.post('/cobranca', async (req, res) => {
  const txid = uuidv4();
  const cobrancaData = {
    calendario: { expiracao: 3600 },
    devedor: { cpf: req.body.cpf, nome: req.body.nome },
    valor: { original: req.body.valor },
    chave: "31b69432-67c3-41a6-a4cf-2bef6f6477eb",
    solicitacaoPagador: req.body.descricao,
  };

  try {
    const tokenResponse = await axios.post("https://pix-h.api.efipay.com.br/oauth/token", { grant_type: "client_credentials" }, {
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      httpsAgent: agent,
    });
    
    const accessToken = tokenResponse.data.access_token;

    const cobrancaResponse = await axios.post(`https://pix-h.api.efipay.com.br/v2/cob/${txid}`, cobrancaData, {
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    });

    res.json(cobrancaResponse.data);
  } catch (error) {
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});*/

/*const EfiPay = require('sdk-node-apis-efi')
const options = require('./teste')

let body = {
	calendario: {
		expiracao: 3600,
	},
	devedor: {
		cpf: '94271564656',
		nome: 'Gorbadock Oldbuck',
	},
	valor: {
		original: '0.01',
	},
	chave: '31b69432-67c3-41a6-a4cf-2bef6f6477eb', // Informe sua chave Pix cadastrada na efipay.	//o campo abaixo é opcional
	infoAdicionais: [
		{
			nome: 'Pagamento em',
			valor: 'Chacara das dez gotas',
		},
		{
			nome: 'Pedido',
			valor: 'NUMERO DO PEDIDO DO CLIENTE',
		},
	],
}

let params = {
	txid: 'dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVq111',
    
}

const efipay = new EfiPay(options)

// O método pixCreateCharge indica os campos que devem ser enviados e que serão retornados
efipay.pixCreateCharge(params, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})*/

   /* const EfiPay = require('sdk-node-apis-efi');
const options = require('./teste'); // Suas credenciais e configurações

// Corpo da cobrança
let body = {
    calendario: {
        expiracao: 3600,
    },
    devedor: {
        cpf: '94271564656',
        nome: 'Gorbadock Oldbuck',
    },
    valor: {
        original: '0.01',
    },
    chave: '31b69432-67c3-41a6-a4cf-2bef6f6477eb', // Sua chave Pix cadastrada na efipay
    infoAdicionais: [
        { nome: 'Pagamento em', valor: 'Chacara das dez gotas' },
        { nome: 'Pedido', valor: 'NUMERO DO PEDIDO DO CLIENTE' },
    ],
};

// Parâmetros para a cobrança
let params = {
    txid: 'W19AnnQyQ7Mz5Bz2Y3vY7lu7t8Ns7m9fB', // Identificador único da transação
};

// Instância do EfiPay
const efipay = new EfiPay(options);

// 1. Criação da Cobrança
efipay.pixCreateCharge(params, body)
    .then((resposta) => {
        console.log('Cobrança criada:', resposta);
        
        // 2. Utiliza o ID da cobrança para gerar o QR Code
        const qrcodeParams = { id: resposta.loc.id }; // ID da cobrança gerada

        efipay.pixGenerateQRCode(qrcodeParams)
            .then((qrcodeResposta) => {
                console.log('QR Code gerado:', qrcodeResposta);
            })
            .catch((error) => {
                console.error('Erro ao gerar QR Code:', error);
            });
    })
    .catch((error) => {
        console.error('Erro ao criar cobrança:', error);
    });*/

    /*const EfiPay = require('sdk-node-apis-efi');
const options = require('./teste'); // Suas credenciais e configurações
const crypto = require('crypto');

// Função para gerar o txid entre 26 e 35 caracteres
function gerarTxid() {
    const length = Math.floor(Math.random() * (35 - 26 + 1)) + 26;
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length).toUpperCase();
}

let body = {
    calendario: { expiracao: 3600 },
    devedor: { cpf: '94271564656', nome: 'Gorbadock Oldbuck' },
    valor: { original: '0.02' },
    chave: '31b69432-67c3-41a6-a4cf-2bef6f6477eb',
    infoAdicionais: [
        { nome: 'Pagamento em', valor: 'Chacara das dez gotas' },
        { nome: 'Pedido', valor: 'NUMERO DO PEDIDO DO CLIENTE' },
    ],
};

let params = { txid: gerarTxid() };

const efipay = new EfiPay(options);

// 1. Criação da Cobrança
efipay.pixCreateCharge(params, body)
    .then((resposta) => {
        console.log('Cobrança criada:', resposta);

        // 2. Utiliza o ID da cobrança para gerar o QR Code
        const qrcodeParams = { id: resposta.loc.id };

        efipay.pixGenerateQRCode(qrcodeParams)
            .then((qrcodeResposta) => {
                console.log('QR Code gerado:', qrcodeResposta);
            })
            .catch((error) => {
                console.error('Erro ao gerar QR Code:', error);
            });
    })
    .catch((error) => {
        console.error('Erro ao criar cobrança:', error);
    });*/


    // o de baixo está tudo coreto

    /*const express = require('express');
    const EfiPay = require('sdk-node-apis-efi');
    const options = require('./teste'); // Suas credenciais e configurações
    const crypto = require('crypto');
    
    // Criação do servidor
    const app = express();
    app.use(express.json()); // Para analisar o corpo das requisições como JSON
    
    // Função para gerar o txid entre 26 e 35 caracteres
    function gerarTxid() {
        const length = Math.floor(Math.random() * (35 - 26 + 1)) + 26;
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length).toUpperCase();
    }
    
    // Corpo da cobrança
    let body = {
        calendario: { expiracao: 3600 },
        devedor: { cpf: '94271564656', nome: 'Gorbadock Oldbuck' },
        valor: { original: '0.01' },
        chave: '31b69432-67c3-41a6-a4cf-2bef6f6477eb',
        infoAdicionais: [
            { nome: 'Pagamento em', valor: 'Chacara das dez gotas' },
            { nome: 'Pedido', valor: 'NUMERO DO PEDIDO DO CLIENTE' },
        ],
    };
    
    let params = { txid: gerarTxid() };
    
    const efipay = new EfiPay(options);
    
    // 1. Criação da Cobrança
    efipay.pixCreateCharge(params, body)
        .then((resposta) => {
            console.log('Cobrança criada:', resposta);
    
            // 2. Utiliza o ID da cobrança para gerar o QR Code
            const qrcodeParams = { id: resposta.loc.id };
    
            efipay.pixGenerateQRCode(qrcodeParams)
                .then((qrcodeResposta) => {
                    console.log('QR Code gerado:', qrcodeResposta);
                })
                .catch((error) => {
                    console.error('Erro ao gerar QR Code:', error);
                });
        })
        .catch((error) => {
            console.error('Erro ao criar cobrança:', error);
        });
        const PORT = 3001;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });*/
        /*const express = require('express');
    const EfiPay = require('sdk-node-apis-efi');
    const options = require('./teste'); // Suas credenciais e configurações
    const crypto = require('crypto');
    
    // Criação do servidor
    const app = express();
    app.use(express.json()); // Para analisar o corpo das requisições como JSON
    
    // Função para gerar o txid entre 26 e 35 caracteres
    function gerarTxid() {
        const length = Math.floor(Math.random() * (35 - 26 + 1)) + 26;
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length).toUpperCase();
    }
    
    // Corpo da cobrança
    let body = {
        calendario: { expiracao: 3600 },
        devedor: { cpf: '94271564656', nome: 'Gorbadock Oldbuck' },
        valor: { original: '0.01' },
        chave: '31b69432-67c3-41a6-a4cf-2bef6f6477eb',
        infoAdicionais: [
            { nome: 'Pagamento em', valor: 'Chacara das dez gotas' },
            { nome: 'Pedido', valor: 'NUMERO DO PEDIDO DO CLIENTE' },
        ],
    };
    
    let params = { txid: gerarTxid() };
    
    const efipay = new EfiPay(options);
    
    // 1. Criação da Cobrança
    efipay.pixCreateCharge(params, body)
        .then((resposta) => {
            console.log('Cobrança criada:', resposta);
    
            // 2. Utiliza o ID da cobrança para gerar o QR Code
            const qrcodeParams = { id: resposta.loc.id };
    
            efipay.pixGenerateQRCode(qrcodeParams)
                .then((qrcodeResposta) => {
                    console.log('QR Code gerado:', qrcodeResposta);
                })
                .catch((error) => {
                    console.error('Erro ao gerar QR Code:', error);
                });
        })
        .catch((error) => {
            console.error('Erro ao criar cobrança:', error);
        });*/

        // esse está certo, está gerando a cobrança e mostrando o link do qrcode
    
        const express = require('express');
        const EfiPay = require('sdk-node-apis-efi');
        const options = require('./teste'); // Suas credenciais e configurações
        const crypto = require('crypto');
        const path = require('path');
        const https = require("https");
        
        // Criação do servidor
        const app = express();
        
        // Configuração para servir o arquivo de autenticação
        app.use('/.well-known/pki-validation', express.static(path.join(__dirname, '.well-known/pki-validation')));
        
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'index.html')); // Serve seu arquivo HTML
        });
        
        // Função para gerar o txid entre 26 e 35 caracteres
        function gerarTxid() {
            const length = Math.floor(Math.random() * (35 - 26 + 1)) + 26;
            return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length).toUpperCase();
        }
        
        // Rota para criar a cobrança
        app.post('/criar-cobranca', (req, res) => {
            const cpf = req.body.cpf;
            const valor = parseFloat(req.body.valor / 2).toFixed(2);
            
            let body = {
                calendario: { expiracao: 3600 },
                devedor: { cpf: cpf, nome: 'Gorbadock Oldbuck' },
                valor: { original: valor },
                chave: '31b69432-67c3-41a6-a4cf-2bef6f6477eb',
                infoAdicionais: [
                    { nome: 'Pagamento em', valor: 'Chacara das dez gotas' },
                    { nome: 'Pedido', valor: 'NUMERO DO PEDIDO DO CLIENTE' },
                ],
            };
        
            let params = { txid: gerarTxid() };
        
            const efipay = new EfiPay(options);
            
            // Aqui é onde você deve apontar para a URL correta do webhook
            efipay.pixCreateCharge(params, body)
                .then((resposta) => {
                    const qrcodeParams = { id: resposta.loc.id };
                    efipay.pixGenerateQRCode(qrcodeParams)
                        .then((qrcodeResposta) => {
                            res.json({ link: qrcodeResposta.linkVisualizacao });
                        })
                        .catch((error) => {
                            console.error('Erro ao gerar QR Code:', error);
                            res.status(500).send('Erro ao gerar QR Code');
                        });
                })
                .catch((error) => {
                    console.error('Erro ao criar cobrança:', error);
                    res.status(500).send('Erro ao criar cobrança');
                });
        });
        
        // URL do webhook
        const webhookUrl = 'https://3195-2804-248-fc47-e00-65a5-8d-d454-250.ngrok-free.app/webhook/pix';
        // Use essa URL ao configurar o webhook
        
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
        

        /*const express = require('express');
        const EfiPay = require('sdk-node-apis-efi');
        const options = require('./teste'); // Suas credenciais e configurações
        const crypto = require('crypto');
        const path = require('path');
        // Criação do servidor
        const app = express();
        app.use(express.json()); // Para analisar o corpo das requisições como JSON
        app.use(express.urlencoded({ extended: true })); // Para analisar dados de formulário
        
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'index.html'));
        });
        // Função para gerar o txid entre 26 e 35 caracteres
        function gerarTxid() {
            const length = Math.floor(Math.random() * (35 - 26 + 1)) + 26;
            return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length).toUpperCase();
        }
        
        // Rota para criar a cobrança
        app.post('/criar-cobranca', (req, res) => {
            const cpf = req.body.cpf; // Captura o CPF do corpo da requisição
            const valor = req.body.valor; // Captura o valor do corpo da requisição
        
            // Corpo da cobrança
            let body = {
                calendario: { expiracao: 3600 },
                devedor: { cpf: cpf, nome: 'Gorbadock Oldbuck' }, // Utiliza o CPF capturado
                valor: { original: valor }, // Utiliza o valor capturado
                chave: '31b69432-67c3-41a6-a4cf-2bef6f6477eb',
                infoAdicionais: [
                    { nome: 'Pagamento em', valor: 'Chacara das dez gotas' },
                    { nome: 'Pedido', valor: 'NUMERO DO PEDIDO DO CLIENTE' },
                ],
            };
        
            let params = { txid: gerarTxid() };
        
            const efipay = new EfiPay(options);
        
            // 1. Criação da Cobrança
            efipay.pixCreateCharge(params, body)
                .then((resposta) => {
                    console.log('Cobrança criada:', resposta);
        
                    // 2. Utiliza o ID da cobrança para gerar o QR Code
                    const qrcodeParams = { id: resposta.loc.id };
        
                    efipay.pixGenerateQRCode(qrcodeParams)
                        .then((qrcodeResposta) => {
                            const linkVisualizacao = qrcodeResposta.linkVisualizacao; // Certifique-se de que isso é o que você precisa
                            console.log('Link de visualização:', linkVisualizacao);
                            res.json({ link: linkVisualizacao });
                        })
                        .catch((error) => {
                            console.error('Erro ao gerar QR Code:', error)
                            res.status(500).send('Erro ao gerar QR Code');
                        });
                })
                
                .catch((error) => {
                    console.error('Erro ao criar cobrança:', error);
                    res.status(500).send('Erro ao criar cobrança');
                });
        });
        const linkContainer = document.getElementById('linkContainer');
linkContainer.innerHTML = `<a href="${data.link}" target="_blank">Visualizar</a>`;

        const PORT = 3001;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });*/
        

        /*const express = require('express');
        const EfiPay = require('sdk-node-apis-efi');
        const options = require('./teste');
        const crypto = require('crypto');
        const path = require('path');
        

        
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true })); // Para capturar dados de formulários HTML
        

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'index.html'));
        });
        function gerarTxid() {
            const length = Math.floor(Math.random() * (35 - 26 + 1)) + 26;
            return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length).toUpperCase();
        }
        
        const efipay = new EfiPay(options);
        
        app.post('/criar-cobranca', (req, res) => {
            const { cpf, valor } = req.body;
        
            const body = {
                calendario: { expiracao: 3600 },
                devedor: { cpf, nome: 'Cliente' },
                valor: { original: valor },
                chave: '31b69432-67c3-41a6-a4cf-2bef6f6477eb',
                infoAdicionais: [
                    { nome: 'Pagamento em', valor: 'Chacara das dez gotas' },
                    { nome: 'Pedido', valor: 'NUMERO DO PEDIDO DO CLIENTE' },
                ],
            };
        
            const params = { txid: gerarTxid() };
        
            efipay.pixCreateCharge(params, body)
                .then((resposta) => {
                    console.log(resposta); // Adicione este log para depuração
                    const qrcodeParams = { id: resposta.loc.id };
        
                    efipay.pixGenerateQRCode(qrcodeParams)
                        .then((qrcodeResposta) => {
                            const qrCodeUrl = qrcodeResposta.imagemQrcode;
                            const qrCodeBase64 = qrcodeResposta.qrcode;
                            const linkVisualizacao = resposta.loc.linkVisualizacao; // Obtem o linkVisualizacao
        
                            res.send(`
                                <p>Link direto para o QR Code:</p>
                                <a href="${qrCodeUrl}" target="_blank">${qrCodeUrl}</a>
                                <p>Imagem em Base64:</p>
                                <img src="data:image/png;base64,${qrCodeBase64}" alt="QR Code para pagamento">
                                <p>Link de visualização da cobrança:</p>
                                <a href="${linkVisualizacao}" target="_blank">${linkVisualizacao}</a>
                            `);
                        })
                        .catch((error) => {
                            console.error('Erro ao gerar QR Code:', error);
                            res.status(500).send('Erro ao gerar QR Code');
                        });
                })
                .catch((error) => {
                    console.error('Erro ao criar cobrança:', error);
                    res.status(500).send('Erro ao criar cobrança');
                });
        });
        
        
        
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });*/
        