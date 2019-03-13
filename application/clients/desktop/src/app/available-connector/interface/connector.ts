export class Connector {
  id: '';
  name: string;
  description: string;
  url: string;
  available_apis: [{
    name: '',
    description: '',
    type: '',
    properties: [{
      key: '',
      value: ''
    }]
  }];
  properties: Array<any>;
}

