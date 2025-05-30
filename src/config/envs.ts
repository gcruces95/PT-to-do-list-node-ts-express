import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').required().asString(),

    DB_URL: get('DB_URL').required().asString(),
    DB_HOST: get('DB_HOST').required().asString(),
    DB_USERNAME: get('DB_USERNAME').required().asString(),
    DB_NAME: get('DB_NAME').required().asString(),
    DB_PORT: get('DB_PORT').required().asPortNumber(),
    DB_PASSWORD: get('DB_PASSWORD').required().asString(),


}