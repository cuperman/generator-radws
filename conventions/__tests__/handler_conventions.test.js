const { execute, itExpects } = require('../../lib/test/helpers');

const subject = require('../handler_conventions');

describe('handler conventions:', () => {
  itExpects(execute(subject.handlerFilePath)).toEqual('app/handlers');
  itExpects(execute(subject.handlerFileBaseName, 'list item')).toEqual('list_item_handlers');
  itExpects(execute(subject.handlerFileExtension)).toEqual('js');
  itExpects(execute(subject.handlerFunctionName, 'pre flight')).toEqual('preFlight');
  itExpects(execute(subject.handlerResourceName, 'list item', 'pre flight')).toEqual('ListItemPreFlightHandler');
  itExpects(execute(subject.handlerRoleResourceName, 'list item', 'pre flight')).toEqual('ListItemPreFlightHandlerRole');
});
