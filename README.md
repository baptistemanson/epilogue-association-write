 # Epilogue-association-write


This library contains a helper for [Epilogue](https://github.com/dchester/epilogue) to add the capability to POST belongsTo and belongsToMany.
In a single POST REST call, you can save an entity, and its relationship.

This library is experimental; I advice you to spend the time understanding its implementation if you want to use it.

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

You can then post:
```
POST /users
{
  firstName:'John',
  lastName: 'Doe',
  groups: [ {id: 1}, {id: 2}]
}
```
It will create a user John Doe, associated with the groups 1 and 2.

You can also add complementary JOIN values directly in the call as well (in the case of a _belongsToMany_):

```
POST /users
{
  firstName:'John',
  lastName: 'Doe',
  groups: [ {id: 1, role: 'Admin'}, {id: 2, role: 'User'}]
}
```
##Limitations

* 
All relations must have a field called "id" that acts as a primary key (not null, unique). 
* The current version doesn't go deeper than 1 level depth.
