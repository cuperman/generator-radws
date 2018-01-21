const { execute, itExpects } = require('../../lib/test/helpers');

const subject = require('../handler_conventions');

describe('handler conventions:', () => {
  itExpects(execute(subject.handlerFilePath, 'list item')).toEqual('app/list_item/handlers');
  itExpects(execute(subject.handlerFileBaseName, 'list item', 'pre flight')).toEqual('list_item_pre_flight');
  itExpects(execute(subject.handlerFileExtension)).toEqual('js');
  itExpects(execute(subject.handlerFunctionName)).toEqual('handler');
  itExpects(execute(subject.handlerResourceName, 'list item', 'pre flight')).toEqual('ListItemPreFlightHandler');
  itExpects(execute(subject.handlerRoleResourceName, 'list item', 'pre flight')).toEqual('ListItemPreFlightHandlerRole');
});
