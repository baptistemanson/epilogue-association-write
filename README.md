# Epilogue-association-write


This library contains a helper for [Epilogue](https://github.com/dchester/epilogue) to add the capability to POST belongsTo and belongsToMany.
In a single POST REST call, you can save an entity, and its relationship.

##Install

```bash

npm install --save git@github.com:baptistemanson/epilogue-association-write.git
```

##Usage


```javascript
import epilogueAssociationWrite from 'epilogue-association-write'

var userResource = epilogue.resource({
  model: User,
  endpoints: ['/users', '/users/:id'],
  association: true
})

var groupsResource = epilogue.resource({
  model: Group,
  endpoints: ['/groups', '/groups/:id'],
  association: true
})

User.belongsTo(Group)

userResource.create.write(epilogueAssociationWrite(userResource))
userResource.update.write(epilogueAssociationWrite(userResource))
```

Then you can post directly:
```
POST /users
{
  firstName:'John',
  lastName: 'Doe',
  groups: [ {id: 1}, {id: 2}]
}
```
You can add complementary JOIN table values directly in the call as well:

```
POST /users
{
  firstName:'John',
  lastName: 'Doe',
  groups: [ {id: 1, role: 'Admin'}, {id: 2, role: 'Regular'}]
}
```