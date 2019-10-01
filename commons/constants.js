module.exports = {
  users: {
    status: {
      PENDING: 'PENDING',
      ACTIVE: 'ACTIVE',
      DELETED: 'DELETED',
    },
    gender: {
      FEMALE: 'Femenino',
      MALE: 'Masculino',
      OTHER: 'Otro',
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
