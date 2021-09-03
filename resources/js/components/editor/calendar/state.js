import {
  atom,
  selector,
  atomFamily
} from 'recoil';

export const dayIdsAtom = atom({
  key: 'dayIds',
  default: []
});

export const daysAtomFamily = atomFamily({
  key: 'days',
  default: {
    date: null
  }
});
