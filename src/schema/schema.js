// import { Projects, Clients } from '../../sampleData.js'
import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList } from 'graphql'
import ClinetModel from '../models/clientModel.js'
import ProjectModel from '../models/ProjectModel.js'

// client types
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    }
})
// Project types
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            async resolve(parent, args) {
                return await ClinetModel.findOne(parent.clientId)
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // get all clients
        clients: {
            type: new GraphQLList(ClientType), // to get the list of clients
            async resolve(parent, args) {
                return await ClinetModel.find()
            }
        },
        // get client with given id
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                return await ClinetModel.findOne(args.id)
            }
        },
        // get all projects
        projects: {
            type: new GraphQLList(ProjectType), // to get the list of projects
            async resolve(parent, args) {
                return await ProjectModel.find()
            }
        },
        // get project with given id
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                return await ProjectModel.findOne(args.id)
            }
        }
    }
})
const schema = new GraphQLSchema({
    query: RootQuery
})
export default schema