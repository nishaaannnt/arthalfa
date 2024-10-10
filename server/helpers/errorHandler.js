
const handleError = (err, res) => {
  const { statusCode, message } = err;
  console.log(err,message)
  res.status(statusCode || 500).json({
    status: "Internal Server Error",
    statusCode: statusCode || 500,
    message: message || 'Internal Server Error',
  });
};

module.exports = {
  handleError,
};
