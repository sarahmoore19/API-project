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
      spotId: 1,
      url: 'https://wallpapers.com/images/hd/paris-aesthetic-cv32luueyjit2i0u.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://i.natgeofe.com/k/f576c284-661a-4046-ba51-fa95699e1a8b/hawaii-beach.png',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://catalog.obitel-minsk.com/blog/wp-content/uploads/2020/09/2XAsc9_5af0044faad471_82363956-tmb-720x411xfill.jpg',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://www.sogoodmagazine.com/wp-content/uploads/2017/06/Castiglione-laduree.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9tw4rtOo58es08dooYAGzvVTqVXZHe0iFZA&usqp=CAU',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://www.hearthymn.com/wp-content/uploads/2018/02/Why-Is-the-Lord-Jesus-Called-Christ-1.jpg',
      preview: false
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
   queryInterface.bulkDelete(options, {
     id: {[Op.in]: [1, 2, 3]}
   }, {})
  }
};
