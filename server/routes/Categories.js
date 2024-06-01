
const express = require('express');
const router=express.Router()
const {updateFavoriteCategories}=require('../controller/CategoryController')

router.post('/updateFavCategory', updateFavoriteCategories);


module.exports = router;
