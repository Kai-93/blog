const PENDING = 0
const FULFILLED = 1
const REJECTED = 2

class promise {
  constructor(fn) {
    // then的函数
    this.callbacks = []
    // promise的状态
    this.status = PENDING
    // 执行结果
    this.value = ''
    const self = this
    return () => {
      return self.doResolve(self, fn)
    }
  }
  // 正确处理，修改状态和接受数据，并返回promise
  resolve(value) {
    this.status = FULFILLED
    this.value = value
    return this
  }
  // 错误处理，修改状态和接受数据
  reject(reason) {
    this.status = REJECTED
    this.value = reason
    return this
  }
  // 接受上次执行结果，并执行相应的处理函数
  then(onFulfilled, onRejected) {
    return this.handle(onFulfilled, onRejected)
  }

  doResolve(self, fn) {
    fn(value => self.resolve(value), reason => self.reject(reason))
    return self
  }

  handle(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      return this.resolve(onFulfilled(this.value))
    }
    if (this.status === REJECTED) {
      return this.reject(onRejected(this.value))
    }
  }
}

let a = new promise((resolve, reject) => {
  if (0) {
    resolve(1)
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
