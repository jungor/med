/**
 * Created by juno on 2017/1/1/001.
 */

function autoBindThis(methods, context) {
  // methods.forEach((method) => {
  //   method = method.bind(context)
  // })
  for (let i = 0, len = methods.length; i < len; i++) {
    context[methods[i].name] = methods[i].bind(context);
  }
}

export default autoBindThis;
