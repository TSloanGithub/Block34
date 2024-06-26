import { client } from "./db.js";

export const seedCustomers = async () => {
    try{
        await client.query(`
            DROP TABLE IF EXISTS customers;
            CREATE TABLE IF NOT EXISTS customers (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                customer_email VARCHAR(255) UNIQUE NOT NULL
            );

            INSERT INTO customers (customer_email)
            VALUES ('tcsloan44@gmail.com')
            `)
    } catch(e){
        console.error('Failed to seed customers')
    }
}

export const getCustomers = async () =>{
    try{
        const { rows: customers} = await client.query(`
            SELECT * from customers;
            `);
        return customers;
    } catch(e){
        console.error('Failure to get customers!')
    }
}