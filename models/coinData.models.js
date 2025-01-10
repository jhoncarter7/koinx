import mongoose from "mongoose";


const coinDataSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        lowercase: true,
    },
    price:{
        type: Number,
        required: true,
    },
    marketCap:{
        type: Number,
    },
    volume_change_24hr:{
        type: Number,
    },
}, {timestamps: true});

 const CointData = mongoose.model('CoinData', coinDataSchema);
 export default CointData;