const PENDING = 0
const FULFILLED = 1
const REJECTED = 2

class promise {
  constructor(fn) {
    // then的函数
    this.callbacksOfSuccess = []
    this.callbacksOfFail = []
    // promise的状态
    this.status = PENDING
    // 执行结果
    this.value = ''
    const self = this
    return () => {
      return self.doResolve(self, fn)
    }
  }
  then(onFulfilled, onRejected) {
    this.callbacksOfSuccess.push(onFulfilled)
    this.callbacksOfFail.push(onRejected)
    return this
  }
  // 正确处理，修改状态和接受数据，并返回promise
  resolve(value) {
    this.status = FULFILLED
    this.value = value
    this.handleOfSuccess()
  }
  // 错误处理，修改状态和接受数据
  reject(reason) {
    this.status = REJECTED
    this.value = reason
    this.handleOfFail()
  }
  // 处理构造函数
  doResolve(self, fn) {
    fn(value => self.resolve(value), reason => self.reject(reason))
    return self
  }
  // 处理 callback
  handleOfSuccess() {
    let callback = this.callbacksOfSuccess.shift()
    // 这也是个异步
    callback(this.value)
  }
  // 处理 callback
  handleOfFail() {
    let callback = this.callbacksOfFail.shift()
    // 这也是个异步
    callback(this.value)
  }
}

let a = new promise((resolve, reject) => {
  if (1) {
    setTimeout(() => {
      resolve(1)
    }, 1000)
    return
  }
  reject(2)
})
a()
  .then(
    response => {
      console.log('response: ', response)
      return 'success'
    },
    error => {
      console.log('error: ', error)
      return 'fail'
    }
  )
  .then(
    response => {
      console.log('第二个then的response： ', response)
    },
    error => {
      console.log('第二个then的response： ', error)
    }
  )
  .then(
    response => {
      console.log('第三个then的response： ', response)
    },
    error => {
      console.log('第三个then的response： ', error)
    }
  )
  .then(
    response => {
      console.log('第4个then的response： ', response)
    },
    error => {
      console.log('第4个then的response： ', error)
    }
  )
