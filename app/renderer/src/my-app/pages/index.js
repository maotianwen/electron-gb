import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

// const inter = Inter({ subsets: ["latin"] });

const ipcRenderer =
  typeof window !== "undefined" ? window.electron.ipcRenderer : undefined;

export default function Home() {
  const login = async () => {
    const code = await ipcRenderer?.invoke("login");
    setLocalCode(code);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      login();
      ipcRenderer?.on("control-state-change", handleControlStateChange);
      return () =>
        ipcRenderer?.removeListener(
          "control-state-change",
          handleControlStateChange
        );
    }
  }, []);

  const [remoteCode, setRemoteCode] = useState("");
  const [localCode, setLocalCode] = useState("");
  const [controlText, setControlText] = useState("");

  const startControl = (remoteCode) => {
    ipcRenderer.send("control", remoteCode);
  };

  const handleControlStateChange = (e, name, type) => {
    let text = "";
    if (type === 1) {
      //控制别人
      text = `正在远程控制${name}`;
    } else if (type === 2) {
      //被控制
      text = `被${name}控制中`;
    }
    setControlText(text);
  };

  return (
    <div>
      {controlText === "" ? (
        <>
          <div>你的控制码{localCode}</div>
          <input
            type="text"
            value={remoteCode}
            onChange={(e) => setRemoteCode(e.target.value)}
          />
          <button onClick={() => startControl(remoteCode)}>确认</button>
        </>
      ) : (
        <div>{controlText}</div>
      )}
    </div>
  );
}
