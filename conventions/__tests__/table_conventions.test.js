const { execute, itExpects } = require('../../lib/test/helpers');

const subject = require('../table_conventions');

describe('table conventions:', () => {
  itExpects(execute(subject.tableFilePath)).toEqual('app/tables');
  itExpects(execute(subject.tableFileBaseName, 'list item')).toEqual('list_item');
  itExpects(execute(subject.tableFileExtension)).toEqual('js');
  itExpects(execute(subject.tableResourceName, 'list item')).toEqual('ListItemTable');
  itExpects(execute(subject.tableClassName, 'list item')).toEqual('ListItem');
  itExpects(execute(subject.tableEnvVarName, 'list item')).toEqual('LIST_ITEM_TABLE');
});
