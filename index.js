const { Keystone  } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME = 'my-app';
const adapterConfig = { mongoUri: 'mongodb+srv://alokuser:alok123@cluster0.k4vld.mongodb.net/firstdatabase?retryWrites=true&w=majority' };
const TodoSchema = require('./lists/todo.js');
const UserSchema = require('./lists/user.js');
const PostSchema = require('./lists/post.js');






/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  name: "Role based access demo",
  adapter: new Adapter(adapterConfig),
  cookieSecret: process.env.COOKIE_SECRET,
});

keystone.createList('Admin', {
  fields: {
    name: { type: Text },
    email: { type: Text, isUnique: true },
    isAdmin: { type: Checkbox },
    password: { type: Password },
  },
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'Admin',
});

module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp({ enableDefaultRoute: true , authStrategy})],
};



keystone.createList('Todo', TodoSchema);
keystone.createList('User', UserSchema);
keystone.createList('Page', PostSchema);
