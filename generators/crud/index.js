'use strict';

const Generator = require('yeoman-generator');
const { pickBy, assign } = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('resource', {
      type: String,
      required: true
    });

    this.option('hash', {
      type: String
    });

    this.option('range', {
      type: String
    });

    this.option('through', {
      type: String
    });
  }

  initializing() {
    const { resource, hash, range, through } = this.options;
    const tableAccess = true;

    const [hashKeyName] = (hash || '').split(':');
    const member = hashKeyName ? hashKeyName : 'Id';

    const tableOptions = pickBy({ hash, range }, opt => opt);
    const handlerOptions = pickBy({ tableAccess }, opt => opt);
    const routeOptions = pickBy({ through }, opt => opt);

    this.composeWith('jeffws:table', assign({ arguments: [ resource ] }, tableOptions));

    this.composeWith('jeffws:handler', assign({ arguments: [ resource, 'create'  ] }, handlerOptions));
    this.composeWith('jeffws:handler', assign({ arguments: [ resource, 'list'    ] }, handlerOptions));
    this.composeWith('jeffws:handler', assign({ arguments: [ resource, 'show'    ] }, handlerOptions));
    this.composeWith('jeffws:handler', assign({ arguments: [ resource, 'update'  ] }, handlerOptions));
    this.composeWith('jeffws:handler', assign({ arguments: [ resource, 'destroy' ] }, handlerOptions));

    this.composeWith('jeffws:route', assign({ arguments: [ resource, 'POST',   'create'  ] }, routeOptions));
    this.composeWith('jeffws:route', assign({ arguments: [ resource, 'GET',    'list'    ] }, routeOptions));
    this.composeWith('jeffws:route', assign({ arguments: [ resource, 'GET',    'show'    ], member }, routeOptions));
    this.composeWith('jeffws:route', assign({ arguments: [ resource, 'PUT',    'update'  ], member }, routeOptions));
    this.composeWith('jeffws:route', assign({ arguments: [ resource, 'PATCH',  'update'  ], member }, routeOptions));
    this.composeWith('jeffws:route', assign({ arguments: [ resource, 'DELETE', 'destroy' ], member }, routeOptions));
  }
};
