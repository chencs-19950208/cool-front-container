import React from 'react';
import { AppRoute } from '@ice/stark';
import { MicroAppTypes } from '../index.d';

export const CoolHtmlRoute = (app: MicroAppTypes, globalData: any) => (
  <AppRoute
    key={app.key}
    activePath={app.activePath}
    name={app.key}
    exact
    title={app.name}
    hashType={app.hashType}
    sandbox
    rootId="cool-micro-container"
    props={{ ...globalData, ...app.props }}
    loadScriptMode="fetch"
    entry={app.src}
    umd
  />
);

export const CoolUrlRoute = (app: MicroAppTypes, globalData: any) => (
  <AppRoute
    key={app.key}
    activePath={app.activePath}
    title={app.name}
    sandbox
    hashType={app.hashType}
    name={app.key}
    rootId="cool-micro-container"
    props={{ ...app.props, ...globalData }}
    loadScriptMode="fetch"
    url={app.src}
    umd
  />
);
