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
    },
    {
      spotId: 4,
      url: 'https://media.istockphoto.com/id/489833698/photo/two-lounge-chairs-under-tent-on-beach.jpg?s=612x612&w=0&k=20&c=df_6Jkb5YreyaAcGVbdcRrTP4dZ-opUrYWtgRC3eKKI=',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVUXbtm9U3aWKzW2wOMsWF9Jv5hgz9bHX_iw&usqp=CAU',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE1EnjMuG3gT1ObVgqfNVRO0mTGEHuAMrXtA&usqp=CAU',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdx7tj4q9NWbi2picMDDrd3spjS5XHPlm82YVuWLGohozhfULPr3wgG_Woh1yhkSrMSMY&usqp=CAU',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0mWumDEjEAepaRjnRRCuJFvkOMp3n0Ga9fA&usqp=CAU',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVYzSQA1Z_dcysG3hUeyozjwAvSdhs_ohq_ErLdU2NprIftIylllQoXonYfCfxwCsQBs&usqp=CAU',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScOpuhFp7EECROUcISftB8M98vGMvZmXfUUA&usqp=CAU',
      preview: true
    },
    {
      spotId: 11,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzVbwKVSqiwYEXEY-o7BDXsFWPTfNzVw92NA&usqp=CAU',
      preview: true
    },
    {
      spotId: 12,
      url: 'https://media.vrbo.com/lodging/35000000/34150000/34145600/34145558/92beade2.c6.jpg',
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
   queryInterface.bulkDelete(options, {
     id: {[Op.in]: [1, 2, 3]}
   }, {})
  }
};
