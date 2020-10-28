import {createContext} from 'react';

const SketchContext = createContext();

export const SketchProvider = SketchContext.Provider;
export const SketchConsumer = SketchContext.Consumer;

export default SketchContext;
