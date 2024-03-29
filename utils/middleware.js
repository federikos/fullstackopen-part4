const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    });
  }

  next(error);
};

const tokenExtractor = (request, sresponse, next) => {
  let token = null;
  
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.split(' ')[1];
  }

  request.token = token;

  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};