'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     options.tableName = 'Spots'
     queryInterface.bulkInsert(options, [
      {
       // ownerId: 1,
        address: "123 Park Ave",
        ownerId: 1,
        city: "NYC",
        state: "New York",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Bank",
        description: "Example text must be more than 30 characters",
        price: 50
      },
      {
      //  ownerId: 1,
        address: "456 Memory Lane",
        ownerId: 2,
        city: "Honolulu",
        state: "Hawaii",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Rainbow",
        description: "Example text must be more than 30 characters",
        price: 100
      },
      {
      //  ownerId: 2,
        address: "768 Pearly Gates Drive",
        ownerId: 3,
        city: "Gold",
        state: "Universe",
        country: "Jesus",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Heaven",
        description: "Example text must be more than 30 characters",
        price: 150
      },
      {
        address: "768 Pearly Gates Drive",
        ownerId: 1,
        city: "Paris",
        state: "Rose",
        country: "France",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Macaron",
        description: "Bonjour macaron baguette oui oui",
        price: 37
      },
      {
        address: "768 Pearly Gates Drive",
        ownerId: 2,
        city: "Bora Bora",
        state: "Maldives",
        country: "Oceania",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Paradise",
        description: "The water is so clear",
        price: 192
      },
      {
        address: "768 Pearly Gates Drive",
        ownerId: 3,
        city: "Jerusalem",
        state: "Israel",
        country: "Middle East",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Holy Place",
        description: "Jesus tomb is here",
        price: 7003
      },
      {
        address: "768 Pearly Gates Drive",
        ownerId: 1,
        city: "Long Beach",
        state: "California",
        country: "USA",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Cool",
        description: "California here we come - the O.C.",
        price: 143
      },
      {
        address: "768 Pearly Gates Drive",
        ownerId: 2,
        city: "Miami",
        state: "Florida",
        country: "USA",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "No",
        description: "Party city and dirty",
        price: 587
      },
      {
        address: "768 Pearly Gates Drive",
        ownerId: 3,
        city: "Naples",
        state: "Florida",
        country: "USA",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Sunny",
        description: "Best beach in Florida",
        price: 1004
      },
      {
        address: "768 Pearly Gates Drive",
        ownerId: 1,
        city: "Venice",
        state: "Florida",
        country: "USA",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Shells",
        description: "Pretty beach and old people",
        price: 11
      },
      {
        address: "768 Pearly Gates Drive",
        ownerId: 2,
        city: "Key West",
        state: "Florida",
        country: "USA",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Jimmy Buffet",
        description: "Not the best key",
        price: 25
      },
      {
        address: "768 Pearly Gates Drive",
        ownerId: 3,
        city: "Cabo San Lucas",
        state: "Sand",
        country: "Mexico",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Margarita",
        description: "The beach is so pretty",
        price: 81
      }
     ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots'
    const Op = Sequelize.Op;
     queryInterface.bulkDelete(options, {
       name: {[Op.in]: ['Bank', 'Heaven', 'Rainbow']}
     }, {})
  }
};
