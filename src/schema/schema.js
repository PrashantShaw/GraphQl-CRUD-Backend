// import { Projects, Clients } from '../../sampleData.js'
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList
} from 'graphql'
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

// QUERIES ----------------------------------------------------------------------------
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

// MUTATIONS ----------------------------------------------------------------
const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add a client
        addClient: {
            type: ClientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                return await ClinetModel.create(args)
            }
        },
        // remove a client
        removeClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                return await ClinetModel.findByIdAndDelete(args.id)
            }
        },
        // add a project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: { type: GraphQLNonNull(GraphQLString) },
                clientId: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                return await ProjectModel.create(args)
            }
        },
        // remove a project
        removeProject: {
            type: ProjectType,
            args: {
                id:{type: GraphQLNonNull(GraphQLID)},
            },
            async resolve(parent, args) {
                return await ProjectModel.findByIdAndDelete(args.id)
            }
        }
    }
})

// SCHEMA ----------------------------------------------------------------------------
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
})
export default schema