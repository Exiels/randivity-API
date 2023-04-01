function getConfig (databaseName) {
  const connectionParams = {
    useNewUrlParser: true,
    socketTimeoutMS: 10000,
    dbName: databaseName
  }
  return connectionParams
}

exports.getConfig = getConfig
