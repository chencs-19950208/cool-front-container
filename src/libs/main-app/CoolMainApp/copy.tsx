import React, { useRef, useEffect, useState } from 'react';
import {
  start,
  registerMicroApps,
  removeMicroApps,
  unmountMicroApp,
  createMicroApp,
} from '@ice/stark';

import { menuDataLoader } from '../core/menuDataLoader';
// import { CoolHtmlRoute, CoolUrlRoute } from '../core/appRoute';
import { CoolMainAppProps, MicroAppTypes } from '../index.d';
import './index.module.less';
import { ActivePath, HashType } from '@ice/stark/lib/util/checkActive';

const CoolMainApp = (props: CoolMainAppProps) => {
  const { layout, settingMenuData, globalData, appId } = props;
  const container = useRef(null);
  const [registerApps, setRegisterApps] = useState([]);
  const [currentAppName, setCurrentAppName] = useState('');
  const Layout = layout;
  console.log(globalData, appId, settingMenuData);

  const registerAllApps = () => {
    const { registerHtmlApps, registerUrlApps } = menuDataLoader(settingMenuData);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let new_registerHtmlApps: {
      key: any;
      activePath: ActivePath;
      name: any;
      title: string;
      props: { [x: string]: any };
      hashType: boolean | HashType;
      sandbox: boolean;
      exact: boolean;
      container: React.MutableRefObject<any>;
      entry: any;
      umd: boolean;
    }[] = [];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let new_registerUrlApps: any[] = [];

    console.log(registerHtmlApps, registerUrlApps, '9999999====');
    if (Array.isArray(registerHtmlApps) && registerHtmlApps.length > 0) {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/naming-convention
      new_registerHtmlApps = registerHtmlApps.map((item: MicroAppTypes) => ({
        key: item.key,
        activePath: item.activePath,
        name: item.key,
        title: item.name,
        props: {
          ...globalData,
          ...item.props,
        },
        hashType: item.hashType,
        sandbox: true,
        exact: true,
        container,
        entry: item.src,
        umd: item.umd || false,
      }));
    }

    if (Array.isArray(registerUrlApps) && registerUrlApps.length > 0) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      new_registerUrlApps = registerUrlApps.map((col: MicroAppTypes) => ({
        key: col.key,
        activePath: col.activePath,
        title: col.name,
        sandbox: true,
        hashType: col.hashType,
        name: col.key,
        container,
        props: {
          ...col.props,
          ...globalData,
        },
        url: col.src,
        umd: col.umd || false,
      }));
    }

    console.log(new_registerHtmlApps, new_registerUrlApps, '=====+++++=====');
    if (new_registerHtmlApps && new_registerUrlApps) {
      //@ts-ignore
      const result =
        new_registerUrlApps &&
        new_registerHtmlApps &&
        new_registerUrlApps.concat(new_registerHtmlApps);
      console.log(result, '909090909');

      //@ts-ignore
      registerMicroApps(result);
      setRegisterApps(result);
    }
  };

  useEffect(() => {
    registerAllApps();
  }, []);

  const MicroApps = () => {
    start({
      // 微应用渲染前的回调
      onAppEnter: (appConfig) => {
        console.log(appConfig, 'app---=====++++++');
      },
      // 监听路由变化
      onRouteChange: (args: string) => {
        console.log(args, 'args----');
        const new_route = args.split('#')[1];
        console.log(new_route, 'new_route');
        console.log(registerApps, 'registerApps---');
        const new_result = registerApps.filter(item => item.path === new_route);
        console.log(new_result, 'new_result');
        if (Array.isArray(new_result) && new_result.length > 0) {
          createMicroApp(new_result[0]);
          unmountMicroApp(new_result[0].name);
          setCurrentAppName(new_result[0].name);

          // if (currentAppName) {
          //   removeMicroApps([currentAppName]);
          //   unmountMicroApp(currentAppName);
          // }
        }
      },
      // 微应用卸载前的回调
      onAppLeave: (appConfig) => {
        console.log(appConfig, 'app=-leave');
      },
      // 是否将资源持久化加载
      shouldAssetsRemove: () => true,
    });

    return <div ref={container} id="cool-micro-app" />;
  };

  if (Array.isArray(registerApps) && registerApps.length > 0 && layout) {
    return (
      <div>
        {/* @ts-ignore */}
        <Layout menuData={settingMenuData} tools={{}} microApps={MicroApps()} />
      </div>
    );
  } else {
    return <div>layout is required</div>;
  }
};

export default CoolMainApp;
