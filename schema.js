const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLId,
} = require("graphql");

// var personeller = [
//   { id: "1", isim: "jan", yas: 30, email: "s@googele.com" },
//   { id: "2", isim: "gezal", yas: 35, email: "geza@gmail.com" },
//   { id: "3", isim: "yas", yas: 41, email: "yas@email.com" },
// ];

const PersonelType = new GraphQLObjectType({
  name: "Personel",
  fields: () => ({
    id: { type: GraphQLString },
    isim: { type: GraphQLString },
    email: { type: GraphQLString },
    yas: { type: GraphQLInt },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: "RottQuery",
  fields: {
    personel: {
      type: PersonelType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //veriye erisim
        // for (let i = 0; i < personeller.length; i++) {
        //   if (personeller[i].id === args.id) {
        //     return personeller[i];
        //   }
        // }
        return axios
          .get(" http://localhost:3000/personller/" + args.id)
          .then((res) => res.data);
      },
    },
    personeller: {
      type: PersonelType,
      resolve(parent, args) {
        // return personeller;
        return axios
          .get(" http://localhost:3000/personller")
          .then((res) => res.data);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fileds: {
    personelEkle: {
      type: PersonelType,
      args: {
        isim: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        yas: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return axios
          .post(" http://localhost:3000/personller", {
            isim: args.isim,
            email: args.email,
            yas: args.yas,
          })
          .then((res) => res.data);
      },
    },
    personelSil: {
      type: PersonelType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return axios
          .delete("http://localhost:3000/personller" / +args.id)
          .then((res) => res.data);
      },
    },
    personelGuncelle: {
      type: PersonelType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        isim: { type: GraphQLString },
        email: { type: GraphQLString },
        yas: { type: GraphQLInt },
      },
      resolve(_, args) {
        return axios
          .patch(" http://localhost:3000/personller/" + args.id, args)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation: mutation,
});
