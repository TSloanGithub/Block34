import { Router } from "express";
import { dbMethods } from "../db/index.js";

export const apiRouter = Router();

apiRouter.get('/customers', async (req, res, next) =>{
    try{
        const customers = await dbMethods.customers.getCustomers();

        res.send({
            customers,
        });
    } catch (e){
        next(e);
    }
});

apiRouter.get('/restaurants', async(req, res, next) =>{
    try{
        const restaurants = await dbMethods.restaurants.getRestaurants();

        res.send({
            restaurants,
        });
    } catch(e){
        next(e);
    }
});
// need to do post and get reservations still
apiRouter.post('/reservations', async(req,res, next)=>{
    try{
        const {customerName, restaurantName, reservation_date} = req.body;
        const reservations = await dbMethods.reservations.createReservation({customerName, restaurantName, reservation_date})
        res.send({
            reservations,
        })
    }catch(e){
        console.error('Failed to create reservation',e);
    }
})
apiRouter.get('/reservations', async(req, res, next) =>{
    try{
        const reservations = await dbMethods.reservations.getReservation();

        res.send({
            reservations,
        });
    } catch(e){
        next(e);
    }
});