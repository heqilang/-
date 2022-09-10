import Mock from 'mockjs';
const LoginUsers = [
    {
        id: 1,
        username: 'admin',
        password: '123456',
        avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
        name: '杨帅'
    }
];

const Users = [];

for (let i = 0; i < 86; i++) {
    /*Users.push(Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1)
    }));*/
    Users.push(
        Mock.mock({
            Id: Mock.Random.guid(),
            Pid: '',
            DataType: '性别',
            DataValue: Date.now(),
            DataName: Mock.Random.integer(0, 1) === 0 ? '男' : '女',
            Sort: '1',
            Status: Mock.Random.integer(0, 1),
            Memo: '保密。。。。',
            UpdateTime: '',
            IsFixed: '0'
        })
    );
}

console.log('LoginUsers------->', LoginUsers);
console.log('user------->', Users);

export { LoginUsers, Users };
