module.exports = {
  users: {
    status: {
      PENDING: 'PENDING',
      ACTIVE: 'ACTIVE',
      REJECTED: 'REJECTED',
      BLOCKED: 'BLOCKED',
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
      PENDING: 'Pendiente',
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
      ADVICE: 'Aviso',
      ELECTED: 'Elegido',
      APROVED: 'Aprobado',
      REJECTED: 'Rechazado'
    },
    // messages: {
    //   requests: {
    //     CREATED: 'Tu solicitud fue enviada correctamente a ',
    //     CONFIRMED: 'aceptó tu solicitud de encuentro.',
    //     CANCELED: 'rechazó tu solicitud de encuentro.',
    //     PENDING: '¡Felicitaciones! Fuiste elegido para guiar en su recorrido a '
    //   },      
    //   matches: {
    //     CANCELED: 'canceló el encuentro por',
    //   }, 
    //   review: {
    //     FINISHED: 'Tu encuentro finalizó. Para ayudar a futuros usuarios a elegir su mejor opción, puntuá a ',
    //   },
    //   compliant: {
    //     COMPLIANT: 'Gracias por ayudar a que WeRaisen sea una comunidad segura. Evaluaremos tu denuncia y tomaremos una decisión si infringe nuestras normas comunitarias.'
    //   }
    // },
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
