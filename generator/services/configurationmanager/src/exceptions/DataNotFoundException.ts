import HttpException from './HttpException';

class DataNotFoundException extends HttpException {
  constructor() {
    super(404, `Data Not Found`);
  }
}

export default DataNotFoundException;
