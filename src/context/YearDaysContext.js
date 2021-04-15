import {createContext} from 'react';

const YearDaysContext = createContext();

export const YearDaysProvider = YearDaysContext.Provider;
export const YearDaysConsumer = YearDaysContext.Consumer;

export default YearDaysContext;
