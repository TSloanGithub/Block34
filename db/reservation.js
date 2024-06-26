import { client } from "./db.js";


export const seedReservations = async ()=>{
    try{
        await client.query(`
            DROP TABLE if EXISTS reservations;
            CREATE TABLE if NOT EXISTS reservations (
                id SERIAL PRIMARY KEY,
                restaurant_name VARCHAR(255) REFERENCES restaurants(name) NOT NULL,
                customer_name VARCHAR(255) REFERENCES customers(customer_email) NOT NULL,
                reservation_date TIMESTAMP DEFAULT NULL
            )
            `)
    } catch (e){
        console.error('Failed to seed Reservations',e)
    }
}

export const createReservation = async ({
    customerName,
    restaurantName,
    reservation_date
}) =>{
    try{
        const { rows: createdReservations} = await client.query(`
            INSERT INTO
                reservations (restaurant_name, customer_name, reservation_date)
            VALUES
                ($1,$2, $3)
            RETURNING *;
            `, [restaurantName, customerName, reservation_date]);
            return createdReservations[0];
    } catch(e){
        console.error('Failure to create reservation',e)
    };
}

export const getReservation = async () => {
    try{
        const {rows: reservations} = await client.query(`
            SELECT reservations.reservation_date AS date, customers.customer_email AS customer_name, restaurants.name AS restaurant_name
            FROM reservations
            JOIN restaurants ON reservations.restaurant_name = restaurants.name
            JOIN customers ON reservations.customer_name = customers.customer_email;
            `)
        return reservations;
    } catch(e){
        console.error('Failure to get reservations')
    }
};