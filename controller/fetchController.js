const CardDetails = require("../model/cardData");

const fetchStatus = async (req, res) => {
    const id = req.query.id;
    console.log(id);
    try {
        if (id.length >= 9) {
            const data = await CardDetails.findOne({ UserContact: id });
            console.log(data);
            console.log(data.Comment);
            res.status(200).json({ Status: data.Comment });
        } else {
            const data = await CardDetails.findOne({ CardId: id });
            console.log(data);
            console.log(data.Comment);
            res.status(200).json({ Status: data.Comment });
        }
    } catch (error) {
        res.send({ status: 400, message: error.message });
    }
};
module.exports = fetchStatus;