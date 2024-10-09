/* eslint-disable */
import { Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { sha256 } from "../../../utils";

function Avatar({ name }: { name: string }) {
  const [avatarUrl, setAvatarUrl] = useState("");

  const emails: { [key: string]: string } = {
    Ran: "rans@elementor.com",
    Ido: "idon@elementor.com",
    Shai: "shaish@elementor.com",
  };

  const email = emails[name] || "";

  const fetchAvatar = () => {
    sha256(email).then((hash) =>
      setAvatarUrl(`https://www.gravatar.com/avatar/${hash}?d=404`)
    );
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  return (
    <div>
      <img src={avatarUrl} alt="avatar" />
    </div>
  );
}

export default function App() {
  const [name, setName] = useState("Ran");
  const [showName, setShowName] = useState(true);

  const ChooseName = ({ name }: any) => {
    return (
      <Button
        onClick={() => setName(name)}
        variant="outlined"
        color="primary"
        sx={{ width: "100px" }}
      >
        {showName ? name : "------"}
      </Button>
    );
  };

  return (
    <>
      <ChooseName name="Ran" />
      <ChooseName name="Shai" />
      <ChooseName name="Ido" />
      <Avatar name={name} />
      {/* <Button onClick={() => setShowName((prev) => !prev)}>Toggle</Button> */}
    </>
  );
}
