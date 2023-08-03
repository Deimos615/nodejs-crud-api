const express = require('express');
const { body } = require('express-validator');

const recruitmentController = require('../controllers/recruitment');
const uploadImage = require('../middleware/upload-image');

const router = express.Router();

router.get('/recruitments', recruitmentController.getAllRecruitments);

router.get('/recruitment/:recruitmentId', recruitmentController.getSingleRecruitment);

router.delete('/recruitment/:recruitmentId', recruitmentController.deleteRecruitment);

router.post('/recruitment', uploadImage,
    [
        body('email')
            .notEmpty()
            .withMessage('Please enter recruitment email!'),
        body('fullName')
            .notEmpty()
            .withMessage('Please enter recruitment full name!'),
        body('company')
            .notEmpty()
            .withMessage('Please enter recruitment company!'),
        body('subject')
            .notEmpty()
            .withMessage('Please enter recruitment subject!'),
        body('message')
            .notEmpty()
            .withMessage('Please enter recruitment message!'),
        // body('age')
        //     .notEmpty()
        //     .withMessage("Please enter the recruitment's age")
        //     .isInt()
        //     .withMessage("Age must be an integer"),
        // body('bio')
        //     .trim()
        //     .notEmpty()
        //     .withMessage("Please enter the recruitment's biography")
        //     .isLength({ min: 15 })
        //     .withMessage('The biography must be at least 15 characters'),
    ],
    recruitmentController.addRecruitment
);

router.put('/recruitment/:recruitmentId', uploadImage,
    [
        body('email')
            .notEmpty()
            .withMessage('Please enter recruitment email!'),
        body('fullName')
            .notEmpty()
            .withMessage('Please enter recruitment full name!'),
        body('company')
            .notEmpty()
            .withMessage('Please enter recruitment company!'),
        body('subject')
            .notEmpty()
            .withMessage('Please enter recruitment subject!'),
        body('message')
            .notEmpty()
            .withMessage('Please enter recruitment message!'),
        // body('age')
        //     .notEmpty()
        //     .withMessage("Please enter the recruitment's age")
        //     .isInt()
        //     .withMessage("Age must be an integer"),
        // body('bio')
        //     .trim()
        //     .notEmpty()
        //     .withMessage("Please enter the recruitment's biography")
        //     .isLength({ min: 15 })
        //     .withMessage('The biography must be at least 15 characters'),
    ],
    recruitmentController.updateRecruitment);

module.exports = router;