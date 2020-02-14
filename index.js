const {GraphQLServer} = require('graphql-yoga');

let links = [{
    id:'link-0',
    url:'www.graphql.com'
    
}]

let idCount = links.length

const resolvers = {
    Query:{
        info: () => 'This is a graphql tutorial',
        feed: () => links
    },
    Mutation:{
        post: (parent,args) => {
            const link = {
                id: `link-${idCount++}`,
                description:args.description,
                url:args.url

            }
            links.push(link)
            return link
        }
    }
}

const server = new GraphQLServer({
    typeDefs:'./schema.graphql',
    resolvers,
})

server.start(()=>console.log(`Server is running on http://localhost:4000`))