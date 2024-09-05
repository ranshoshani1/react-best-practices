``` jsx

function Form(){
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  function handleChange(event){
    const value = event.target.value;
    const name = event.target.name;

    setState({
      ...state,
      [name]: value
    });
  }

  return (
    <form>
      <input 
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
      />
      <input 
        type="email"
        name="email"
        value={state.email}
        onChange={handleChange}
      />
      <input 
        type="password"
        name="password"
        value={state.password}
        onChange={handleChange}
      />
    </form>
  );
}


```