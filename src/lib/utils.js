export default {
  install: function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
      // 逻辑...
    }

    // 2. 添加全局资源
    Vue.directive('my-directive', {
      bind(el, binding, vnode, oldVnode) {
        // 逻辑...
      }
    })

    // 3. 注入组件
    Vue.mixin({
      created: function () {
        // 逻辑...
      }
    })

    // 4. 添加实例方法
    Vue.prototype.setAccountSession = function (role, account, name, token) {
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("account", account);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("token", token);
    }

    Vue.prototype.getRoleSession = function () {
      return sessionStorage.getItem('role');
    }

    Vue.prototype.getAccountSession = function () {
      return sessionStorage.getItem('account');
    }

    Vue.prototype.getNameSession = function () {
      return sessionStorage.getItem('name');
    }

    Vue.prototype.getTokenSession = function () {
      return sessionStorage.getItem('token');
    }
    
    Vue.prototype.clearAccountSession = function () {
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("account");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("token");
    }

    Vue.prototype.toDateObject = function (timestamp) {
      //timestamp是整数，否则要parseInt转换
      return new Date(parseInt(timestamp));
    }

    Vue.prototype.toDatetimeDay = function (timestamp) {
      //timestamp是整数，否则要parseInt转换  
      let time = new Date(parseInt(timestamp));
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let mm = time.getMinutes();
      let s = time.getSeconds();
      return y + '-' +  ( m < 10 ? '0' + m : m ) + '-' + ( d < 10 ? '0' + d : d);
    }

    Vue.prototype.toDatetimeMin = function (timestamp) {
      //timestamp是整数，否则要parseInt转换  
      let time = new Date(parseInt(timestamp));
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let mm = time.getMinutes();
      let s = time.getSeconds();
      return y + '-' + ( m < 10 ? '0' + m : m ) + '-' + ( d < 10 ? '0' + d : d) + ' ' + ( h < 10 ? '0' + h : h) + ':' + ( mm < 10 ? '0' + mm : mm);
    }
    Vue.prototype.toMin = function (timestamp) {
      //timestamp是整数，否则要parseInt转换  
      let time = new Date(parseInt(timestamp));
      let h = time.getHours();
      let mm = time.getMinutes();
      let s = time.getSeconds();
      return ( h < 10 ? '0' + h : h) + ':' + ( mm < 10 ? '0' + mm : mm);
    }
    Vue.prototype.toTimeStamp = function (date) {
      // datetime = new Date(Date.parse(datetime.replace(/-/g, "/")));
      let timeStamp = date.getTime();
      return timeStamp;
    }
  }
}
