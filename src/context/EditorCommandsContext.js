import {createContext} from 'react';

const EditorCommandsContext = createContext();

export const EditorCommandsProvider = EditorCommandsContext.Provider;
export const EditorCommandsConsumer = EditorCommandsContext.Consumer;

export default EditorCommandsContext;
