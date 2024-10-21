export const DEFAULT_STORAGE = {
  status: 'inprogress',
  noti: 'Information are calculating!'
};

export const SLOTS = [
  's1', 's2', 's3',
  's4', 's5', 's6',
  's7', 's8', 's9',
];

export const LIST_CARD_DEFAULT = [
  { id: 'item-1', slot: 's1', value: 'Item 01' },
  { id: 'item-2', slot: 's2', value: 'Item 02' },
  { id: 'item-3', slot: 's3', value: 'Item 03' },
  { id: 'item-4', slot: 's4', value: 'Item 04' },
];

export const CARD_DEFAULT = { id: '', slot: '', value: '' };

export const USER_DATA = [
  {
    username: 'loitph',
    password: 'loitph',
    token: 'ZWUwNTMyMGVkZWEyMThhZGJlMGFlMzUwMzI5M2JmNjVmMzFlYmFlYzZiMDA1NDc1OTc1N2RiNGRkODFmYjczMQ==',
    configure: LIST_CARD_DEFAULT
  }, {
    username: 'fakeadmin',
    password: 'fakeadmin',
    token: 'NTNiMTJiOThhZjRjYjNlZmVjYTIyOTJjZWFlZTFjZjEwYzBkZDgzYzE4Y2NhYWZlMzY3NmFjODJhZGQxZjI3OA==',
    configure: LIST_CARD_DEFAULT
  }
];

export const BLANK_AUTH = {
  username: '',
  token: '',
  configure: []
};

export const BLANK_USER = {
  username: '',
  password: '',
};
