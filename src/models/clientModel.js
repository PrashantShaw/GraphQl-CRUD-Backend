import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
})

const ClinetModel = mongoose.model('clients',clientSchema);

export default ClinetModel;