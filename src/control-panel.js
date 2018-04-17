import { Dispatcher, Store } from './flux'

const control_panel_dispatcher = new Dispatcher()

const UPDATE_USER_NAME = "UPDATE_USER_NAME"
const UPDATE_FONT_SIZE = "UPDATE_FONT_SIZE"

//ACTIONS
const user_name_update = (name) => {
  return {
    type: UPDATE_USER_NAME,
    value: name
  }
}
const user_font_size_update = (size) => {
  return {
    type: UPDATE_FONT_SIZE,
    value: size
  }
}

document.getElementById('userNameInput').addEventListener('input', ({ target }) => {
  const name = target.value
  const action = user_name_update(name)
  console.log('dispatching: ', action)
  control_panel_dispatcher.dispatch(action)
})

document.forms.fontSizeForm.fontSize.forEach(element => {
  element.addEventListener('change', ({ target }) => {
    const size = target.value
    const action = user_font_size_update(size)
    console.log('dispatching: ', action)
    control_panel_dispatcher.dispatch(action)
  })
})

class UserPrefsStore extends Store {
  getInitialState() {
    return localStorage[`preferences`] ? JSON.parse(localStorage[`preferences`]) : {
        userName: "Jim",
        fontSize: "small"
    };
  }
  __onDispatch(action) {
    switch(action.type) {
      case UPDATE_USER_NAME: {
        this.__state.name = action.value
        this.__emitChange()
        break;
      }
      case UPDATE_FONT_SIZE: {
        this.__state.fontSize = action.value
        this.__emitChange()
        break;
      }
    }
  }
  getUserPreferences() {
    return this.__state
  }
}

const userPrefsStore = new UserPrefsStore(control_panel_dispatcher)

userPrefsStore.addListener((state) => {
  console.info('the current state is: ', state)
  render(state)
  localStorage[`preferences`] = JSON.stringify(state);
})

const render = ({name, fontSize}) => {
  document.getElementById('userName').innerText = name || "new user"
  
}

render(userPrefsStore.getUserPreferences());