const Promotion = require('../models/Promotion');
const sydFunctions = require('../utils/syd-functions');

exports.getAllPromotions = async (req, res, next) => {
    try {
        const list = await Promotion.find()
        res.status(200).json({ message: "List of promotions", list: list });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }
};

exports.getSinglePromotion = async (req, res, next) => {
    const promotionId = req.params.promotionId;
    try {
        const promotion = await Promotion.findById(promotionId)
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found!' });
        }
        res.status(200).json({ message: "Retrieved promotion", promotion: promotion });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }

};

exports.addPromotion = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation error', error: errorMessage });
    }
    if (!req.file) {
        return res.status(422).json({ message: 'Please add an image!' });
    }

    const promotion = new Promotion({
        email: req.body.email,
        fullName: req.body.fullName,
        company: req.body.company,
        subject: req.body.subject,
        product: req.body.product,
        message: req.body.message,
        file: req.file.path.replace("\\", "/") // If you are on Linux or Mac just use req.file.path
    });

    try {
        const result = await promotion.save()
        console.log('result', result);
        return res.status(201).json({
            message: "Promotion is successfully added!",
            promotion: result
        });
    } catch (error) {
        console.log('error', error);
        if (req.file) {
            sydFunctions.deleteImage(promotion.file);
        }
        res.status(500).json({ message: 'Creation failed!' });
    }
};

exports.updatePromotion = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation failed!', error: errorMessage });
    }

    let photoUrl = req.body.image;
    if (req.file) {
        photoUrl = req.file.path.replace("\\", "/");
    }
    if (!photoUrl) {
        return res.status(422).json({ message: 'Please add an image!' });
    }

    const promotionId = req.params.promotionId;
    try {
        const promotion = await Promotion.findById(promotionId);
        if (!promotion) {
            sydFunctions.deleteImage(req.file.path.replace("\\", "/"));
            return res.status(404).json({ message: 'Promotion not found!' });
        }
        if (photoUrl !== promotion.photoUrl) {
            sydFunctions.deleteImage(promotion.photoUrl);
        }
        promotion.name = req.body.name;
        promotion.age = req.body.age;
        promotion.bio = req.body.bio;
        promotion.photoUrl = photoUrl;
        const result = await promotion.save();
        res.status(200).json({ 'message': 'Modification successfully completed!', promotion: result });

    } catch (error) {
        console.log('error', error);
        if (req.file) {
            sydFunctions.deleteImage(promotion.photoUrl);
        }
        res.status(500).json({ message: 'Update failed!' });
    }

};

exports.deletePromotion = async (req, res, next) => {
    const promotionId = req.params.promotionId;
    try {
        const promotion = await Promotion.findById(promotionId);
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found!' });
        }

        sydFunctions.deleteImage(promotion.photoUrl);
        await Promotion.findByIdAndRemove(promotionId);
        res.status(200).json({ 'message': 'Deletion completed successfully!' });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Delete failed!' });
    }
};

