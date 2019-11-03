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
      INICIATED: 'Iniciado',
      CANCELATED: 'Cancelado',
      ACTIVE: 'Activo',
      ENDED: 'Finalizado',
      ANULATED: 'Anulado',
    },
  },
  publicUrls: [
    { url: '/refresh-token' },
    { url: '/login' },
    { url: '/password-recovery' },
  ]
}
