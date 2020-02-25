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
  notifications: {
    status: {
      ACTIVE: 'Activa',
      CLOSED: 'Cerrada',
    },
    type: {
      REVIEW: 'Review',
      REQUEST: 'Solicitud',
      MATCH: 'Encuentro',
    },
  },
  publicUrls: [
    { url: '/refresh-token' },
    { url: '/login' },
    { url: '/password-recovery' },
  ]
}
