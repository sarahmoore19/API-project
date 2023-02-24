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
        city: "NYC",
        state: "New York",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Bank",
        description: "The Wolf Of Wall Street",
        price: 50
      },
      {
      //  ownerId: 1,
        address: "456 Memory Lane",
        city: "Honolulu",
        state: "Hawaii",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Rainbow",
        description: "Where Dreams Are Made",
        price: 100
      },
      {
      //  ownerId: 2,
        address: "768 Pearly Gates Drive",
        city: "Gold",
        state: "Universe",
        country: "Jesus",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Heaven",
        description: "God's Home",
        price: 150
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
