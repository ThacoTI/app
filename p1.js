const EfiPay = require('sdk-node-apis-efi')
const options = require('./teste')

let params = {
	id: 9,
}

const efipay = new EfiPay(options)

// O método pixGenerateQRCode indica os campos que devem ser enviados e que serão retornados
efipay.pixGenerateQRCode(params)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})