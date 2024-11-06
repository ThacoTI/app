const EfiPay = require('sdk-node-apis-efi');
const options = require('./teste');

options['validateMtls'] = false;

const body = {
    webhookUrl: 'https://3195-2804-248-fc47-e00-65a5-8d-d454-250.ngrok-free.app/webhook-pix',
};

const params = {
    chave: '31b69432-67c3-41a6-a4cf-2bef6f6477eb',
};

const efipay = new EfiPay(options);

efipay.pixConfigWebhook(params, body)
    .then((resposta) => {
        console.log('Webhook configurado:', resposta);
    })
    .catch((error) => {
        console.error('Erro ao configurar webhook:', error);
    });
