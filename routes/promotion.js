const express = require('express');
const { body } = require('express-validator');

const promotionController = require('../controllers/promotion');
const uploadImage = require('../middleware/upload-image');

const router = express.Router();

router.get('/promotions', promotionController.getAllPromotions);

router.get('/promotion/:promotionId', promotionController.getSinglePromotion);

router.delete('/promotion/:promotionId', promotionController.deletePromotion);

router.post('/promotion', uploadImage,
    [
        body('email')
            .notEmpty()
            .withMessage('Please enter promotion email!'),
        body('fullName')
            .notEmpty()
            .withMessage('Please enter promotion full name!'),
        body('company')
            .notEmpty()
            .withMessage('Please enter promotion company!'),
        body('subject')
            .notEmpty()
            .withMessage('Please enter promotion subject!'),
        body('product')
            .notEmpty()
            .withMessage('Please enter promotion product!'),
        body('message')
            .notEmpty()
            .withMessage('Please enter promotion message!'),
        // body('age')
        //     .notEmpty()
        //     .withMessage("Please enter the promotion's age")
        //     .isInt()
        //     .withMessage("Age must be an integer"),
        // body('bio')
        //     .trim()
        //     .notEmpty()
        //     .withMessage("Please enter the promotion's biography")
        //     .isLength({ min: 15 })
        //     .withMessage('The biography must be at least 15 characters'),
    ],
    promotionController.addPromotion
);

router.put('/promotion/:promotionId', uploadImage,
    [
        body('email')
            .notEmpty()
            .withMessage('Please enter promotion email!'),
        body('fullName')
            .notEmpty()
            .withMessage('Please enter promotion full name!'),
        body('company')
            .notEmpty()
            .withMessage('Please enter promotion company!'),
        body('subject')
            .notEmpty()
            .withMessage('Please enter promotion subject!'),
        body('product')
            .notEmpty()
            .withMessage('Please enter promotion product!'),
        body('message')
            .notEmpty()
            .withMessage('Please enter promotion message!'),
        // body('age')
        //     .notEmpty()
        //     .withMessage("Please enter the promotion's age")
        //     .isInt()
        //     .withMessage("Age must be an integer"),
        // body('bio')
        //     .trim()
        //     .notEmpty()
        //     .withMessage("Please enter the promotion's biography")
        //     .isLength({ min: 15 })
        //     .withMessage('The biography must be at least 15 characters'),
    ],
    promotionController.updatePromotion);

module.exports = router;