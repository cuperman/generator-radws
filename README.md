# Generator-Radws

> Generators for radws applications

## Installation

First, install [Yeoman](http://yeoman.io) and generator-radws using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-radws
```

Then generate your new application:

```bash
yo radws
```

You will be prompted for a profile and a code bucket.  The profile is used when executing aws cli commands, and the code bucket is the s3 bucket that is used to upload your application code.

## More Details

### Tables

```bash
yo radws:table ProductCatalog
```

Optionally, pass in hash and range key information

```bash
yo radws:table Forum --hash Name:String
yo radws:table Thread --hash ForumName:String --range Subject:String
yo radws:table Reply --hash Id:String --range ReplyDateTime:String
```

### Handlers

```bash
yo radws:handler
```

### Routes

```bash
yo radws:route
```

### CRUD

## License

MIT © [Jeff Cooper]()
