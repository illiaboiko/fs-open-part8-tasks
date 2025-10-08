const Book = require('../models/Book')
const Author = require('../models/Author')
const { GraphQLError } = require('graphql')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filters = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return []
        filters.author = author._id
      }

      if (args.genre) {
        filters.genres = { $in: [args.genre] }
      }

      return Book.find(filters).populate('author')
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root._id }),
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log('inside resolver')
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        console.log('no such author, creating one')
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          console.log('saving person error', error)
        }
      }

      const book = new Book({
        ...args,
        author: author,
      })
      return await book.save()
    },
    editAuthor: async (root, args) => {
      if (!args.name || !args.born) return null

      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { name: args.name, born: args.born },
        { new: true }
      )
      console.log(author)
      return author
    },
  },
}

module.exports = resolvers
