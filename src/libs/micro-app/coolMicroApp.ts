import { registerAppEnter, registerAppLeave } from '@ice/stark-app';
import type { LifecycleProps } from '@ice/stark-app';

export interface PropsTypes {
  mount: (props: LifecycleProps) => void;
  unmount: (props: LifecycleProps) => void;
  type?: 'register' | 'mount';
}

let mountApi = {
  mount: null,
  unmount: null,
};

const CoolMicroApp = (props: PropsTypes) => {
  const mount = props.mount;
  const unmount = props.unmount;
  const type = !props.type ? 'register' : props.type;

  if (!mount) {
    console.error('mount is required');

    return;
  }

  if (!unmount) {
    console.error('unmount is required');

    return;
  }

  if (type === 'register') {
    registerAppEnter(appProps => {
      // @ts-ignore
      mount(appProps);
    });
    registerAppLeave(appProps => {
      // @ts-ignore
      unmount(appProps);
    });
  } else if (type === 'mount') {
    mountApi.mount = mount;
    mountApi.unmount = unmount;
  }

  return null;
};

export const mount = (props: LifecycleProps) => {
  let newMount;

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  mountApi === null || mountApi === void 0
    ? void 0
    : (newMount === mountApi.mount) === null || newMount.mount === void 0
    ? void 0
      : newMount.call(mountApi, props);
};

export const unmount = (props: LifecycleProps) => {
  let newUnmount;

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  mountApi === null || mountApi === void 0
    ? void 0
    : (newUnmount === mountApi.unmount) === null || newUnmount === void 0
    ? void 0
    : newUnmount.call(mountApi, props);
};

export default CoolMicroApp;
