import Acl from 'acl'
const acl = new Acl(new Acl.redisBackend(redisClient, prefix))

acl.allow('guest', ['slide', 'search', 'slides'], ['view'])
acl.allow('admin', ['slide', 'search', 'slides'], ['view', 'edit'])
acl.allow('user', ['slide', 'search', 'slides'], ['view'])
export default{
  acl,

}

// acl.addUserRoles(userId, '/slide/12345', ['put', 'get', 'post', 'delete'])
