const travel = require('../Models/addstory');

const isFavourite = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    const isFavourite  = req.body;

    try {
        const travelstory = await travel.findOne({ _id: id, userId: userId });

        if (!travelstory) {
            return res.status(404).json({ message: "Travel story not found" });
        }

        travelstory.isFavourite = isFavourite;
        await travelstory.save();

        res.status(200).json({
            message: "isFavourite updated successfully",
            story: travelstory,
            update: travelstory.isFavourite
        });
    } catch (error) {
        res.status(400).json({ message: error.message, error: true });
    }
};

module.exports = isFavourite;
