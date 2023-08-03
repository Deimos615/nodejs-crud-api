const Recruitment = require('../models/Recruitment');
const sydFunctions = require('../utils/syd-functions');

exports.getAllRecruitments = async (req, res, next) => {
    try {
        const list = await Recruitment.find()
        res.status(200).json({ message: "List of recruitments", list: list });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }
};

exports.getSingleRecruitment = async (req, res, next) => {
    const recruitmentId = req.params.recruitmentId;
    try {
        const recruitment = await Recruitment.findById(recruitmentId)
        if (!recruitment) {
            return res.status(404).json({ message: 'Recruitment not found!' });
        }
        res.status(200).json({ message: "Retrieved recruitment", recruitment: recruitment });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }

};

exports.addRecruitment = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation error', error: errorMessage });
    }

    const recruitment = new Recruitment({
        email: req.body.email,
        fullName: req.body.fullName,
        company: req.body.company,
        subject: req.body.subject,
        message: req.body.message,
    });

    try {
        const result = await recruitment.save()
        console.log('result', result);
        return res.status(201).json({
            message: "Recruitment is successfully added!",
            recruitment: result
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Creation failed!' });
    }
};

exports.updateRecruitment = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation failed!', error: errorMessage });
    }

    const recruitmentId = req.params.recruitmentId;
    try {
        const recruitment = await Recruitment.findById(recruitmentId);
        if (!recruitment) {
            sydFunctions.deleteImage(req.file.path.replace("\\", "/"));
            return res.status(404).json({ message: 'Recruitment not found!' });
        }
        if (photoUrl !== recruitment.photoUrl) {
            sydFunctions.deleteImage(recruitment.photoUrl);
        }
        recruitment.name = req.body.name;
        recruitment.age = req.body.age;
        recruitment.bio = req.body.bio;
        recruitment.photoUrl = photoUrl;
        const result = await recruitment.save();
        res.status(200).json({ 'message': 'Modification successfully completed!', recruitment: result });

    } catch (error) {
        console.log('error', error);
        if (req.file) {
            sydFunctions.deleteImage(recruitment.photoUrl);
        }
        res.status(500).json({ message: 'Update failed!' });
    }

};

exports.deleteRecruitment = async (req, res, next) => {
    const recruitmentId = req.params.recruitmentId;
    try {
        const recruitment = await Recruitment.findById(recruitmentId);
        if (!recruitment) {
            return res.status(404).json({ message: 'Recruitment not found!' });
        }

        sydFunctions.deleteImage(recruitment.photoUrl);
        await Recruitment.findByIdAndRemove(recruitmentId);
        res.status(200).json({ 'message': 'Deletion completed successfully!' });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Delete failed!' });
    }
};

