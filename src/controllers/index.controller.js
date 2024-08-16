const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.index = catchAsync(async (req, res, next) => {
  const error = null;
  const errorMessage = 'Error message';
  const errorStatus = 500;

  if (error) return next(new AppError(errorMessage, errorStatus));

  res.status(200).json({ status: 'success', message: 'API is running' });
});
