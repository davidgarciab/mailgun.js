import formData from 'form-data';

import nock from 'nock';
import Request from '../lib/Classes/common/Request';
import ValidateClient from '../lib/Classes/Validations/validate';
import { InputFormData, RequestOptions } from '../lib/Types/Common';
import MultipleValidationClient from '../lib/Classes/Validations/multipleValidation';

describe('ValidateClient', function () {
  let client: ValidateClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    const multipleValidationClient = new MultipleValidationClient(reqObject);
    client = new ValidateClient(reqObject, multipleValidationClient);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('get', function () {
    it('validates a single email address', function () {
      const data: any = {
        address: 'Alice <alice@example.com>',
        did_you_mean: null,
        is_valid: false,
        parts: { display_name: null, domain: null, local_part: null }
      };

      api.get('/v4/address/validate')
        .query({ address: 'foo@example.com' })
        .reply(200, data);

      return client.get('foo@example.com').then(function (response: any) {
        response.should.eql(data);
      });
    });
  });
});
