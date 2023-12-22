const csv = require("csvtojson");
const CardDetails = require("../model/cardData");

const importData = async (req, res) => {
    try {
        // console.log("Running");
        // console.log(req);
        for (const file of req.files) {
            csv().fromFile(file.path).then(async (res) => {
                var CardData = [];
                // console.log(res);
                var temp = "", Mobile;
                for (let i = 0; i < res.length; i++) {
                    if (Object.entries(res[i])[2][1][0] === '"') {
                        temp = Object.entries(res[i])[2][1].substring(1, Object.entries(res[i])[2][1].length - 1);
                    }
                    if (temp.length > 9) {
                        Mobile = temp.slice(-9);
                    } else {
                        Mobile = Object.entries(res[i])[2][1];
                    }
                    CardData.push({
                        Id: Object.entries(res[i])[0][1],
                        CardId: Object.entries(res[i])[1][1],
                        UserContact: Mobile,
                        Timestamp: Object.entries(res[i])[3][1],
                        Comment: (res[i].Comment === undefined ? "" : res[i]["Comment"])
                    })
                }
                // console.log(CardData);
                for (const element of CardData) {
                    const filter = { CardId: element.CardId };
                    const update = {
                        $set: {
                            Id: element.Id,
                            CardId: element.CardId,
                            UserContact: element.UserContact,
                            Timestamp: element.Timestamp,
                            Comment: element.Comment
                        }
                    };
                    const options = { upsert: true }; // Use upsert to insert if ID doesn't exist

                    await CardDetails.updateMany(filter, update, options);
                }
            })
        }
        res.send({ status: 200, message: "Data Uploaded & Updated..." });
    } catch (error) {
        console.log("ERROR!");
        res.send({ status: 400, message: error.message });

    }
}
module.exports = importData;