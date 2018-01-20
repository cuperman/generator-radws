# jeffws-generator

> Generators for jeffws applications

## Installation

First, install [Yeoman](http://yeoman.io) and generator-jeffws using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-jeffws
```

Then generate your new project:

```bash
yo jeffws
```

## More Details

### Tables

```bash
yo jeffws:table ProductCatalog
```

Optionally, pass in hash and range key information

```bash
yo jeffws:table Forum Name:String
yo jeffws:table Thread ForumName:String Subject:String
yo jeffws:table Reply Id:String ReplyDateTime:String
```

[reference](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SampleData.CreateTables.html)

### Handlers

```bash
yo jeffws:handler
```

### Routes

```bash
yo jeffws:route
```

### CRUD API Scaffold

### Secrets

## License

MIT © [Jeff Cooper]()
