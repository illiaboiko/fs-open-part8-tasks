const Book = require('../models/Book')
const Author = require('../models/Author')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      //   let filtered = books

      //   if (args.author) {
      //     filtered = filtered.filter((b) => b.author === args.author)
      //   }

      //   if (args.genre) {
      //     filtered = filtered.filter((b) => b.genres.includes(args.genre))
      //   }

      return Book.find({})
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: () => {
      return {
        bookCount: async () => Book.collection.countDocuments(),
      }
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log('inside resolver')
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        console.log('no such author, creating one')
        author = new Author({name: args.author})
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
    editAuthor: (root, args) => {
      let author = authors.find((a) => a.name === args.name)
      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        })
      }
      author = { ...author, born: args.born }
      authors = authors.map((a) => (a.name === author.name ? author : a))
      return author
    },
  },
}

module.exports = resolvers
