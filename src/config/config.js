const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                bd_string: 'mongodb+srv://usuario_admin:190893hugo@clusterapi-1ore2.mongodb.net/test?retryWrites=true',
                jwt_pass: 'batatafrita2019',
                jwt_expires: '7d'
            }

        case 'hml':
            return {
                bd_string: 'mongodb+srv://usuario_admin:190893hugo@clusterapi-1ore2.mongodb.net/test?retryWrites=true',
                jwt_pass: 'batatafrita2019',
                jwt_expires: '1000'
            }

        case 'prod':
            return {
                bd_string: 'mongodb+srv://usuario_admin:190893hugo@clusterapi-1ore2.mongodb.net/test?retryWrites=true',
                jwt_pass: 'batatafrita2019',
                jwt_expires: '1000'
            }
    }
}

//EM CASOS REAIS, O BANCO DE DADOS DE PRODUÇÃO E HOMOLOGAÇÃO, NÃO DEVEM SER O MESMO BANCO DE DEV

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config;