import axios from 'axios'

const test1 = ({commit}, info) => {
  console.log(info);
  axios({
    method: 'post',
    url: '/user/login',
    data: {
      'account': info.account,
      'password': info.password
    }
  })
}
const test2 = ({commit}, info) => {
  console.log(info);
  axios({
    method: 'post',
    url: '/user/login',
    data: {
      'account': info.account,
      'password': info.password
    }
  })
}

export{
    test1,
    test2
}
