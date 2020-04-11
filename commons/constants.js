module.exports = {
  users: {
    status: {
      PENDING: 'Pendiente',
      ACTIVE: 'Activo',
      REJECTED: 'Rechazado',
      BLOCKED: 'Bloqueado',
      DELETED: 'Borrado',
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
      CANCELED: 'Cancelado',
      ACTIVE: 'Activo',
      ENDED: 'Finalizado',
      ANULATED: 'Anulado',
    },
  },
  compliants: {
    status: {
      CREATED: 'Creado',
      BLOCKED: 'Bloqueado',
      RESOLVED: 'Resuelto',
    },
    reason: {
      SEXUAL: 'Sexual',
      VIOLENCE: 'Violencia',
      DISCRIMINATION: 'Discriminacion',
      PUNTUALITY: 'Puntualidad',
      FAKE: 'Suplantacion',
      THREAT: 'Amenaza',
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
      COMPLIANT: 'Denuncia',
    },
    messages: {
      requests: {
        CREATED: 'te envió una solicitud de encuentro.',
        CONFIRMED: 'aceptó tu solicitud de encuentro.',
        CANCELED: 'rechazoó tu solicitud de encuentro.',
      },      
      matches: {
        CANCELED: 'canceló el encuentro.',
      }, 
      review: {
        FINISHED: 'Tu encuentro finalizó. Dejale una review a tu acompañante',
      },
    },
  },  
  requests: {
    status: {
      CREATED: 'Creada',
      CONFIRMED: 'Confirmada',
      CANCELED: 'Cancelada',
    },
  },
  publicUrls: [
    { url: '/refresh-token' },
    { url: '/login' },
    { url: '/password-recovery' },
  ]
}
