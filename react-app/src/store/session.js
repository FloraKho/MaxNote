// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPDATE_PIC = 'session/UPDATE_PIC';
const ADD_SCRATCH_PAD = 'session/ADD_SCRATCH_PAD';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const updatePic = (user) => ({
  type: UPDATE_PIC,
  user
})

const addScratchPad = (user) => {
  return {
    type: ADD_SCRATCH_PAD,
    user
  }
}

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const updatePicThunk = (user) => async (dispatch) => {
  const { profile_pic } = user;
  const formData = new FormData();
  formData.append("profile_pic", profile_pic)

  const response = await fetch('/api/auth/update', {
    method: "PUT",
    body: formData
  })

  if (response.ok) {
    const picture = await response.json();
    dispatch(updatePic(picture));
    return picture;
  }
} 

export const addScratchPadThunk = (user) => async(dispatch) => {
  
  const { scratch_pad } = user;

  const response = await fetch('/api/auth/scratchpad', {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({scratch_pad})
  })

  if (response.ok) {
    const newText = await response.json();
    dispatch(addScratchPad(newText));
    return newText;
  }
}


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case UPDATE_PIC:
      const newState = {}
      newState['user'] = action.user
      return newState;
    case ADD_SCRATCH_PAD:
      const nState = {}
      nState['user'] = action.user
      return nState;
    default:
      return state;
  }
}
