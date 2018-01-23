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

This creates a DynamoDB table. To generate the table, all you need is the resource name:

```bash
yo radws:table ProductCatalog
```

By default, a table is created with Hash key 'Id' of type String. Or, you can pass in specific hash and range key information:

```bash
yo radws:table Forum --hash Name:String
yo radws:table Thread --hash ForumName:String --range Subject:String
yo radws:table Reply --hash Id:String --range ReplyDateTime:String
```

### Handlers

To generate a handler, pass a resource name and a handler name.

```bash
yo radws:handler "Hello World" greet
```

To generate a handler with access to a DynamoDB table, pass `--table-access`, which sets up additional policies, and exposes the table name for the resource as an environment variable to the handler.

```bash
yo radws:handler ProductCatalog list --table-access
```

### Routes

To generate a route, pass the resource name, the HTTP method name, and the handler to execute:

```bash
yo radws:route Forum GET list
```

This will create a route with the following mapping:

`GET /forum => app/forum/handlers/forum_list.handler`

You can use the `--member` flag to build a route for a single record:

```bash
yo radws:route Forum DELETE destroy --member
```

This will map the following route:

`DELETE /forum/{key} => app/forum/handlers/forum_destroy.handler`

In this example, sending a DELETE request to a specific forum will execute a handler that deletes that forum.  You can also specify the key name:

```bash
yo radws:route Forum DELETE destroy --member Name
```

Which creates the same mapping, but using the following route:

`DELETE /forum/{name}`

To use nested routes, use the `--through` option:

```bash
yo radws:route Thread GET list --through Forum.Name
yo radws:route Reply GET list --through Forum.Name.Thread.Subject
```

This would create the following routes:

```bash
GET /forum/{name}/thread
GET /forum/{name}/thread/{subject}/reply
```

### CRUD

The CRUD generator creates a REST API for a resource with all CRUD operations.  With a single command:

```bash
yo jeffws:crud Forum --hash Name:String
```

Is equivalent to typing the following commands:

```bash
yo jeffws:table Forum --hash Name:String

yo jeffws:handler Forum create --table-access
yo jeffws:handler Forum list --table-access
yo jeffws:handler Forum show --table-access
yo jeffws:handler Forum update --table-access
yo jeffws:handler Forum destroy --table-access

yo jeffws:route Forum POST create
yo jeffws:route Forum GET list
yo jeffws:route Forum GET show --member
yo jeffws:route Forum PUT update --member
yo jeffws:route Forum PATCH update --member
yo jeffws:route Forum DELETE destroy --member
```

## License

MIT © [Jeff Cooper]()
