import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
if (process.env.AZURE !== 'true') {
    dotenv.config({ path: resolve(__dirname, '../../../../.env') });
}
;
function validacionConfiguracion() {
    const env = process.env;
    const cofiguracion = {};
    const obtenerEnv = (name) => {
        const value = env[name];
        if (!value) {
            console.error(`ERROR DE CONFIGURACION: La variable de entorno ${name} es obligatoria`);
            process.exit(1);
        }
        ;
        return value;
    };
    cofiguracion.DATABASE_URL = obtenerEnv('DATABASE_URL');
    const puertoStr = env.PORT || '8080';
    cofiguracion.PORT = parseInt(puertoStr, 10);
    if (isNaN(cofiguracion.PORT) || cofiguracion.PORT < 1 || cofiguracion.PORT > 65535) {
        console.error(`ERROR DE CONFIGURACION: PORT no es válido. Usando 8080.`);
        cofiguracion.PORT = 8080;
    }
    ;
    const nodeEnv = env.NODE_ENV || 'development';
    if (!['development', 'production', 'test'].includes(nodeEnv)) {
        console.error(`ERROR DE CONFIGURACION: NODE_ENV invalido. Usando 'development'`);
        cofiguracion.NODE_ENV = 'development';
    }
    else {
        cofiguracion.NODE_ENV = nodeEnv;
    }
    ;
    return cofiguracion;
}
;
export const configuracion = validacionConfiguracion();
//# sourceMappingURL=index.js.map