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

export const USER_CONFIG = [
  {
    id: '2c23ded2-5ef2-4b1b-8255-d31f169eb73b',
    board: [
      {
        id: crypto.randomUUID(),
        name: 's1'
      },
      {
        id: crypto.randomUUID(),
        name: 's2'
      },
      {
        id: crypto.randomUUID(),
        name: 's3'
      },
      {
        id: crypto.randomUUID(),
        name: 's4'
      },
    ],
    widget: [
      { id: 'e4620e98-e3f6-4ab6-bfe4-4a5076bf51ed', slot: 's1', value: '', type: 'Greeting' },
      { id: 'c4c1bad7-220e-4859-8d74-50672568d6a2', slot: 's2', value: '', type: 'ModeDisplay' },
    ]
  },
  {
    id: '516bc2f8-e1fd-49da-911a-41cf160c287e',
    board: [
      {
        id: crypto.randomUUID(),
        name: 's1'
      },
      {
        id: crypto.randomUUID(),
        name: 's2'
      },
      {
        id: crypto.randomUUID(),
        name: 's3'
      },
      {
        id: crypto.randomUUID(),
        name: 's4'
      },
    ],
    widget: [
      { id: 'fa46cef3-6126-4494-8c19-f3ea0100678f', slot: 's1', value: '', type: 'Greeting' },
      { id: 'b7d1edab-bd5a-4910-ac46-b455823f53ea', slot: 's2', value: '', type: 'ModeDisplay' },
    ]
  },
];

export const TYPES = [
  {id: 'Greeting', value: 'Greeting', label: 'Greeting'},
  {id: 'ModeDisplay', value: 'ModeDisplay', label: 'ModeDisplay'},
];

export const ADD_WIDGET = {
  id: crypto.randomUUID(),
  type: 'AddWidget'
};

export const ADD_SLOT = {
  id: crypto.randomUUID(),
  type: 'AddSlot',
};

export const USER_DATA = [
  {
    id: '2c23ded2-5ef2-4b1b-8255-d31f169eb73b',
    username: 'loitph',
    password: 'loitph',
    token: 'ZWUwNTMyMGVkZWEyMThhZGJlMGFlMzUwMzI5M2JmNjVmMzFlYmFlYzZiMDA1NDc1OTc1N2RiNGRkODFmYjczMQ==',
  }, {
    id: '516bc2f8-e1fd-49da-911a-41cf160c287e',
    username: 'fakeadmin',
    password: 'fakeadmin',
    token: 'NTNiMTJiOThhZjRjYjNlZmVjYTIyOTJjZWFlZTFjZjEwYzBkZDgzYzE4Y2NhYWZlMzY3NmFjODJhZGQxZjI3OA==',
  }
];

export const BLANK_AUTH = {
  id: '',
  username: '',
  token: '',
};

export const BLANK_USER = {
  id: '',
  username: '',
  password: '',
  token: ''
};

export const BLANK_USER_CONFIG = {
  id: '',
  board: [],
  widget: []
};
