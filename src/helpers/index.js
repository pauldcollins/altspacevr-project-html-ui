
// immutability helpers
export const cloneArray = array => array.slice(0);
export const cloneObject = (object) => JSON.parse(JSON.stringify(object));

// add and remove items from array
export const addItem = (array, item) => [...array, item];
export const removeItemById = (array, id) => array.filter(item => {
  // it item has an 'id' key, use that, otherwise, use item itself
  return item.id ? item.id !== id : item !== id;
});

// filter user and member arrays
export const filterUsers = (users, members) => users.filter(item => members.indexOf(item.id) === -1);
export const filterMembers = (users, members) => users.filter(item => members.indexOf(item.id) !== -1);
