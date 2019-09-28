module.exports = {
  users: {
    status: {
      PENDING: 'PENDING',
      ACTIVE: 'ACTIVE',
      DELETED: 'DELETED',
    },
    gender: {
      FEMALE: 'FEMALE',
      MALE: 'MALE',
      OTHER: 'OTHER',
    },
  },
  publicUrls: [
    { url: '/refresh-token' },
    { url: '/login' },
    { url: '/password-recovery' },
    // example
    // { url: '/talent-partners', methods: ['POST'] }
  ]
}
