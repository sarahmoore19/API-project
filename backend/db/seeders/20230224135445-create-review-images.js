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
   options.tableName = 'ReviewImages'
   queryInterface.bulkInsert(options, [
    {
      id: 1,
      reviewId: 1,
      url: "image url"
    },
    {
      id: 2,
      reviewId: 2,
      url: "image url"
    },
    {
      id: 3,
      reviewId: 3,
      url: "image url"
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
   options.tableName = 'ReviewImages';
   const Op = Sequelize.Op;
   queryInterface.bulkDelete(options, {
     id: {[Op.in]: [1, 2, 3]}
   })
  }
};
