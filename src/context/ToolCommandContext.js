import {createContext} from 'react';

const ToolCommandContext = createContext();

export const ToolCommandProvider = ToolCommandContext.Provider;
export const ToolCommandConsumer = ToolCommandContext.Consumer;

export default ToolCommandContext;
