import { client, connectDB } from "./db.js";
import { seedReservations, createReservation, getReservation} from "./reservation.js";
import { seedCustomers, getCustomers } from "./customer.js";
import { seedRestaurants, getRestaurants } from "./restaurant.js";


const startDB = async (seed = false) => {
    try{
        await connectDB();

        if (seed) {
            await client.query('DROP TABLE IF EXISTS reservations;');
            await seedCustomers();
            await seedRestaurants();
            await seedReservations();

            console.log(`Seeded was completed`)
        }
        return client;
    } catch (e){
        console.error('Failure to start database or seed database. Hopefully it is only one of them!')
    }
}

export const dbMethods = {
    customers: {
        getCustomers,
    },
    restaurants: {
        getRestaurants,
    },
    reservations: { 
        createReservation,
        getReservation,
    }
};

export default startDB;