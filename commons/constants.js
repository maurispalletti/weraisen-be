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
  matches: {
    status: {
      INICIATED: 'INICIATED',
      CANCELATED: 'CANCELATED',
      CREATED: 'CREATED',
      ENDED: 'ENDED',
      ANULATED: 'ANULATED',
    },
  },
  publicUrls: [
    { url: '/refresh-token' },
    { url: '/login' },
    { url: '/password-recovery' },
  ]
}
