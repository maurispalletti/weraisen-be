const exceptionType = {
  missingParameters: {
    message: 'Missing required fields',
    code: 100,
    httpStatus: 422
  },
  numbersParameters: {
    message: 'Fields must be numbers',
    code: 101,
    httpStatus: 422
  },
  dateParameters: {
    message: 'Fields must be dates',
    code: 102,
    httpStatus: 422
  },
  candidate: {
    // codes from [1000-1999]
    invalidRole: {
      message: 'Invalid role for candidate',
      code: 1001,
      httpStatus: 400
    },
    duplicatedEmail: {
      message: 'Duplicated email',
      code: 1002,
      httpStatus: 400
    },
    cannotCreateCandidate: {
      code: 1003,
      message: 'Candidate can not be created',
      httpStatus: 401
    },
    cannotUpdateCandidate: {
      code: 1004,
      message: 'Candidate can not be updated',
      httpStatus: 401
    }
  },
  talentPartner: {
    cannotCreateTalentPartner: {
      code: 6000,
      message: 'Talent Partner can not be created',
      httpStatus: 500
    },
    notFound: {
      code: 6001,
      message: 'Talent Partner not found',
      httpStatus: 404
    }
  },
  teaser: {
    teaserCreation: {
      code: 7000,
      message: 'Teaser creation failed',
      httpStatus: 500
    },
    notFound: {
      code: 7001,
      message: 'Teaser not found',
      httpStatus: 404
    },
    retrieveJobOpeningDataFailed: {
      code: 7002,
      message: 'Retrieve job opening data failed',
      httpStatus: 500
    },
    retrieveTalentPartnerDataFailed: {
      code: 7003,
      message: 'Retrieve talent partner data failed',
      httpStatus: 500
    },
    retrieveCandidatesDataFailed: {
      code: 7004,
      message: 'Retrieve candidates data failed',
      httpStatus: 500
    }
  },
  jobOrder: {
    jobOrderCreation: {
      code: 7030,
      message: 'Job order creation failed',
      httpStatus: 422
    },
    notFound: {
      code: 7031,
      message: 'Job order not found',
      httpStatus: 404
    }
  },
  jobOpenings: {
    retrieveJobOpeningsDataFailed: {
      code: 7040,
      message: 'Retrieve job openings failed',
      httpStatus: 422
    },
    addMatchedCandidatesCountFailed: {
      code: 7041,
      message: 'Add matched candidates count job openings failed',
      httpStatus: 422
    }
  },
  email: {
    templateError: {
      message: 'Template email service failed',
      code: 7050,
      httpStatus: 500
    }
  },
  contact: {
    subscribe: {
      message: 'Subscribe service failed',
      code: 8001,
      httpStatus: 500
    }
  },
  services: {
    // codes from [9000-9999]
    upsertFail: {
      message: 'Upsert Fail',
      code: 9001,
      httpStatus: 500
    },
    rchiliParseFail: {
      message: 'rChilli parse failed',
      code: 9002,
      httpStatus: 500
    },
    scanGetProspectingFail: {
      message: 'Get prospecting info failed',
      code: 9003,
      httpStatus: 500
    },
    scanGetNewSalesOpportunitiesFail: {
      message: 'New sales oportunities failed',
      code: 9004,
      httpStatus: 500
    },
    stripe: {
      invalidRequestError: {
        message: 'Invalid Stripe parameters',
        code: 9005,
        httpStatus: 500
      },
      apiError: {
        message: 'Stripe API error',
        code: 9006,
        httpStatus: 500
      },
      connectionError: {
        message: 'Error during HTTPS communication',
        code: 9007,
        httpStatus: 500
      },
      authenticationError: {
        message: 'Incorrect API key',
        code: 9008,
        httpStatus: 500
      },
      rateLimitError: {
        message: 'Consecutive API requests exceeded the limit',
        code: 9009,
        httpStatus: 500
      },
      scanGetAllJobOpeningsFail: {
        message: 'Get job openings failed',
        code: 9010,
        httpStatus: 500
      }
    },
    amazonSESError: {
      message: 'Email service failed',
      code: 9011,
      httpStatus: 500
    },
    amazonS3Error: {
      message: 'S3 service failed',
      code: 9012,
      httpStatus: 500
    },
    redis: {
      serviceError: {
        message: 'Redis service failed',
        code: 9020,
        httpStatus: 500
      },
      notFoundError: {
        message: 'Key not found',
        code: 9021,
        httpStatus: 404
      }
    }
  },
  invalidValue: {
    message: 'Invalid value',
    code: 2000,
    httpStatus: 400
  },

  notFound: {
    message: 'Not found',
    code: 3000,
    httpStatus: 404
  },

  unhandledException: {
    code: 4000,
    message: 'Unhandled exception',
    httpStatus: 500
  },
  user: {
    invalidUserOrPassword: {
      code: 5000,
      message: 'User or password did not match',
      httpStatus: 401
    },
    cannotCreateUser: {
      code: 5001,
      message: 'User can not be created',
      httpStatus: 500
    },
    cannotUpdateUser: {
      code: 5002,
      message: 'User can not be updated',
      httpStatus: 500
    },
    userNotFound: {
      code: 5003,
      message: 'User not found',
      httpStatus: 404
    },
    invalidRole: {
      message: 'Invalid role for user',
      code: 5004,
      httpStatus: 400
    }
  },
  tourist: {
    touristNotFound: {
      code: 6003,
      message: 'Tourist not found',
      httpStatus: 404
    },
  },
  guide: {
    guideNotFound: {
      code: 7003,
      message: 'Guide not found',
      httpStatus: 404
    },
  },
  chat: {
    cannotCreateChat: {
      code: 8000,
      message: 'Chat can not be created',
      httpStatus: 500
    },
    cannotUpdateChat: {
      code: 8001,
      message: 'Chat can not be updated',
      httpStatus: 500
    },
    notFound: {
      code: 8002,
      message: 'Chat not found',
      httpStatus: 404
    }
  },
  token: {
    tokenNotFound: {
      code: 5100,
      message: 'Token not found',
      httpStatus: 404
    }
  }
}

module.exports = {
  exceptionType
}
