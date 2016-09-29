# epilogue-association-write



##Install

```bash

npm install git@github.com:baptistemanson/epilogue-association-write.git
```

##Usage


```javascript
import epilogueAssociationWrite from 'epilogue-association-write'

var userResource = epilogue.resource({
  model: User,
  endpoints: ['/users', '/users/:id'],
  association: true
})

userResource.update.write(epilogueAssociationWrite(userResource))
```