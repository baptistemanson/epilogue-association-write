# Epilogue-association-write


This library contains a helper to add the capability to POST belongsToMany.
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

userResource.create.write(epilogueAssociationWrite(userResource))
userResource.update.write(epilogueAssociationWrite(userResource))
```