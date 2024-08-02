const bcrypt = require('bcrypt');
const Seller = require('../models/sellerSchema.js');
const { createNewToken } = require('../utils/token.js');

const sellerRegister = async (req, res) => {
    try {
        console.log(req.body); // Log the incoming request data for debugging

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // Create a new Seller object with the provided data and hashed password
        const seller = new Seller({
            ...req.body,
            password: hashedPass
        });

        // Check if a seller with the same email already exists
        const existingSellerByEmail = await Seller.findOne({ email: req.body.email });
        if (existingSellerByEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Check if a shop with the same name already exists
        const existingShop = await Seller.findOne({ shopName: req.body.shopName });
        if (existingShop) {
            return res.status(400).json({ message: 'Shop name already exists' });
        }

        // Save the new seller
        let result = await seller.save();
        result.password = undefined; // Remove the password from the result for security

        // Create a token for the new seller
        const token = createNewToken(result._id);
        result = {
            ...result._doc, // Spread the result document
            token // Add the token to the result
        };

        // Send the result back to the client
        res.status(201).json(result);
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};


const sellerLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let seller = await Seller.findOne({ email: req.body.email });
        if (seller) {
            const validated = await bcrypt.compare(req.body.password, seller.password);
            if (validated) {
                seller.password = undefined;

                const token = createNewToken(seller._id)

                seller = {
                    ...seller._doc,
                    token: token
                };

                res.send(seller);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "User not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};

module.exports = { sellerRegister, sellerLogIn };
