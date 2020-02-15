const {GraphQLServer} = require('graphql-yoga');

let links = [{
    id:'link-0',
    url:'www.graphql.com',
    description:'This is the official website'
    
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
        },
        update: (parent,args) => {
            const link = links.filter((link)=>{
                return link.id === args.id
            })
            link.id = args.id
            link.url = args.url
            link.description = args.description
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