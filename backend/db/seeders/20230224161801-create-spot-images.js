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
   options.tableName = 'SpotImages';
   queryInterface.bulkInsert(options, [
    {
      id: 1,
      spotId: 1,
      url: "image url",
      preview: true
    },
    {
      id: 2,
      spotId: 2,
      url: "image url",
      preview: true
    },
    {
      id: 3,
      spotId: 3,
      url: "image url",
      preview: true
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
   options.tableName = 'SpotImages';
   const Op = Sequelize.Op;
   queryInterface.bulkDelete(option, {
     id: {[Op.in]: [1, 2, 3]}
   }, {})
  }
};
