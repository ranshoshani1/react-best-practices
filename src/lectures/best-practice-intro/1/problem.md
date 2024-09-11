``` jsx 

export function Dialog(props) {
  return (
    <Dialog>
      {...}
    </Dialog>
  );
}

export function TriggerDialog({ setIsOpen}) {
  return (
    <button onClick={() => setIsOpen(true)}>Open Dialog</button>
  );
}


```