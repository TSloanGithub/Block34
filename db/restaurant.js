import { client } from "./db.js";


export const seedRestaurants = async () =>{
    try{
        await client.query(`
            DROP TABLE IF EXISTS restaurants;
            CREATE TABLE IF NOT EXISTS restaurants (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(255) UNIQUE NOT NULL
            );

            INSERT INTO restaurants (name)
            VALUES ('Red Lobster') ;
            `)
    } catch(e){
        console.error(`Failure to seed restaurant`)
    }
}

export const getRestaurants = async () => {
    try{
        const {rows: restaurants} = await client.query(`
            SELECT * from restaurants;
            `);
        return restaurants;
    } catch(e){
        console.error('Failure to get restaurants')
    }
}