``` jsx

function User({user}) {

  function Avatar() {
    return <img src={user.img}/>
  }

  return (
    <div>
      <Avatar />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}

```