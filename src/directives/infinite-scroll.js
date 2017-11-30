var emit = (vnode, name, data) => {
  let handlers = (vnode.data && vnode.data.on) ||
      (vnode.componentOptions && vnode.componentOptions.listeners);

  if (handlers && handlers[name]) {
    handlers[name].fns(data);
  }
};

export default {

  inserted: function (el, binding, vnode) {
    el.addEventListener('scroll', (event) => {
      // console.log(event.srcElement.scrollTop);
      // console.log(event.srcElement.scrollHeight);
      // console.log(event.srcElement.scrollHeight - event.srcElement.offsetHeight);
      // console.log(event.srcElement.scrollTop);
      // console.log(event.srcElement.scrollHeight -event.srcElement.offsetHeight - event.srcElement.scrollTop);

      if(event.srcElement.scrollHeight - event.srcElement.offsetHeight - event.srcElement.scrollTop < 50 ){
        console.log('LOAD', vnode.context.$emit);
        vnode.context.$emit('test');

        // el.e('hit-bottom');
      }
    })

  }
}