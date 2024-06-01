const express = require('express');
const {getProducts, filterBooks,getMyRecommendation,newProduct,updateProduct,getSingleProducts,deleteProduct}=require('../controller/ProductController')
const router = express.Router();
const {auth,isCustomer,isAdmin}=require('../middlewares/auth')


router.post('/filterBooks', filterBooks);
router.post('/myRecommendedBooks',getMyRecommendation);


router.get('/search',auth,getProducts);
router.post('/admin/product/new',auth,isAdmin,newProduct)
router.put('/admin/product/:id',auth,isAdmin,updateProduct).delete(auth,isAdmin,deleteProduct)
router.put('/Product/:id',getSingleProducts)
module.exports = router;