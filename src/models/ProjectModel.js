import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Not Started', 'In Progress', 'Completed']
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients',
        required: true,
    }
})

const ProjectModel = mongoose.model('projects', ProjectSchema);

export default ProjectModel;