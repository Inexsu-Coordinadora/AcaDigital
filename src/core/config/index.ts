import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

if (process.env.AZURE !== 'true') {
  dotenv.config({ path: resolve(__dirname, '../../../../.env') });
}

export interface AppConfig {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: number;
    DATABASE_URL: string;
};

function validacionConfiguracion(): AppConfig {
    const env = process.env;
    const cofiguracion: Partial<AppConfig> = {};

    const obtenerEnv = (name: keyof AppConfig): string => {
        const value = env[name];
        if (!value) {
            console.error(`ERROR DE CONFIGURACION: La variable de entorno ${name} es obligatoria`);
            process.exit(1);
        };
        return value;
    };


    cofiguracion.DATABASE_URL = obtenerEnv('DATABASE_URL');

    const puertoStr = obtenerEnv('PORT');
    cofiguracion.PORT = parseInt(puertoStr, 10);

    if (isNaN(cofiguracion.PORT) || cofiguracion.PORT < 1 || cofiguracion.PORT > 65535) {
        console.error(`ERROR DE CONFIGURACION: PORT debe ser un numero valido (1-65535), Valor actual: ${puertoStr}`);
        process.exit(1);
    };

    const nodeEnv = env.NODE_ENV || 'development';
    if (!['development', 'production', 'test'].includes(nodeEnv)) {
        console.error(`ERROR DE CONFIGURACION: NODE_ENV invalido. Usando 'development'`);
        cofiguracion.NODE_ENV = 'development'; 
    } else {
        cofiguracion.NODE_ENV = nodeEnv as AppConfig['NODE_ENV'];
    };
    return cofiguracion as AppConfig;
};

export const configuracion: AppConfig = validacionConfiguracion();
