import { HttpStatus } from '@nestjs/common';

export const handleErrorCode = statusCode => {
  switch (statusCode) {
    case 400:
      return HttpStatus.BAD_REQUEST;
    case 404:
      return HttpStatus.NOT_FOUND;
    case 409:
      return HttpStatus.CONFLICT;
    default:
      return HttpStatus.INTERNAL_SERVER_ERROR;
  }
};
