import Image from "next/image";
import Link from "next/link";

export default function Navbar(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        columnGap: 10,
        borderBottom: "1px solid #eaeaea",
        padding: "10px 20px",
      }}
    >
      <Image
        alt="Logo"
        src="/static/images/logo.png"
        width={30}
        height={30}
        style={{ width: 30, height: 30 }}
      />
      <div style={{ fontSize: "1rem", fontWeight: 600 }}>
        Prettier Hacker News
      </div>
    </div>
  );
}
