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

You will be prompted for a profile and a code bucket.  The profile is used when executing aws cli commands, and the code bucket is the s3 bucket that is used to upload your application code.

## More Details

### Tables

```bash
yo jeffws:table ProductCatalog
```

Optionally, pass in hash and range key information

```bash
yo jeffws:table Forum --hash Name:String
yo jeffws:table Thread --hash ForumName:String --range Subject:String
yo jeffws:table Reply --hash Id:String --range ReplyDateTime:String
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
