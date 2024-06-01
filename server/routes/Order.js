const express = require('express');
const router=express.Router()
const {newOrder,myOrders,getSingleOrder,updateOrder,deleteOrder}=require('../controller/orderController');
const {auth, isCustomer,isAdmin, } = require('../middlewares/auth');

router.post('/order/new',auth,isCustomer,newOrder);

router.get('/order/me',auth,isCustomer,myOrders);

router.get('/order/:id',auth,isAdmin,getSingleOrder)

router.put('order/:id',auth,isAdmin,updateOrder).delete(auth,isCustomer,deleteOrder)

module.exports = router;
