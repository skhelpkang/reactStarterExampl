
import naraFetch from '../../common/nara/naraFetch';


const basePath = '/sample/users';

const users = [
  { id: 'admin',    name: 'admin',    roles: ['Admin', 'User'] },
  { id: 'manager',  name: 'manager',  roles: ['Admin'] },
  { id: 'user1',    name: 'user1',    roles: ['User'] },
  { id: 'user2',    name: 'user2',    roles: ['User'] },
];


const api = {
  //
  findUser: (userId) =>
    naraFetch.getJson(`${basePath}/userId`),

  findUser_sample: (userId) =>
    Promise.resolve(users.find((user) => userId === user.id)),

  findAllUsers_sample: () =>
    Promise.resolve(users),
};

export default api