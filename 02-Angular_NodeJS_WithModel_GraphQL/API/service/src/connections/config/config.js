require('dotenv').config();

const winston = require('winston');

exports.config = {
    dev: {
        database: 'claroEstudo', // nome do banco de dados, teremos uma pasta em models com o mesmo nome para pegar as models automaticamente
        userName: 'USER',
        userPass: 'PASS',
        host: 'HOST',
        port: 1433,
        dialect: 'mssql',
        use_env_variable: true,
        debug: true
    }
    // sqlite / mssql
};

exports.logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf((info) => {
                    const {
                        timestamp, level, message, ...args
                    } = info;

                    const ts = timestamp.slice(0, 19).replace('T', ' ');
                    return `${ts} [${level}]:${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
                }))
        })
    ]
});
