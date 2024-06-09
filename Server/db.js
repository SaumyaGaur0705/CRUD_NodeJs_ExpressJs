import pg from 'pg';
const { Pool } = pg;
const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"users",
    password:"Srg$1978",
    port:5432,
});
export default pool;