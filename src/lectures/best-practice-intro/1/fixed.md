``` jsx 

// dialog.js

export function Dialog(props) {
  return (
    <Dialog>
      {...}
    </Dialog>
  );
}

// trigger-dialog.js

export function TriggerDialog() {
  return (
    <button onClick={() => Dialog()}>Open Dialog</button>
  );
}


```